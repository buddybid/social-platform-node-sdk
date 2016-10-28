'use strict';

const querystring = require('querystring'),
    util = require('util');

const request = require('superagent');

const BuddyBid = function (configuration) {
    const defaults = {
        baseEndpoint: 'buddybid.co',
        subdomain: '',
        ownerId: '',
        apiKey: ''
    };

    /* eslint-disable no-underscore-dangle */
    var config = this.configuration = util._extend(defaults, configuration);


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

        var url = 'https://' + this.configuration.baseEndpoint;

        // Add leading and trailing slashes to the path if they do not exist
        url += path.replace(/^\/?/, '/').replace(/\/?$/, '/');

        callback = (typeof params === 'function') ? params : callback;

        method = method.toLowerCase();
        method = (method === 'delete') ? 'del' : method;

        if (method === 'post' || method === 'put') {
            body = params;
        } else {
            url += '?' + querystring.stringify(params);
        }

        request[method](url).
        send(body).
        set('Accept', 'application/json').
        set({apikey: this.configuration.apiKey}).
        set('Content-Type', 'application/json').
        end(function (err, res) {
            if (err) {
                return callback(err);
            }
            if (res.error) {
                return callback(res.error);
            }
            callback(null, res.body);
        });
    };
};

// Helper instance methods for get, post, put and delete
[ 'get', 'post', 'put', 'delete' ].forEach(function(method) {
        BuddyBid.prototype[method] = function (path, params, callback) {
        this.request(method, path, params, callback);
    };
});

module.exports = BuddyBid;