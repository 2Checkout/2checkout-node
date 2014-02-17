var utils = require("./utils"),
    crypto = require('crypto');

var notification = module.exports = function (options) {
    this.options = options;
};

notification.prototype.valid = function (data) {
    return crypto.createHash('md5').update(
        data.sale_id + this.options.sellerId + data.invoice_id + this.options.secretWord
        ).digest("hex").toUpperCase() == data.md5_hash;
};