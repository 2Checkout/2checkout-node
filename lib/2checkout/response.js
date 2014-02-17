var utils = require("./utils"),
    crypto = require('crypto');

var response = module.exports = function (options) {
    this.options = options;
};

response.prototype.valid = function (data, total) {
	data.order_number = this.options.demo === true ? "1" : data.order_number;
    return crypto.createHash('md5').update(
        this.options.secretWord + this.options.sellerId + data.order_number + total
        ).digest("hex").toUpperCase() == data.key;
};