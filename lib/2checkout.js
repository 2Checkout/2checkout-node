var sales = require("./2checkout/sales"),
    products = require("./2checkout/products"),
    productOptions = require("./2checkout/productOptions"),
    coupons = require("./2checkout/coupons"),
    account = require("./2checkout/account"),
    payments = require("./2checkout/payments"),
    response = require("./2checkout/response"),
    notification = require("./2checkout/notification"),
    checkout = require("./2checkout/checkout");

var Twocheckout = module.exports = function (options) {
    // Setup Options
    if (typeof options.privateKey !== 'undefined') {
        this.privateKey = options.privateKey;
    }
    if (typeof options.sellerId !== 'undefined') {
        this.sellerId = options.sellerId;
    }
    if (typeof options.apiUser !== 'undefined') {
        this.apiUser = options.apiUser;
    }
    if (typeof options.apiPass !== 'undefined') {
        this.apiPass = options.apiPass;
    }
    if (typeof options.secretWord !== 'undefined') {
        this.secretWord = options.secretWord;
    }
    if (typeof options.demo !== 'undefined') {
        this.demo = options.demo;
    }
    if (typeof options.sandbox !== 'undefined' && options.sandbox === true) {
        this.domain = 'https://sandbox.2checkout.com';
    } else {
        this.domain = 'https://www.2checkout.com';
    }

    // Setup Methods
    this.sales = new sales(this);
    this.products = new products(this);
    this.productOptions = new productOptions(this);
    this.coupons = new coupons(this);
    this.account = new account(this);
    this.payments = new payments(this);
    this.response = new response(this);
    this.notification = new notification(this);
    this.checkout = new checkout(this);

    return this;
};
