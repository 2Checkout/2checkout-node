const { TimeoutError } = require("got/dist/source");
const Twocheckout = require("../twocheckout");
const config = {
    sellerId: "",
    secretKey: "",
    secretWord: "",
    jwtExpireTime: 20, //minutes
};

let lastRefNo = null;

const paymentOrderSuccessPayload = {
    Country: "us",
    Currency: "USD",
    CustomerIP: "91.220.121.21",
    ExternalReference: "REST_API_AVANGTE",
    Language: "en",
    Source: "testAPI.com",
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
            Name: "Dynamic product",
            Description: "Test description",
            Quantity: 1,
            IsDynamic: true,
            Tangible: false,
            PurchaseType: "PRODUCT",
            CrossSell: {
                CampaignCode: "CAMPAIGN_CODE",
                ParentCode: "MASTER_PRODUCT_CODE",
            },
            Price: {
                Amount: 100,
                Type: "CUSTOM",
            },
            PriceOptions: [
                {
                    Name: "OPT1",
                    Options: [
                        {
                            Name: "Name LR",
                            Value: "Value LR",
                            Surcharge: 7,
                        },
                    ],
                },
            ],
            RecurringOptions: {
                CycleLength: 2,
                CycleUnit: "DAY",
                CycleAmount: 12.2,
                ContractLength: 3,
                ContractUnit: "DAY",
            },
        },
    ],
    PaymentDetails: {
        Type: "TEST",
        Currency: "USD",
        CustomerIP: "91.220.121.21",
        PaymentMethod: {
            CardNumber: "4111111111111111",
            CardType: "VISA",
            Vendor3DSReturnURL: "www.success.com",
            Vendor3DSCancelURL: "www.fail.com",
            ExpirationYear: "2022",
            ExpirationMonth: "12",
            CCID: "123",
            HolderName: "John Doe",
            RecurringEnabled: true,
            HolderNameTime: 1,
            CardNumberTime: 1,
        },
    },
};

const tco = new Twocheckout(config);

console.log("Testing using callback.");
tco.order().create(paymentOrderSuccessPayload, (err, res) => {
    if (err) {
        console.log("Error placing payment with callback!");
        console.error(err);
    } else if (res) {
        console.log("Created order with RefNo: " + res.RefNo);
        tco.order().retrieve({ RefNo: res.RefNo }, (err, res) => {
            if ("RefNo" in res) {
                console.log("Retrieved order RefNo: %s", res.RefNo);
            } else {
                console.error(err);
            }
        });
    }
});

console.log("Testing using async/await.");
(async () => {
    try {
        let result = await tco.order().create(paymentOrderSuccessPayload);
        console.log("Created order with async/await RefNo: %s", result.RefNo);
        let retrieveResult = await tco.order().retrieve({ RefNo: result.RefNo });
        console.log("Retrieved order with async/await RefNo: %s", retrieveResult.RefNo);
    } catch (error) {
        console.error(error);
    }
})();

console.log("Testing using promise.");
tco.order()
    .create(paymentOrderSuccessPayload)
    .then((result) => {
        console.log("Created order with promises RefNo: %s", result.RefNo);
        tco.order()
            .retrieve({ RefNo: result.RefNo })
            .then((result) => {
                console.log("Retrieved order with promises RefNo: %s", result.RefNo);
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    });
