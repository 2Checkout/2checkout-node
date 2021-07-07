const chai = require("chai");
const expect = chai.expect;
const BuyLinkAuth = require("../../lib/buy-link-auth");

const helper = require("../spec_helper");

const buyLinkAuth = new BuyLinkAuth(buyLinkAuthToken);

describe("BuyLinkAuth test suit", function () {
    describe("getHeaders()", function () {
        it("Should return header with token", function () {
            let headerData = buyLinkAuth.getHeaders();
            expect(headerData).to.have.property("Content-Type").with.lengthOf(16);
            expect(headerData).to.have.property("merchant-token").equal(buyLinkAuthToken);
        });
    });
});
