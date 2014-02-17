var request = require('request');

exports.execute = function (args, callback) {
    options = {
        uri: args.domain + args.path,
        method: args.method,
        headers: { "Accept" : "application/json" },
        timeout: 30000
    };

    if (args.type === "admin") {
        options.auth = {
            user: args.apiUser,
            pass: args.apiPass,
            sendImmediately: true
        };

        if(args.method === "POST") {
            options.form = args.payload;
        } else {
            options.qs = args.payload;
        }
    } else {
        args.payload.privateKey = args.privateKey;
        args.payload.sellerId = args.sellerId;
        options.body = JSON.stringify(args.payload);
    }

    request(options, function (error, response, body) {
        var parsedResponse;
        if (error) {
            callback(new Error('Unable to connect to 2Checkout API'));
        } else {

            try {
                parsedResponse = JSON.parse(body);
            } catch (e) {
                callback(new Error('Error parsing JSON response from 2Checkout API.'));
                return;
            }

            if (args.type === "admin") {
                if (parsedResponse.errors) {
                    callback(new Error(parsedResponse.errors[0].message));
                    return;
                }
            } else {
                if (parsedResponse.exception) {
                    callback(new Error(parsedResponse.exception.errorMsg));
                    return;
                }
            }

            callback(null, parsedResponse);

        }

    });
};