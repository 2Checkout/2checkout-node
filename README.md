# 2Checkout By Verifone NodeJs Library

##### This library provides developers with a set of bindings to the Authentication, Payments, Subscriptions, Buy Link Signature Generator and Ipn Hash Validator.

##### All the features present in this library are used through Twocheckout.js for an easier usage and understanding.

-   In order to use that class we have to initialize it using a configuration array.

###### Example of config file:

```js
const Twocheckout = require("./twocheckout.js");
const config = {
    sellerId: "YOUR_SELLER_ID", // REQUIRED
    secretKey: "YOUR_SECRET_KEY", // REQUIRED
};

const tco = new Twocheckout(config);
```

##### -> All the required params in the "config" can be found in [CPanel](https://secure.2checkout.com/cpanel/login.php) in Integrations -> Webhooks & API section

## Place order (By Api)

One can place orders using "Dynamic Product" & "Catalog Product" parameters -> [Details](https://knowledgecenter.2checkout.com/API-Integration/01Start-using-the-2Checkout-API/2Checkout-API-general-information/Build_the_order_object_to_place_orders)

### 1. Dynamic Product -> [Details](https://knowledgecenter.2checkout.com/API-Integration/01Start-using-the-2Checkout-API/2Checkout-API-general-information/Build_the_order_object_to_place_orders#Dynamic_products)

-   To place order payment we have to first obtain/create an [Order](./lib/order.js) object through Twocheckout "tco" instance.
    ##### Example of a successful Dynamic Order payment params:

```js
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
```
### 2. Catalog Product
 The order payment parameters is almost the same except for the Items. Here is an example:
```js
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
      
      //Enable this for subscriptions/recurrence
        // RecurringOptions: {
        //     CycleLength: 2,
        //     CycleUnit: "DAY",
        //     CycleAmount: 12.2,
        //     ContractLength: 3,
        //     ContractUnit: "DAY",
        // }
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
```
The rest of the flow is identical as for placing orders with dynamic products.
-   We can get [Order](./lib/order.js) object by calling Twocheckout "order()" method:

```
let order = tco.order();
```

-   To place a payment order / create payment just call "create" and pass the payload. In the examples you will also see tco.order().retrieve which searches for payment order data by RefNo.

1. You can do it with callback function.

```js
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
```

2. With async/wait, run it synchronously in async function

```js
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
```

3. Using promises. By default create returns a promise so we can just treat it:

```js
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
```

-   To validate the response you first need to check for "refno" key in response and then do a validation API call for
    that "refno". Example:

```js
(async () => {
    try {
        let retrieveResult = await tco.order().retrieve({ RefNo: result.RefNo });
        console.log("Retrieved order with async/await RefNo: %s", retrieveResult.RefNo);
    } catch (error) {
        console.error(error);
    }
})();
```

-   Now one needs to check "retrieveResult['RefNo']" && "retrieveResult['ExternalReference']" if they are set.
    One can also check for "retrieveResult['Status']". For successfully placed payments the value is "COMPLETE". For more
    details check the list of available statuses [Here](https://knowledgecenter.2checkout.com/API-Integration/Channel-Manager-API/SOAP/Reference/Order/OrderInformation_object_structure)

## Buy Link

Another way to place payment orders is by using BuyLink generation. The library supports signature validation & calculation for valid BuyLink links.

### Buy link signature generation

-   To generate a buy link signature one needs a valid parameters array with the following structure (Details
    [Here](https://knowledgecenter.2checkout.com/Documentation/07Commerce/2Checkout-ConvertPlus/ConvertPlus_URL_parameters)):

```js
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
```

-   Do the buy link generation using async/await:

```js
(async () => {
    try {
        let result = await tco.generateBuyLinkSignature(buyLinkParams);
        console.log("\r\nAsync/Await signature result: %s", result.signature);
        //make a copy of the current params object and add signature
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
//Now one can just redirect to the generated url.
```

## Subscriptions

-   For a payment to be recurring (generate a subscription) one needs to add to "item" (product) array structure the
    "RecurringOptions" field
    set.

###### An example of how this option can be configured:

```js
RecurringOptions: {
                CycleLength: 1,
                CycleUnit: "MONTH",
                CycleAmount: 3,
                ContractLength: 3,
                ContractUnit: "Year",
            },
```

###### An example of a item having recurring option:

```js
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
            RecurringOptions: {
                CycleLength: 1,
                CycleUnit: "MONTH",
                CycleAmount: 3,
                ContractLength: 3,
                ContractUnit: "Year",
            },
        },
    ],
```

#### **Retrieving the subscriptions of a payment order** using an order number.

-   In the following example we will get an array of all the subscriptions on an item:

```js
(async () => {
    try {
        let subscriptions = await tco.subscription().getSubscriptionsByOrderRefNo(retrieveResult.RefNo);
        console.log("Retrieved subscriptions: %s", JSON.stringify(subscriptions));
    } catch (error) {
        console.error(error);
    }
})();
```

-   We can pick a subscription reference using the index it has in the retrieved array and then retrieve subscription
    details as in the
    following example:

```js
let firstSubscription = subscriptions[Object.keys(subscriptions)[0]][0];
let subscriptionRefId = firstSubscription["SubscriptionReference"];
```

For more parameters by witch subscriptions can be searched one can check the API documentation [Here](https://app.swaggerhub.com/apis-docs/2Checkout-API/api-rest_documentation/6.0#/), and also check the Subscription class
[Subscription](./lib/subscription.js)

### **Disable Subscription.**

-   The response should be true if subscription has been disabled

```js
const response = await tco.subscription().disable({
    subRefId: subscriptionRefId,
});
```

-   The error responses are intuitive. This is how they look:

```js
Exception disabling subscription. Error Message: {
  "name": "TwocheckoutError",
  "code": "INVALID_SUBSCRIPTION_OPERATION",
  "message": "Cannot enable already enabled subscription"
}
```

### **Enable subscription**

-   The response should be true if subscription has been enabled

```js
const response = await tco.subscription().enable({
    subRefId: subscriptionRefId,
});
```

### **Update subscription**

-   One can update subscription attributes like expiration time, recursion, products

```js
//these are the minimum required attributes to do an update.
const updateArgs = {
    subRefId: subscriptionRefId,
    subParams: { RecurringEnabled: true, SubscriptionEnabled: true, ExpirationDate: "2026-12-30" },
};
try {
    const promise = tco.subscription().update(updateArgs);
    let response = await promise;
} catch (error) {
    console.error(error);
}
```

## Processing IPNs (Instant Payment Notification)
Ipns are post requests from 2Checkout which one can use to update payment statuses asynchronously. Instant Payment Notification (IPN) works as a message service generating automatic order/transaction notifications for your 2Checkout account. Use the notifications to process order data into your own management systems by synchronizing it with 2Checkout account events. 

More details [Here](https://knowledgecenter.2checkout.com/API-Integration/Webhooks/06Instant_Payment_Notification_(IPN))

After one sets the default Ipns in CPanel and can receive the events the following needs to be done:
#### 1. Validate Ipn Hash:
```js
const reqBody = req.body;
const tco = new Twocheckout(config);
if (tco.validateIpnResponse(reqBody)) {
    //..Do your order/payment updates
}  
```
#### 2. Generate Ipn response:
- the response to 2Checkout request
```js
const ipnResponse = tco.generateIpnResponse(reqBody);
res.send(ipnResponse);
``` 
For more examples look into [**"examples"**](./examples) folder in library root folder, or check out the [**tests**](./test).


