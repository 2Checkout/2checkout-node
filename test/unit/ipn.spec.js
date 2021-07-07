const chai = require("chai");
const IpnSignature = require("../../lib/ipn");
const Twocheckout = require("../../twocheckout");
const TwocheckoutError = require("../../lib/error");
const expect = chai.expect;
const helper = require("../spec_helper");

const ipn = new IpnSignature(ipnConfig);

describe("Ipn class tests", function () {
    describe("getStrAndLength()", function () {
        it("Should return string length concat with string", function () {
            let res = ipn.getStrAndLength("any string");
            let expectedRes = "10any string";
            expect(res).to.equal(expectedRes);
        });
    });

    describe("expand()", function () {
        it("Returns object attributes and values as string", function () {
            let res = ipn.expand(toExpand);
            expect(res).to.equal(expandedExpected);
        });
    });

    describe("hmac()", function () {
        it("Returns hmac of a string using the secretKey", function () {
            let expanded = ipn.expand(toExpand);
            let res = ipn.hmac(expanded);
            expect(res).to.equal(ipnExpectedHash);
        });
    });

    describe("isValid()", function () {
        it("Check if ipn call signature is Valid", function () {
            let res = ipn.isValid(ipnCallbackReq);
            expect(res).to.equal(true);
        });
        it("Check if ipn call signature Fails", function () {
            ipnCallbackReqClone = JSON.parse(JSON.stringify(ipnCallbackReq)); //dirty :)
            ipnCallbackReqClone["REFNOEXT"] += "#Altered";
            let res = ipn.isValid(ipnCallbackReqClone);
            expect(res).to.equal(false);
        });
    });
});

describe("Twocheckout interface ipn hash validation.", function () {
    describe("Twocheckout.validateIpnResponse() tests", function () {
        it("Hash is valid.", function () {
            const tco = new Twocheckout(ipnConfig);
            let res = tco.validateIpnResponse(ipnCallbackReq);
            expect(res).to.equal(true);
        });
        it("Hash is invalid because parameters changed", function () {
            const tco = new Twocheckout(ipnConfig);
            ipnCallbackReqClone = JSON.parse(JSON.stringify(ipnCallbackReq)); //dirty :)
            ipnCallbackReqClone["REFNOEXT"] += "#Altered";
            let res = tco.validateIpnResponse(ipnCallbackReqClone);
            expect(res).to.equal(false);
        });
        it("Hash is missing throws error.", function () {
            const tco = new Twocheckout(ipnConfig);
            ipnCallbackReqClone = JSON.parse(JSON.stringify(ipnCallbackReq)); //dirty :)
            delete ipnCallbackReqClone["HASH"];
            expect(function () {
                tco.validateIpnResponse(ipnCallbackReqClone);
            })
                .to.throw(TwocheckoutError)
                .with.property("code", "ipn_no_hash");
        });
    });
});

describe("Twocheckout interface ipn response.", function () {
    describe("Twocheckout.generateIpnResponse() tests", function () {
        it("Ipn response is valid.", function () {
            const tco = new Twocheckout(ipnConfig);
            let res = tco.generateIpnResponse(ipnCallbackReq);
            expect(res).to.be.a("string").with.lengthOf(68);
        });
        it("Ipn response generation throws exception.", function () {
            const tco = new Twocheckout(ipnConfig);
            ipnCallbackReqClone = {};
            expect(function () {
                tco.generateIpnResponse(ipnCallbackReqClone);
            })
                .to.throw(TwocheckoutError)
                .with.property("code", "ipn_response");
        });
    });
});
