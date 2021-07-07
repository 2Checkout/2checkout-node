"use strict";
const crypto = require("crypto-js");

class ApiAuth {
    constructor(config) {
        this.config = config;
    }

    getHeaders() {
        const gmtDate = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
        const string = this.config.sellerId.length + this.config.sellerId + gmtDate.length + gmtDate;
        const hash = crypto.HmacMD5(string, this.config.secretKey);
        const headers = {
            "Content-Type": "application/json",
            //Accept: "application/json",
            "X-Avangate-Authentication":
                "code='" + this.config.sellerId + "' date='" + gmtDate + "' hash='" + hash + "'",
        };
        return headers;
    }
}

module.exports = ApiAuth;
