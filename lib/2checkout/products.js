var utils = require("./utils");

var products = module.exports = function (options) {
    this.options = options;
};

products.prototype.retrieve = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/detail_product";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

products.prototype.list = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/list_products";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

products.prototype.create = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/create_product";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

products.prototype.update = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/update_product";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

products.prototype.delete = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/delete_product";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};