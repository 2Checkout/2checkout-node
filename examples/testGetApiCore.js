const ApiAuth = require("../../lib/api-auth");
const ApiCore = require("../../lib/api-core");

const config = {
    sellerId: "",
    secretKey: "",
};

const auth = new ApiAuth(config);
const core = new ApiCore(auth);

const apiArgs = {
    method: "GET",
    path: "/orders/149188518",
};

//Simple test just to prove it's working until finishing Mocha tests
const corePlaceOrderCallback = () => {
    core.execute(apiArgs, (err, res) => {
        if (err !== null) {
            console.error(err);
        } else {
            console.log("Retrieved payment order with RefNo: %s", res.RefNo);
        }
    });
};

corePlaceOrderCallback();

(async () => {
    try {
        let result = await core.execute(apiArgs);
        console.log("Retrieved payment order with RefNo: %s", result.RefNo);
    } catch (error) {
        console.error(error);
    }
})();
