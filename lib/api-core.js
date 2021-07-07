"use strict";
const got = require("got");
const TwocheckoutError = require("./error");
const Helper = require("./helper");

class ApiCore {
    constructor(auth) {
        this.apiAuth = auth;
        this.helper = new Helper();
    }

    prepareRequest(args) {
        let options = {
            method: args.method,
            responseType: "json",
            prefixUrl: "prefixUrl" in args ? args.prefixUrl : "https://api.2checkout.com/rest/6.0",
            headers: this.apiAuth.getHeaders(),
        };

        if (args.payload !== undefined && args.payload !== null) {
            this.helper.addSrcToParams(args.payload);
            options.body = JSON.stringify(args.payload);
        }

        let path = args.path.charAt(0) === "/" ? args.path.substr(1) : args.path;
        return { path: path, options: options };
    }

    async execute(args, callback) {
        if (typeof callback !== undefined && typeof callback === "function") {
            try {
                let promise = this.executeWithPromise(args);
                let response = await promise;
                callback(null, response);
            } catch (error) {
                callback(error, null);
            }
        } else {
            return await this.executeWithPromise(args);
        }
    }

    executeWithPromise(args) {
        let reqSettings = this.prepareRequest(args);
        return new Promise((resolve, reject) => {
            this.getRequestPromise(reqSettings.path, reqSettings.options)
                .then((res) => {
                    resolve(res.body);
                })
                .catch((error) => {
                    const parsedResponse = typeof error.response !== "undefined" ? error.response.body : null;
                    if (parsedResponse) {
                        let err = new TwocheckoutError(parsedResponse.error_code, parsedResponse.message);
                        reject(err);
                    }
                });
        });
    }

    getRequestPromise(path, options) {
        return got(path, options);
    }
}

module.exports = ApiCore;
