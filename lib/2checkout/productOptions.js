var utils = require("./utils");

var productOptions = module.exports = function (options) {
    this.options = options;
};

productOptions.prototype.retrieve = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/detail_option";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

productOptions.prototype.list = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/list_options";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

productOptions.prototype.create = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/create_option";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

productOptions.prototype.update = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/update_option";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

productOptions.prototype.delete = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/products/delete_option";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};