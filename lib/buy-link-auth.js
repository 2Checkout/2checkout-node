"use strict";
const crypto = require("crypto-js");
const TwocheckoutError = require("./error");

class BuyLinkAuth {
    constructor(token) {
        this.token = token;
    }

    getHeaders() {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            "merchant-token": this.token,
        };
        return headers;
    }
}

module.exports = BuyLinkAuth;
