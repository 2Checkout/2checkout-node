"use strict";
const jwt = require("jsonwebtoken");
const BuyLinkAuth = require("./buy-link-auth");
const ApiCore = require("./api-core");
const TwocheckoutError = require("./error");
const Helper = require("./helper");

class BuyLinkSignature {
    constructor(config) {
        if ("secretWord" in config) {
            this.config = config;
            this.helper = new Helper();
            if (!"jwtExpireTime" in config) this.config.jwtExpireTime = 20; //minutes
        } else {
            throw new TwocheckoutError("secretWord_not_found", "Missing secretWord parameter from config");
        }
    }

    async generateSignature(params, callback) {
        //prepare arguments for api call
        this.helper.addSrcToParams(params);
        let args = {
            method: "POST",
            payload: params,
            path: "/",
            prefixUrl: "https://secure.2checkout.com/checkout/api/encrypt/generate/signature",
        };
        let auth, apiCore;

        try {
            const token = jwt.sign(params, this.config.secretWord, {
                algorithm: "HS512",
                expiresIn: this.config.jwtExpireTime * 60, //transform in minutes
            });
            auth = new BuyLinkAuth(token);
            apiCore = new ApiCore(auth);

            return await apiCore.execute(args, callback);
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = BuyLinkSignature;
