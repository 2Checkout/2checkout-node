const chai = require("chai");
const Helper = require("../../lib/helper");
const expect = chai.expect;
const assert = chai.assert;
const helper = require("../spec_helper");
const helperClass = new Helper();

describe("Test Helper Class", function () {
    describe("Test addSrcToParams For objects containing prod parameter.", function () {
        it("Should return an object with param src set by default.", function () {
            const obj1 = { prod: { prod1: "Test" } };
            const params = helperClass.addSrcToParams(obj1);
            expect(obj1).to.have.property("src").equal("NodeJsLibrary");
            expect(obj1).to.have.property("prod");
            assert.equal(JSON.stringify(params), JSON.stringify(obj1));
        });
    });

    describe("Test addSrcToParams For objects containing Items parameter.", function () {
        it("Should return an object with param src set by default.", function () {
            const obj2 = { Items: { prod1: "Test" } };
            const params = helperClass.addSrcToParams(obj2);
            expect(obj2).to.have.property("Source").equal("NodeJsLibrary");
            expect(obj2).to.have.property("Items");
            assert.equal(JSON.stringify(params), JSON.stringify(obj2));
        });
    });

    describe("Test prepareArgsForPost", function () {
        it("Should return an object prepared for posting payment orders over Api.", function () {
            const payload = { test: 1 };
            const args = helperClass.prepareArgsForPost(payload);
            expect(args).to.have.property("method").equal("POST");
            expect(args).to.have.property("path").equal("/orders");
            expect(args).to.have.property("payload");
            assert.equal(JSON.stringify(args.payload), JSON.stringify(payload));
        });
    });

    describe("Test prepareArgsForGet", function () {
        it("Should return an object prepared for getting payment orders over Api without searchParams && path.", function () {
            const payload = { RefNo: 1564677 };
            const args = helperClass.prepareArgsForGet(payload);
            expect(args).to.have.property("method").equal("GET");
            expect(args).to.not.have.property("searchParams");
            expect(args)
                .to.have.property("path")
                .equal("/orders/" + payload.RefNo + "/");
        });
    });

    describe("Test prepareArgsForGet", function () {
        it("Should return an object prepared for getting payment orders over Api only with searchParams", function () {
            const payload = { StartDate: "2019-01-20", EndDate: "2019-12-31" };
            const args = helperClass.prepareArgsForGet(payload);
            expect(args).to.have.property("method").equal("GET");
            expect(args).to.have.property("searchParams");
            expect(JSON.stringify(args.searchParams)).equal(JSON.stringify(payload));
            expect(args).to.have.property("path").equal("/orders");
        });
    });

    describe("Test prepareSubForGet", function () {
        it("Should return object prepared for searching by subscription reference ID", function () {
            const payload = { subRefId: "W1SD34YY05" };
            const args = helperClass.prepareSubForGet(payload);
            expect(args).to.have.property("method").equal("GET");
            expect(args).to.not.have.property("searchParams");
            expect(args)
                .to.have.property("path")
                .equal("/subscriptions/" + payload.subRefId + "/");
        });
    });

    describe("Test prepareSubForGet", function () {
        it("Should return search object for searching subscriptions with searchParams", function () {
            const payload = { CustomerEmail: "customer@2checkout.com", DeliveredCode: "FJD89SR" };
            const args = helperClass.prepareSubForGet(payload);
            expect(args).to.have.property("method").equal("GET");
            expect(args).to.have.property("searchParams");
            expect(JSON.stringify(args.searchParams)).equal(JSON.stringify(payload));
            expect(args).to.have.property("path").equal("/subscriptions");
        });
    });

    describe("Test prepareSubForUpdate", function () {
        it("Should return object prepared for Subscriptions Update request", function () {
            const payload = {
                subRefId: "W1SD34YY05",
                subParams: { RecurringEnabled: true, SubscriptionEnabled: true, ExpirationDate: "2025-12-30" },
            };
            const args = helperClass.prepareSubForUpdate(payload);
            expect(args).to.have.property("method").equal("PUT");
            expect(args).to.have.property("payload");
            expect(JSON.stringify(args.payload)).equal(JSON.stringify(payload.subParams));
            expect(args)
                .to.have.property("path")
                .equal("/subscriptions/" + payload.subRefId + "/");
        });
    });

    describe("Test prepareSubForPost", function () {
        it("Should return object prepared for Subscriptions Enable request", function () {
            const payload = {
                subRefId: "W1SD34YY05",
            };
            const args = helperClass.prepareSubForPost(payload);
            expect(args).to.have.property("method").equal("POST");
            expect(args)
                .to.have.property("path")
                .equal("/subscriptions/" + payload.subRefId + "/");
        });
    });

    describe("Test prepareSubForPost", function () {
        it("Should return object prepared for Subscriptions create. You can also place by placing a payment order.", function () {
            const args = helperClass.prepareSubForPost(subscriptionPostPayload);
            expect(args).to.have.property("method").equal("POST");
            expect(args).to.have.property("payload");
            expect(JSON.stringify(args.payload)).equal(JSON.stringify(subscriptionPostPayload));
            expect(args).to.have.property("path").equal("/subscriptions");
        });
    });

    describe("Test prepareSubForDelete", function () {
        it("Should return object prepared for Subscriptions Disable. This only disables and not delete the subscription.", function () {
            const payload = {
                subRefId: "W1SD34YY05",
            };
            const args = helperClass.prepareSubForDelete(payload);
            expect(args).to.have.property("method").equal("DELETE");
            expect(args)
                .to.have.property("path")
                .equal("/subscriptions/" + payload.subRefId + "/");
        });
    });
});
