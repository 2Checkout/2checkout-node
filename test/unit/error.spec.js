const chai = require("chai");
const TwocheckoutError = require("../../lib/error");
const expect = chai.expect;
const helper = require("../spec_helper");

describe("Test TwocheckoutError class", function () {
    describe("Test constructor when params", function () {
        it("Should have name, code & message", function () {
            let err = new TwocheckoutError("test_code", "Test message");
            expect(err).to.have.property("name").equal("TwocheckoutError");
            expect(err).to.have.property("code").equal("test_code");
            expect(err).to.have.property("message").equal("Test message");
        });
    });
});
