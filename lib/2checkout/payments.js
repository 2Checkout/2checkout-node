var utils = require("./utils");

var payments = module.exports = function (options) {
    options.type = 'admin';
    this.options = options;
};

payments.prototype.pending = function (callback) {
    this.options.path = "/api/acct/detail_pending_payment";
    this.options.method = "GET";
    this.options.payload = {};
    return utils.execute(this.options, callback);
};

payments.prototype.list = function (callback) {
    this.options.path = "/api/acct/list_payments";
    this.options.method = "GET";
    this.options.payload = {};
    return utils.execute(this.options, callback);
};