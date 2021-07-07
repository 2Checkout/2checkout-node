const Subscription = require("../lib/subscription");
const ApiCore = require("../lib/api-core");
const ApiAuth = require("../lib/api-auth");
const Twocheckout = require("../twocheckout");
const config = {
    sellerId: "",
    secretKey: "",
    secretWord: "",
    jwtExpireTime: 20, //minutes
};

let lastRefNo = null;

const paymentOrderWithSubscriptionSuccessPayload = {
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
                Amount: 2,
                Type: "CUSTOM",
            },
            // PriceOptions: [
            //     {
            //         Name: "OPT1",
            //         Options: [
            //             {
            //                 Name: "Name LR",
            //                 Value: "Value LR",
            //                 Surcharge: 7,
            //             },
            //         ],
            //     },
            // ],
            RecurringOptions: {
                CycleLength: 1,
                CycleUnit: "MONTH",
                CycleAmount: 3,
                ContractLength: 3,
                ContractUnit: "Year",
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

let orderCatalogProductParams = {
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
        Code: "E377076E6A_COPY1",
        Quantity: "1",
      
        RecurringOptions: {
            CycleLength: 2,
            CycleUnit: "DAY",
            CycleAmount: 12.2,
            ContractLength: 3,
            ContractUnit: "DAY",
        }
    }
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
}

const tco = new Twocheckout(config);

const apiAuth = new ApiAuth(config);
const apiCore = new ApiCore(apiAuth);
const subscription = new Subscription(apiCore);

////TEST 1 - Get subscriptions by payment order RefNo;

//With callback
tco.order().create(paymentOrderWithSubscriptionSuccessPayload, (err, res) => {
    if (err) {
        console.error("Error getting subscriptions: Error Message: %s", JSON.stringify(err, null, 2));
    } else if (res) {
        console.log("Created order with RefNo: " + res.RefNo);
        lastRefNo = res.RefNo;
        setTimeout(() => {
            console.log("Get subscription");
            subscription.getSubscriptionsByOrderRefNo(lastRefNo, (err, res) => {
                console.log("Subscription response:");
                if (err !== null) {
                    console.log(err);
                }
                if (res !== null) {
                    console.log(JSON.stringify(res, null, 2));
                }
            });
        }, 2000);
    }
});

//Place payment order with Catalog Product. You need a 2Checkout by Verifone CPanel vendor account
//then just change the product code in orderCatalogProductParams

(async () => {
    try {
        let result = await tco.order().create(orderCatalogProductParams);
        console.error(result);
        console.log("Created order with async/await RefNo: %s", result.RefNo);
        setTimeout(async() => {
            let subscriptions = await subscription.getSubscriptionsByOrderRefNo(result.RefNo);
            console.log("Retrieved subscriptions: %s", JSON.stringify(subscriptions));
        }, 2000);
    } catch (error) {
        console.error(error);
    }
})();

///With Dynamic Products
// await/async
(async () => {
    try {
        let result = await tco.order().create(paymentOrderWithSubscriptionSuccessPayload);
        console.log("Created order with async/await RefNo: %s", result.RefNo);
        setTimeout(async() => {
            let subscriptions = await subscription.getSubscriptionsByOrderRefNo(result.RefNo);
            console.log("Retrieved subscriptions: %s", JSON.stringify(subscriptions));
        }, 2000);
        let subscriptions = await subscription.getSubscriptionsByOrderRefNo(result.RefNo);
        console.log("Retrieved subscriptions: %s", JSON.stringify(subscriptions));
    } catch (error) {
        console.error(error);
    }
})();

//With promise
tco.order()
    .create(paymentOrderWithSubscriptionSuccessPayload)
    .then((result) => {
        lastRefNo = result.RefNo;
        console.log("Created Payment with promise with RefNo %s.", lastRefNo);
        setTimeout(() => {
            subscription
                .getSubscriptionsByOrderRefNo(lastRefNo)
                .then((subscriptions) => {
                    console.log(subscriptions);
                })
                .catch((e) => {
                    console.error("Error getting subscriptions: Error Message: %s", JSON.stringify(e, null, 2));
                });
        }, 2000);
    });

//TEST 2 - GET subscription by SubscriptionReference ID
let refno = "151933178"; //lastRefNo;
let subscriptionReferenceId = "YA5745Z23V";

//the RefNo now is the subscription ID
const searchArgs = {
    path: "/subscriptions",
    subRefId: subscriptionReferenceId,
};

////With callback
tco.subscription().retrieve(searchArgs, (err, res) => {
    if (err !== null) {
        console.log(err);
    }

    if (res !== null) {
        console.log(res);
    }
});

////Async /Await
(async () => {
    try {
        const response = await tco.subscription().retrieve(searchArgs);
        if ("SubscriptionReference" in response) {
            console.log("Subscription params: %s", JSON.stringify(response, null, 2));
        }
    } catch (e) {
        console.error("Exception retrieving subscription. Error Message: %s", JSON.stringify(e, null, 2));
    }
})();

////TEST 3 - Update subscription
const updateArgs = {
    subRefId: subscriptionReferenceId,
    subParams: { RecurringEnabled: true, SubscriptionEnabled: true },
};

(async () => {
    try {
        const subscription = await tco.subscription().retrieve(searchArgs);
        updateArgs.subRefId = subscription.SubscriptionReference;
        updateArgs.subParams.ExpirationDate = "2025-12-30";

        const updateResponse = await tco.subscription().update(updateArgs);
        console.log(updateResponse);
        if (updateResponse === true) {
            console.log("Subscription updated with success!");
        } else {
            console.error("Subscription update failed!");
        }
    } catch (e) {
        console.error("Exception updating subscription. Error Message: %s", JSON.stringify(e, null, 2));
    }
})();

////Test 4 - Disable subscription
const disableArgs = {
    subRefId: subscriptionReferenceId,
};

(async () => {
    try {
        const disableSubscription = await tco.subscription().disable(searchArgs);
        console.log(disableSubscription);
        if (disableSubscription === true) {
            console.log("Subscription disabled with success!");
        } else {
            console.error("Subscription disable failed!");
        }
    } catch (e) {
        console.error("Exception disabling subscription. Error Message: %s", JSON.stringify(e, null, 2));
    }
})();

//Test 5 - Enable subscription
const disableArgs = {
    subRefId: subscriptionReferenceId,
};

(async () => {
    try {
        const enabledSubscription = await tco.subscription().enable(searchArgs);
        console.log(enabledSubscription);
        if (enabledSubscription === true) {
            console.log("Subscription enabled with success!");
        } else {
            console.error("Subscription enable failed!");
        }
    } catch (e) {
        console.error("Exception enabling subscription. Error Message: %s", JSON.stringify(e, null, 2));
    }
})();
