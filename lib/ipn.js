"use strict";
const crypto = require("crypto-js");
const dateFormat = require("date-format");
const util = require("util");
const TwocheckoutError = require("./error");

class IpnSignature {
    constructor(config) {
        this.config = config;
    }

    //Check if Ipn Request from 2Checkout is valid
    isValid(params) {
        try {
            let result = "";
            if ("HASH" in params) {
                const receivedHash = params.HASH;
                Object.keys(params).forEach((key) => {
                    let val = params[key];
                    if (key != "HASH") {
                        if (typeof val === "object") {
                            result += this.expand(val);
                        } else {
                            result += this.getStrAndLength(val);
                        }
                    }
                });
                if ("REFNO" in params) {
                    const calcHash = this.hmac(result.toString());
                    return receivedHash === calcHash;
                }
            } else {
                throw new TwocheckoutError("ipn_no_hash", "No HASH found!");
            }
        } catch (e) {
            throw new TwocheckoutError(e.code, e.message);
        }
    }

    calculateIpnResponse(ipnParams) {
        try {
            let resultResponse = "";
            let ipnParamsResponse = {};

            // we're assuming that these always exist, if they don't then the problem is on avangate side
            ipnParamsResponse.IPN_PID = [ipnParams.IPN_PID[0]];
            ipnParamsResponse.IPN_PNAME = [ipnParams.IPN_PNAME[0]];
            ipnParamsResponse.IPN_DATE = ipnParams.IPN_DATE;
            ipnParamsResponse.DATE = dateFormat.asString("yyyyMMddhhmmss", new Date());

            Object.keys(ipnParamsResponse).forEach((key) => {
                let val = ipnParamsResponse[key];
                if (typeof val === "object") {
                    resultResponse += this.expand(val);
                } else {
                    resultResponse += this.getStrAndLength(val);
                }
            });

            return util.format(
                "<EPAYMENT>%s|%s</EPAYMENT>",
                ipnParamsResponse.DATE,
                this.hmac(resultResponse, this.config.secretKey)
            );
        } catch (e) {
            throw new TwocheckoutError(
                "ipn_response",
                util.format("Error calculating ipn response. Details: %s", e.message)
            );
        }
    }

    expand(params) {
        let retval = "";
        Object.keys(params).forEach((key) => {
            let element = params[key];
            if (typeof element === "object") {
                retval += this.expand(element);
            } else {
                retval += this.getStrAndLength(element);
            }
        });
        return retval;
    }

    getStrAndLength(str) {
        let val = str.toString().trim();
        return val.length.toString() + val.toString();
    }

    hmac(string) {
        let hash = crypto.HmacMD5(string, this.config.secretKey);
        return hash.toString(crypto.enc.Hex);
    }
}

module.exports = IpnSignature;
