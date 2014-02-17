2Checkout Node.js Library
=====================

This library provides developers with a simple set of bindings to the 2Checkout Payment API, Hosted Checkout, Instant Notification Service and Admin API.

To use, download or clone the repository and install with npm.

```shell
git clone https://github.com/craigchristenson/2checkout-node.git
npm install 2checkout-node
```

Then you can require the module and setup the 2Checkout object with a number of options shown below.

```javascript
// Require the module
var Twocheckout = require('2checkout-node');

// Pass in your private key and seller ID
var tco = new Twocheckout({
    apiUser: "APIuser1817037",                              // Admin API Username, required for Admin API bindings
    apiPass: "APIpass1817037",                              // Admin API Password, required for Admin API bindings
    sellerId: "1817037",                                    // Seller ID, required for all non Admin API bindings 
    privateKey: "3508079E-5383-44D4-BF69-DC619C0D9811",     // Payment API private key, required for checkout.authorize binding
    secretWord: "tango",                                    // Secret Word, required for response and notification checks
    demo: true,                                             // Set to true if testing response with demo sales
    sandbox: false                                          // Uses 2Checkout sandbox URL for all bindings
});
```

Example Purchase API Usage
-----------------

*Example Request:*

```javascript
// Setup the authorization object
var params = {
    "merchantOrderId": "123",
    "token": "MWQyYTI0ZmUtNjhiOS00NTIxLTgwY2MtODc3MWRlNmZjY2Jh",
    "currency": "USD",
    "total": "10.00",
    "billingAddr": {
        "name": "Testing Tester",
        "addrLine1": "123 Test St",
        "city": "Columbus",
        "state": "Ohio",
        "zipCode": "43123",
        "country": "USA",
        "email": "example@2co.com",
        "phoneNumber": "5555555555"
    }
};

// Make the call using the authorization object and your callback function
tco.checkout.authorize(params, function (error, data) {
    if (error) {
        console.log(error.message);
    } else {
        console.log(JSON.stringify(data));
    }
});
```

*Example Response:*

```json
{
    "validationErrors": null,
    "response": {
        "type": "AuthResponse",
        "currencyCode": "USD",
        "lineItems": [
            {
                "description": "",
                "duration": "1 Year",
                "options": [],
                "price": "6.99",
                "quantity": "2",
                "recurrence": "1 Month",
                "startupFee": null,
                "productId": "123",
                "tangible": "N",
                "name": "Demo Item 1",
                "type": "product"
            },
            {
                "description": "",
                "duration": null,
                "options": [
                    {
                        "optName": "Size",
                        "optValue": "Large",
                        "optSurcharge": "1.00"
                    }
                ],
                "price": "1.99",
                "quantity": "1",
                "recurrence": null,
                "startupFee": null,
                "productId": "",
                "tangible": "N",
                "name": "Demo Item 2",
                "type": "product"
            },
            {
                "description": "",
                "duration": null,
                "options": [],
                "price": "3.00",
                "quantity": "1",
                "recurrence": null,
                "startupFee": null,
                "productId": "",
                "tangible": "Y",
                "name": "Shipping Fee",
                "type": "shipping"
            }
        ],
        "transactionId": "205203115673",
        "billingAddr": {
            "addrLine1": "123 Test St",
            "addrLine2": null,
            "city": "Columbus",
            "zipCode": "43123",
            "phoneNumber": "5555555555",
            "phoneExtension": null,
            "email": "example@2co.com",
            "name": "Testing Tester",
            "state": "Ohio",
            "country": "USA"
        },
        "shippingAddr": {
            "addrLine1": "123 Test St",
            "addrLine2": "",
            "city": "Columbus",
            "zipCode": "43123",
            "phoneNumber": null,
            "phoneExtension": null,
            "email": null,
            "name": "Testing Tester",
            "state": "OH",
            "country": "USA"
        },
        "merchantOrderId": "123",
        "orderNumber": "205203115664",
        "recurrentInstallmentId": null,
        "responseMsg": "Successfully authorized the provided credit card",
        "responseCode": "APPROVED",
        "total": "19.97",
        "errors": null
    },
    "exception": null
}
```

Example Admin API Usage
-----------------

*Example Request:*

```javascript
tco.sales.retrieve({sale_id: 205203115664}, function (error, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});
```

Example Checkout Usage:
-----------------------

*Example Request:*

```javascript
// Setup checkout params
var params = {
    mode: '2CO',
    li_0_name: 'Test Product',
    li_0_price: '0.01'
};

// Get a URL encoded payment link
var link = tco.checkout.link(params);
```

*Example Response:*
```javascript
https://www.2checkout.com/checkout/purchase?mode=2CO&li_0_name=Test%20Product&li_0_price=0.01&sid=1817037
```

Example Return Usage:
---------------------

*Example Request (Using Express):*

```javascript
if (tco.response.valid(request.body), 0.01) {
    response.send("Valid");
} else {
    response.send("Invalid");
}
```

Example INS Notifications Usage:
------------------

*Example Usage (Using Express):*

```javascript
if (tco.notification.valid(request.body)) {
    response.send("Valid");
} else {
    response.send("Invalid");
}
```

Exceptions:
-----------
Errors are returned as the first argument to your callback if they occur. It is best to always check for these before attempting to work with the response.

*Example*

```javascript
tco.checkout.authorize(params, function (error, data) {
    if (error) {
        console.log(error.message);
    } else {
        console.log(JSON.stringify(data));
    }
});
```