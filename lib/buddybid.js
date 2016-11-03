'use strict';

const querystring = require('querystring'),
    FormData = require('form-data'),
    request = require('request'),
    https = require('https');

const BuddyBid = function (configuration) {
    const defaults = {
        baseEndpoint: 'buddybid.co',
        subdomain: '',
        ownerId: '',
        apiKey: ''
    };

    /* eslint-disable no-underscore-dangle */
    var config = this.configuration = Object.assign(defaults, configuration);

    /* eslint-enable no-underscore-dangle */
    //this.configuration.authorization = new Buffer('${this.configuration.username}:${this.configuration.apiKey}').toString('base64');

    if (config.subdomain) {
        this.configuration.baseEndpoint = config.subdomain + '.' + this.configuration.baseEndpoint;
    }

    if (!config.ownerId) {
        throw new Error('ownerId is required');
    }

    this.request = function (method, path, params, callback) {
        var body = {};
        var self = this;
        var url = 'https://' + self.configuration.baseEndpoint + path;

        callback = (typeof params === 'function') ? params : callback;

        method = method.toLowerCase();

        if (method === 'post' || method === 'put') {
            body = params;
        } else {
            if (typeof params === 'object' && params) {
                url += '?' + querystring.stringify(params);
            }
        }

        if (path === '/image/upload') {
            var urlParts = self.configuration.baseEndpoint.split(':');
            var formData;

            if (typeof params === 'string') {
                formData = new FormData();
                formData.append('image-files', request(params));
            } else {
                formData = params;
            }

            var resBody = '';
            var options = {
                method: method,
                host: urlParts[0],
                port: urlParts[1] ? urlParts[1] : '80',
                path: path,
                headers: Object.assign(formData.getHeaders(), { apiKey: self.configuration.apiKey })
            };

            var _request = https.request(options, function (res) {
                res.on('data', function (chunk) {
                    resBody += chunk;
                });
                res.on('end', function () {
                    resBody = JSON.parse(resBody)[0];
                    callback(null, resBody);
                });
            });

            formData.pipe(_request);

            _request.on('error', function (err) {
                callback(err);
            });

        } else {
            var options = {
                url: url,
                method: method,
                headers: {
                    apikey: self.configuration.apiKey
                },
                body: body,
                json: true
            };

            request(options, function (err, res, body) {
                if (err) {
                    return callback(err);
                }
                if (res.statusCode !== 200) {
                    return callback(body);
                }

                callback(null, body);
            });
        }
    };
};

// Helper instance methods for get, post, put and delete
[ 'get', 'post', 'put', 'delete' ].forEach(function(method) {
    BuddyBid.prototype[method] = function (path, params, callback) {
        this.request(method, path, params, callback);
    };
});

module.exports = BuddyBid;
