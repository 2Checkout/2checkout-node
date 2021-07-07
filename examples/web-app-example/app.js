const express = require("express");
const path = require("path");
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./templates");
let twing = new TwingEnvironment(loader);
const Twocheckout = require("../../twocheckout");
const util = require("util");
const cookieParser = require("cookie-parser");
const e = require("express");

const config = {
    sellerId: "",
    secretKey: "",
    secretWord: "",
    jwtExpireTime: 20, //minutes
};

const simple_payment_params = {
    Country: "us",
    Currency: "USD",
    CustomerIP: "91.220.121.21",
    ExternalReference: "MyCustomOrder#1",
    Language: "en",
    Source: "NodeJs-tests",
    BillingDetails: {
        Address1: "Test Address",
        City: "LA",
        State: "California",
        CountryCode: "US",
        Email: "testcustomer@2Checkout.com",
        FirstName: "Customer",
        LastName: "2Checkout",
        Zip: "12345",
    },
    Items: [
        {
            Code: null,
            Quantity: 1,
            Name: "Cart_",
            Description: "N/A",
            RecurringOptions: null,
            IsDynamic: true,
            Tangible: false,
            PurchaseType: "PRODUCT",
            Price: {
                Amount: "1.52",
                Type: "CUSTOM",
            },
        },
    ],
    PaymentDetails: {
        Type: "TEST",
        Currency: "USD",
        CustomerIP: "91.220.121.21",
        PaymentMethod: {
            EesToken: "ESS_TOKEN",
            Vendor3DSReturnURL: "www.success.com",
            Vendor3DSCancelURL: "www.fail.com",
        },
    },
};

const simple_buy_link_payment_params = {
    address: "Test Address",
    city: "LA",
    country: "US",
    name: "Customer 2Checkout",
    phone: "0770678987",
    zip: "12345",
    email: "testcustomer@2Checkout.com",
    "company-name": "2Checkout by Verifone",
    state: "California",
    "ship-name": "Customer 2Checkout",
    "ship-address": "Test Address",
    "ship-city": "LA",
    "ship-country": "US",
    "ship-email": "testcustomer@2Checkout.com",
    "ship-state": "California",
    prod: "Buy link Dynamic product test product from API",
    price: 1,
    qty: 1,
    type: "PRODUCT",
    tangible: 0,
    "return-url": "http://tcoNodeJsLib.example/paymentCallback.php",
    "return-type": "redirect",
    expiration: new Date().getTime() + 3600 * 5,
    "order-ext-ref": "CustOrd100",
    "item-ext-ref": "20210423094943",
    "customer-ext-ref": "testcustomer@2Checkout.com",
    currency: "usd",
    language: "en",
    test: 1,
    merchant: config.sellerId,
    dynamic: 1,
    recurrence: "1:MONTH",
    duration: "12:MONTH",
    "renewal-price": 1,
};

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for form data

app.get("/", (req, res) => {
    twing
        .render("index.twig", {
            merchant_code: config.sellerId,
            order_params: simple_payment_params,
            ipn_callback_url: req.headers.host + "/ipnResponse",
        })
        .then((output) => {
            res.send(output);
        });
});

app.get("/buyLinkCallback", (req, res) => {
    let response = util.format("Received payment callback with RefNo: %s", req.query.refno);
    const redirectTo = util.format("%s://%s/", "http", req.headers.host);
    res.cookie("buylinkRefNo", req.query.refno, { expire: 400000 + Date.now() });
    res.redirect(redirectTo);
});

app.post("/order", async (req, res) => {
    const tco = new Twocheckout(config);
    const request = req.body;
    const ess_token = request.ess_token;
    simple_payment_params.PaymentDetails.PaymentMethod.EesToken = ess_token;
    try {
        let result = await tco.order().create(simple_payment_params);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

app.post("/subscription", (req, ret) => {
    const tco = new Twocheckout(config);
    const request = req.body;
    if (typeof request.RefNo !== "undefined") {
        tco.subscription().getSubscriptionsByOrderRefNo(request.RefNo, (err, res) => {
            if (res !== null) {
                let firstSubscriptionRefId = res[Object.keys(res)[0]][0]["SubscriptionReference"];
                ret.json({ payload: res, subscriptionRefId: firstSubscriptionRefId });
            }
            if (err !== null) {
                ret.json({ error: "Couldn't find subscription reference ID for RefNo: " + request.RefNo });
            }
        });
    } else {
        ret.json({ error: "No RefNo!!!" });
    }
});

app.post("/disable_subscription", (req, ret) => {
    const tco = new Twocheckout(config);
    const request = req.body;
    if (typeof request.subscriptionRefId !== "undefined") {
        tco.subscription().disable({ subRefId: request.subscriptionRefId }, (err, res) => {
            if (res !== null) {
                ret.json({ payload: res, subscriptionRefId: request.subscriptionRefId });
            }
            if (err !== null) {
                ret.json({ error: "Error " + JSON.stringify(err, null, 2) });
            }
        });
    } else {
        ret.json({ error: "No RefNo!!!" });
    }
});

app.post("/enable_subscription", (req, ret) => {
    const tco = new Twocheckout(config);
    const request = req.body;
    if (typeof request.subscriptionRefId !== "undefined") {
        tco.subscription().enable({ subRefId: request.subscriptionRefId }, (err, res) => {
            if (res !== null) {
                ret.json({ payload: res, subscriptionRefId: request.subscriptionRefId });
            }
            if (err !== null) {
                ret.json({ error: "Error " + JSON.stringify(err, null, 2) });
            }
        });
    } else {
        ret.json({ error: "No RefNo!!!" });
    }
});

app.post("/buyLink", (req, ret) => {
    const tco = new Twocheckout(config);
    const request = req.body;
    if (typeof request.buy_link !== "undefined" && request.buy_link === "true") {
        let finalParams = JSON.parse(JSON.stringify(simple_buy_link_payment_params));
        finalParams["return-url"] = req.headers.origin + "/buyLinkCallback";
        tco.generateBuyLinkSignature(finalParams, (err, res) => {
            if (err) {
                console.error(err);
                ret.json(err);
            } else if ("signature" in res) {
                finalParams.signature = res.signature;
                const params = new URLSearchParams(finalParams);
                const str = params.toString();
                const redirectTo = "https://secure.2checkout.com/checkout/buy/?" + str;
                ret.json({ redirect: redirectTo });
            } else {
                ret.json({ Error: "Signature not found! Res: " + res.toString() });
            }
        });
    } else {
        ret.json({ Error: "Add buy_link param to request" });
    }
});

app.post("/ipnResponse", (req, res) => {
    const reqBody = req.body;
    const tco = new Twocheckout(config);
    if (tco.validateIpnResponse(reqBody)) {
        const ipnResponse = tco.generateIpnResponse(reqBody);
        res.send(ipnResponse);
    } else {
        console.log("IPN INVALID!");
    }
});

app.get("/ipnResponse", (req, res) => {
    res.send("Ok");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
