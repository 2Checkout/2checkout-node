const chai = require("chai");
const expect = chai.expect;
const ApiAuth = require("../../lib/api-auth");

const helper = require("../spec_helper");
const auth = new ApiAuth(config);

describe("Auth test suit", function () {
    describe("getHeaders()", function () {
        it("Should return header", function () {
            let headerData = auth.getHeaders();
            expect(headerData).to.have.property("Content-Type").with.lengthOf(16);
            expect(headerData)
                .to.have.property("X-Avangate-Authentication")
                .with.lengthOf(74 + config.sellerId.length);
        });
    });
});
