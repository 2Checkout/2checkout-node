const Twocheckout = require("../twocheckout");
const config = {
    sellerId: "",
    secretKey: "",
    secretWord: "",
    jwtExpireTime: 20, //minutes
};

let lastRefNo = null;

const tco = new Twocheckout(config);
console.log("Test buy link generate signature.");

const buyLinkParams = {
    address: "Test Address",
    city: "LA",
    country: "US",
    name: "Customer 2Checkout",
    phone: "0770678987",
    zip: "12345",
    email: "testcustomer@2Checkout.com",
    "company-name": "Verifone",
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
    "return-url": "http://tcoLib.example/paymentCallback.php",
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
};

console.log("Generate buy link signature using callback.");
tco.generateBuyLinkSignature(buyLinkParams, (err, res) => {
    if (err) {
        console.error("Error: %s", err.toString());
    } else if ("signature" in res) {
        console.log("Generated Signature: %s", res.signature);
        let finalParams = JSON.parse(JSON.stringify(buyLinkParams));
        finalParams.signature = res.signature;
        const params = new URLSearchParams(finalParams);
        const str = params.toString();
        const redirectTo = "https://secure.2checkout.com/checkout/buy/?" + str;
        console.log("Redirect to: %s", redirectTo);
    } else {
        console.error("Signature not found! Res: %s", res.toString());
    }
});

console.log("Testing using async/await.");
(async () => {
    try {
        let result = await tco.generateBuyLinkSignature(buyLinkParams);
        console.log("\r\nAsync/Await signature result: %s", result.signature);
        //make a copy of the current params object which contains src
        let finalParams = JSON.parse(JSON.stringify(buyLinkParams));
        finalParams.signature = result.signature;

        const params = new URLSearchParams(finalParams);
        const str = params.toString();
        const redirectTo = "https://secure.2checkout.com/checkout/buy/?" + str;
        console.log("Async/Await Redirect to: %s", redirectTo);
    } catch (error) {
        console.error(error);
    }
})();
