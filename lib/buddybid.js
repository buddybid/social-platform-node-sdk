'use strict';

const querystring = require('querystring'),
    FormData = require('form-data'),
    request = require('request'),
    https = require('https');

const BuddyBid = function (configuration) {
    const defaults = {
        platform: 'buddybid',
        protocol: 'https',
        baseEndpoint: 'buddybid.co',
        subdomain: '',
        ownerId: '',
        apiKey: ''
    };

    this.configuration = Object.assign(defaults, configuration);

    this.configuration.platform = this.configuration.platform.toString().trim().toLowerCase();

    if (this.configuration.subdomain) {
        this.configuration.baseEndpoint = this.configuration.subdomain + '.' + this.configuration.baseEndpoint;
    }

    if (this.configuration.platform === 'buddybid' && !this.configuration.ownerId) {
        throw new Error('ownerId is required');
    }

    this.request = function (method, path, params, callback) {
        const self = this;
        let body = {};
        let url = self.configuration.protocol + '://' + self.configuration.baseEndpoint + path;

        callback = params && (typeof params === 'function') ? params : callback ? callback : null;

        method = method.toLowerCase();

        if (method === 'post' || method === 'put') {
            body = params;
        } else {
            if (typeof params === 'object' && params) {
                url += '?' + querystring.stringify(params);
            }
        }

        return new Promise((resolve, reject)=> {
            if (self.configuration.platform === 'buddybid' && path === '/image/upload') {
                const urlParts = self.configuration.baseEndpoint.split(':');
                let formData;

                if (typeof params === 'string') {
                    formData = new FormData();
                    formData.append('image-files', request(params));
                } else {
                    formData = params;
                }

                let resBody = '';
                const options = {
                    method: method,
                    host: urlParts[0],
                    port: urlParts[1] ? urlParts[1] : '443',
                    path: path,
                    headers: Object.assign(formData.getHeaders(), { apiKey: self.configuration.apiKey })
                };

                const _request = https.request(options, function (res) {
                    res.on('data', function (chunk) {
                        resBody += chunk;
                    });
                    res.on('end', function () {
                        resBody = JSON.parse(resBody)[0];
                        resolve(resBody);
                        if (callback) {
                            callback(null, resBody);
                        }
                    });
                });

                formData.pipe(_request);

                _request.on('error', function (err) {
                    if (callback) {
                        resolve();
                        callback(err);
                    } else {
                        reject(err);
                    }
                });

            } else {
                const options = {
                    url: url,
                    method: method,
                    headers: {
                        apikey: self.configuration.apiKey
                    },
                    body: body,
                    json: true
                };

                if (self.configuration.platform === 'bbhub') {
                    delete options.headers.apikey;
                    options.headers.userapikey = self.configuration.apiKey;
                }

                request(options, function (err, res, body) {
                    if (err) {
                        if (callback) {
                            resolve();
                            return callback(err);
                        } else {
                            return reject(err);
                        }
                    }
                    if (res.statusCode !== 200) {
                        if (callback) {
                            resolve();
                            return callback(body);
                        } else {
                            return reject(body);
                        }
                    }
                    resolve(body);
                    if (callback) {
                        callback(null, body);
                    }
                });
            }
        });
    };
};

// Helper instance methods for get, post, put and delete
[ 'get', 'post', 'put', 'delete' ].forEach(function(method) {
    BuddyBid.prototype[method] = function (path, params, callback) {
        return this.request(method, path, params, callback);
    };
});

module.exports = BuddyBid;
