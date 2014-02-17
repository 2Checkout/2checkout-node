var Twocheckout = require("../lib/2checkout.js");

var tco = module.exports = new Twocheckout({
    apiUser: "APIuser1817037",
    apiPass: "APIpass1817037",
    sellerId: "1817037",
    privateKey: "9999999",
    secretWord: "tango",
    demo: false,
    sandbox: false
});

//global data
list = {
    pagesize: "2"
};

//sale data
sale_retrieve = {
    sale_id: "4774380224"
};
sale_refund = {
    sale_id: "4774380224",
    comment: "test",
    category: "5"
};
sale_ship = {
    sale_id: "4774380224",
    tracking_number: "123"
};
sale_reauth = {
    sale_id: "4774380224"
};
sale_stop = {
    lineitem_id: "4834917634"
};
sale_comment = {
    sale_id: "4774380224",
    sale_comment: "nodejs test"
};

//product data
product_create = {
    name: "test product",
    price: "0.01"
};
product_update = {
    price: "1.00",
    product_id: 123
};
product_data = {
    product_id: 123
};

//option data
option_create = {
    option_name: "test option",
    option_value_name: "value name",
    option_value_surcharge: "0.01"
};
option_update = {
    option_id: 123,
    option_name: "test option update"
};
option_data = {
    option_id: 123
};

//coupon data
coupon_create = {
    date_expire: "2099-01-01",
    type: "sale",
    value_off: "0.01",
    minimum_purchase: "0.03"
};
coupon_update = {
    coupon_code: 123,
    value_off: "0.02",
    minimum_purchase: "0.03"
};
coupon_data = {
    coupon_code: 123
};

//notification data
notification = {
    invoice_id: "4632527490",
    md5_hash: "4FB7CD1CD57BBEFCCA462F3DE823C50A",
    sale_id: "4632527448"
};

//response data
response = {
    key: '7AB926D469648F3305AE361D5BD2C3CB',
    order_number: '4774380224'
};

//authorize data
authorize = {
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

//checkout params
params = {
    mode: '2CO',
    li_0_name: 'Test Product',
    li_0_price: '0.01',
    card_holder_name: 'Testing Tester',
    email: 'tester@2co.com',
    street_address: '123 test st',
    city: 'Columbus',
    state: 'Ohio',
    zip: '43123',
    country: 'USA'
};