var utils = require("./utils");

var account = module.exports = function (options) {
    this.options = options;
};

account.prototype.company = function (callback) {
    this.options.type = "admin";
    this.options.path = "/api/acct/detail_company_info";
    this.options.method = "GET";
    this.options.payload = {};
    return utils.execute(this.options, callback);
};

account.prototype.contact = function (callback) {
    this.options.type = "admin";
    this.options.path = "/api/acct/detail_contact_info";
    this.options.method = "GET";
    this.options.payload = {};
    return utils.execute(this.options, callback);
};