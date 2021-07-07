const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;
const Twocheckout = require("../../twocheckout");
const helper = require("../spec_helper");
const ApiAuth = require("../../lib/api-auth");
const ApiCore = require("../../lib/api-core");
const Subscription = require("../../lib/subscription");

const tco = new Twocheckout(config);
const apiAuth = new ApiAuth(config);
const apiCore = new ApiCore(apiAuth);
const subscription = new Subscription(apiCore);

let RefNo_for_get = "0";
let subscriptionRefId = "0";

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Subscriptions", function () {
    describe("subscription().getSubscriptionFromItems() - Method that extracts subscriptions from products:", function () {
        it("It should return params.", function () {
            const expected = {
                ea421f868cb7fd204cbb75dcafcd55aece58eb92: [
                    {
                        SubscriptionReference: "U3T96D72D3",
                        PurchaseDate: "2021-05-10 16:57:30",
                        SubscriptionStartDate: "2021-05-10 16:57:30",
                        ExpirationDate: "2021-06-10 16:57:30",
                        Lifetime: false,
                        Trial: false,
                        Enabled: true,
                        RecurringEnabled: true,
                    },
                ],
            };
            const actual = subscription.getSubscriptionFromItems(paymentItems);
            assert.equal(JSON.stringify(actual), JSON.stringify(expected));
        });
    });

    describe("Subscription creation - With Payment Order - async/await :", function () {
        this.timeout(0);
        it("Resolving promise returns valid response for RefNo that is linked to subscriptions", async function () {
            let promise = tco.order().create(paymentWithSubscriptionParams);
            let response = await promise;
            RefNo_for_get = response.RefNo;
            expect(response).to.have.property("RefNo").with.lengthOf(9);
        });
    });

    describe("subscription().getSubscriptionsByOrderRefNo() - ASYNC - Method makes API request to get subscriptions for products in payment order (if any)", function () {
        this.timeout(0);
        it("It should return an array of product line item keys having their specific subscriptions.", async function () {
            console.log("Setting timer for 3 seconds to ensure subscriptions are created!");
            await timeout(3000);
            try {
                const promise = tco.subscription().getSubscriptionsByOrderRefNo(RefNo_for_get);
                let response = await promise;
                //select first subscription
                let firstSubscription = response[Object.keys(response)[0]][0];
                subscriptionRefId = firstSubscription["SubscriptionReference"];
                expect(firstSubscription).to.have.property("SubscriptionReference").with.lengthOf(10);
            } catch (e) {
                console.error(e);
            }
        });
    });

    describe("subscription().getSubscriptionsByOrderRefNo() - CALLBACK - Method makes API request to get subscriptions for products in payment order (if any)", function () {
        this.timeout(0);
        it("It should return an array of product line item keys having their specific subscriptions.", function (done) {
            tco.subscription().getSubscriptionsByOrderRefNo(RefNo_for_get, (err, res) => {
                if (err) {
                    setTimeout(done(err), 2);
                } else if (typeof res[Object.keys(res)[0]][0] !== "undefined") {
                    let firstSubscription = res[Object.keys(res)[0]][0];
                    expect(firstSubscription).to.have.property("SubscriptionReference").with.lengthOf(10);
                    setTimeout(done, 2);
                } else {
                    done("Response is not valid!");
                }
            });
        });
    });

    describe("subscription().retrieve() - ASYNC - Method makes API request to get subscriptions by subscription ref ID", function () {
        this.timeout(0);
        it("It should return an object with all subscription attributes", async function () {
            const promise = tco.subscription().retrieve({
                subRefId: subscriptionRefId,
            });
            let response = await promise;
            expect(response).to.have.property("SubscriptionReference").with.lengthOf(10);
        });
    });

    describe("subscription().update() - ASYNC - Method makes API request to update subscriptions by subscription ref ID", function () {
        this.timeout(0);
        it("It should return true", async function () {
            const updateArgs = {
                subRefId: subscriptionRefId,
                subParams: { RecurringEnabled: true, SubscriptionEnabled: true, ExpirationDate: "2025-12-30" },
            };
            const promise = tco.subscription().update(updateArgs);
            let response = await promise;
            expect(response).equal(true);
        });
    });

    describe("subscription().update() - ASYNC - The same as above but fail!", function () {
        this.timeout(0);
        it("It should return error", async function () {
            const updateArgs = {
                subRefId: subscriptionRefId,
                subParams: { RecurringEnabled: true, SubscriptionEnabled: true, ExpirationDate: "2019-12-30" },
            };
            try {
                const promise = tco.subscription().update(updateArgs);
                let response = await promise;
            } catch (error) {
                expect(error).to.have.property("name").equal("TwocheckoutError");
                expect(error).to.have.property("code").equal("INVALID_EXPIRATION_DATE");
            }
        });
    });

    describe("subscription().disable() - ASYNC - Disable subscription", function () {
        this.timeout(0);
        it("It should return true", async function () {
            try {
                const promise = tco.subscription().disable({
                    subRefId: subscriptionRefId,
                });
                let response = await promise;
                expect(response).equal(true);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe("subscription().enable() - ASYNC - Enable subscription", function () {
        this.timeout(0);
        it("It should return true", async function () {
            try {
                const promise = tco.subscription().enable({
                    subRefId: subscriptionRefId,
                });
                let response = await promise;
                expect(response).equal(true);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe("subscription().enable() - ASYNC - Enable subscription with error", function () {
        this.timeout(0);
        it("It should return error", async function () {
            try {
                const promise = tco.subscription().enable({
                    subRefId: subscriptionRefId,
                });
                let response = await promise;
            } catch (error) {
                console.log(error);
                expect(error).to.have.property("name").equal("TwocheckoutError");
                expect(error).to.have.property("code").equal("INVALID_SUBSCRIPTION_OPERATION");
            }
        });
    });
});
