const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const Twocheckout = require("../../twocheckout");
const helper = require("../spec_helper");

const tco = new Twocheckout(config);

let RefNo_for_get = "0";

describe("Payment orders with Dynamic Products tests.", function () {
    describe("order().create() - Payment Order create test with success response callback:", function () {
        this.timeout(0);
        it("It should return err null && res valid object.", function (done) {
            tco.order().create(paymentOrderSuccessPayload, (err, res) => {
                if (err) {
                    setTimeout(done(err), 2);
                } else if ("RefNo" in res && res["RefNo"].toString().length === 9) {
                    RefNo_for_get = res["RefNo"];
                    setTimeout(done, 2);
                } else {
                    done("Response is not valid!");
                }
            });
        });
    });
    describe("order().create() - Payment Order create test async/await :", function () {
        this.timeout(0);
        it("Resolving promise returns valid response", async function () {
            let promise = tco.order().create(paymentOrderSuccessPayload);
            let response = await promise;
            expect(response).to.have.property("RefNo").with.lengthOf(9);
        });
    });
    describe("order().create() - Payment Order create test with error callback ", function () {
        this.timeout(0);
        it("Done in err. This is how it should resolve.", function (done) {
            tco.order().create(paymentOrderErrorPayload, (err, res) => {
                if (err) {
                    setTimeout(done, 2);
                } else if ("RefNo" in res && res["RefNo"].toString().length === 9) {
                    RefNo_for_get = res["RefNo"];
                    setTimeout(done("This request should have failed!"), 2);
                } else {
                    done("Response is not valid!");
                }
            });
        });
    });
    describe("order().retrieve() - Get Payment Order with success callback ", function () {
        this.timeout(0);
        it("It should return Payment Order searched by RefNo", function (done) {
            console.log("RefNo_for_get: %s", RefNo_for_get);
            tco.order().retrieve({ RefNo: RefNo_for_get }, (err, res) => {
                if (err) {
                    setTimeout(done(err), 2);
                } else if ("RefNo" in res && res["RefNo"].toString().length === 9) {
                    setTimeout(done, 2);
                } else {
                    done("Response is not valid!");
                }
            });
        });
    });
});
