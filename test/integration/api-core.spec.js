const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

//turn on should mode (resolve promises)
const should = chai.should();
const expect = chai.expect;

const ApiAuth = require("../../lib/api-auth");
const ApiCore = require("../../lib/api-core");
const helper = require("../spec_helper");

const apiAuth = new ApiAuth(config);
const core = new ApiCore(apiAuth);

let RefNo_for_get = "0";

describe("Api Core tests.", function () {
    describe("execute() - Api call test with callback:", function () {
        this.timeout(0);
        it("It should return err null && res valid object.", function (done) {
            const apiArgs = {
                method: "POST",
                payload: paymentOrderSuccessPayload,
                path: "/orders",
            };
            core.execute(apiArgs, (err, res) => {
                if (err) {
                    setTimeout(done(err), 50);
                } else if ("RefNo" in res && res["RefNo"].toString().length === 9) {
                    RefNo_for_get = res["RefNo"];
                    setTimeout(done, 50);
                } else {
                    done("Response is not valid!");
                }
            });
        });
    });
    describe("prepareRequest() - Test for GET", function () {
        it("It should match the expected response for GET arguments", function () {
            console.log("RefNo_for_get: %s", RefNo_for_get);
            //adding RefNo value in search path
            getApiArgs.path += RefNo_for_get.toString();
            const preparedRequest = core.prepareRequest(getApiArgs);

            expect(preparedRequest).to.have.property("options").to.be.a("object");
            let options = preparedRequest.options;
            expect(options).to.have.property("method").equal("GET");
            expect(options).to.have.property("responseType").equal("json");
            expect(options).to.have.property("prefixUrl");
            expect(options).to.have.property("headers").to.be.a("object");
            expect(options).to.not.have.property("body"); //just in our situation because we search only by RefNo
        });
    });
    describe("prepareRequest() - Test for POST", function () {
        it("It should match the expected response for POST arguments", function () {
            const preparedRequest = core.prepareRequest(postApiArgs);
            expect(preparedRequest).to.have.property("options").to.be.a("object");
            let options = preparedRequest.options;
            expect(preparedRequest).to.have.property("path").to.be.a("string");
            let path = preparedRequest.path;
            expect(options).to.have.property("method").equal("POST");
            expect(options).to.have.property("responseType").equal("json");
            expect(options).to.have.property("prefixUrl").equal("https://api.2checkout.com/rest/6.0");
            expect(options).to.have.property("headers").to.be.a("object");
            expect(options).to.have.property("body").to.be.a("string");
            expect(path).equal("orders");
        });
    });
    describe("execute() - Api call test async/wait:", function () {
        this.timeout(0);
        it("It should return promise and resolve it", async function () {
            const apiArgs = {
                method: "POST",
                payload: paymentOrderSuccessPayload,
                path: "/orders",
            };
            try {
                let promise = core.execute(apiArgs);
                let response = await promise;
                expect(response).to.have.property("RefNo").with.lengthOf(9);
            } catch (error) {
                //make it fail!
                expect(error).to.not.have.property("name").equal("TwocheckoutError");
            }
        });
    });

    describe("executeWithPromise() - Api call test with promise return.", function () {
        this.timeout(0);
        it("Returns order payment result with promise, and tests if RefNo exists and if value has length 9", function (done) {
            const apiArgs = {
                method: "POST",
                payload: paymentOrderSuccessPayload,
                path: "/orders",
            };
            core.executeWithPromise(apiArgs).should.eventually.have.property("RefNo").with.lengthOf(9).notify(done);
        });
    });
});
