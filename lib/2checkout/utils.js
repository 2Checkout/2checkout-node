var TwocheckoutError = require('./error');
const got = require('got');
exports.execute = function (args, callback) {
    var options = {
        method: args.method,
        responseType: 'json',
        prefixUrl: 'https://www.2checkout.com',
    };

    if (args.type === "admin") {
        options.username = args.apiUser;
        options.password = args.apiPass;

        if(args.method === "POST") {
            options.form = args.payload;
        } else {
            options.searchParams = args.payload;
        }
    } else {
        args.payload.privateKey = args.privateKey;
        args.payload.sellerId = args.sellerId;
        options.body = JSON.stringify(args.payload);
    }

    let path = (args.path.charAt(0) === '/') ? args.path.substr(1) : args.path;
    (async () => {
        try {
            const response = await got(path, options);
            callback(null, response.body);
        } catch (error) {
            const parsedResponse = typeof error.response !== 'undefined' ? error.response.body : null;
            if (parsedResponse) {
                if (args.type === "admin") {
                    if (parsedResponse.errors) {
                        callback(new TwocheckoutError(parsedResponse.errors[0].code, parsedResponse.errors[0].message));
                    }
                } else {
                    if (parsedResponse.exception) {
                        callback(new TwocheckoutError(parsedResponse.exception.errorCode, parsedResponse.exception.errorMsg));
                    }
                }
            } else {
                callback(new TwocheckoutError('500', 'Error parsing JSON response from 2Checkout API.'));
            }
        }
    })();
};
