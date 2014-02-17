var utils = require("./utils");

var coupons = module.exports = function (options) {
    this.options = options;
};

coupons.prototype.retrieve = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/detail_coupon";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

coupons.prototype.list = function (callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/list_coupons";
    this.options.method = "GET";
    this.options.payload = {};
    return utils.execute(this.options, callback);
};

coupons.prototype.create = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/create_coupon";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

coupons.prototype.update = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/update_coupon";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

coupons.prototype.delete = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/delete_coupon";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};