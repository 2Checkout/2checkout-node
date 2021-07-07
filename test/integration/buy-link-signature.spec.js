const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const BuyLinkSignature = require("../../lib/buy-link-signature");
const Twocheckout = require("../../twocheckout");
const helper = require("../spec_helper");

const buyLinkSignature = new BuyLinkSignature(config);

describe("Buy Link Signature Generation tests", function () {
    describe("constructor() - test if jwtExpireTime is set", function () {
        it("It should return config with jwtExpireTime set to 20 min", function () {
            //buyLinkParams
            const buyLinkSignature = new BuyLinkSignature(config);
            expect(buyLinkSignature.config).to.have.property("jwtExpireTime").equal(20);
        });
    });

    describe("generateSignature() - test if signature is generated - with callback", function () {
        this.timeout(0);
        it("It shoud return signature token for Buy Link generation.", function (done) {
            const buyLinkSignature = new BuyLinkSignature(config);
            buyLinkSignature.generateSignature(buyLinkParams, (err, res) => {
                if (err) {
                    setTimeout(done(err), 2);
                } else if ("signature" in res) {
                    setTimeout(done, 2);
                } else {
                    done("Signature not found! Res: %s", res.toString());
                }
            });
        });
    });

    describe("Twocheckout.generateBuyLinkSignature() - test if signature is generated using interface - with callback", function () {
        this.timeout(0);
        it("It shoud return signature token for Buy Link generation.", function (done) {
            const tco = new Twocheckout(config);
            tco.generateBuyLinkSignature(buyLinkParams, (err, res) => {
                if (err) {
                    setTimeout(done(err), 2);
                } else if ("signature" in res) {
                    setTimeout(done, 2);
                } else {
                    done("Signature not found! Res: %s", res.toString());
                }
            });
        });
    });
});
