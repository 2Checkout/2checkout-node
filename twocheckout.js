"use strict";
const ApiAuth = require("./lib/api-auth");
const ApiCore = require("./lib/api-core");
const Order = require("./lib/order");
const IpnSignature = require("./lib/ipn");
const BuyLinkSignature = require("./lib/buy-link-signature");
const TwocheckoutError = require("./lib/error");
const Subscription = require("./lib/subscription");

class Twocheckout {
    constructor(config) {
        this.config = config;
        this.apiAuth = new ApiAuth(this.config);
        this.apiCore = new ApiCore(this.apiAuth);
    }

    apiAuth() {
        return this.apiAuth;
    }

    order() {
        return new Order(this.apiCore);
    }

    validateIpnResponse(params) {
        try {
            let ipn = new IpnSignature(this.config);
            return ipn.isValid(params);
        } catch (e) {
            throw new TwocheckoutError(e.code, e.message);
        }
    }

    generateIpnResponse(params) {
        try {
            let ipn = new IpnSignature(this.config);
            return ipn.calculateIpnResponse(params);
        } catch (e) {
            throw new TwocheckoutError(e.code, e.message);
        }
    }

    async generateBuyLinkSignature(params, callback) {
        let buyLinkSignature = new BuyLinkSignature(this.config);
        return await buyLinkSignature.generateSignature(params, callback);
    }

    subscription() {
        return new Subscription(this.apiCore);
    }
}

module.exports = Twocheckout;
