var utils = require("./utils");

var sales = module.exports = function (options) {
    this.options = options;
};

sales.prototype.retrieve = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/detail_sale";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.list = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/list_sales";
    this.options.method = "GET";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.refund = function (args, callback) {
    this.options.type = "admin";
    if (typeof args.lineitem_id !== 'undefined') {
        this.options.path = "/api/sales/refund_lineitem";
    } else {
        this.options.path = "/api/sales/refund_invoice";
    }
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.ship = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/mark_shipped";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.comment = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/create_comment";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.reauth = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/reauth";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};

sales.prototype.stop = function (args, callback) {
    this.options.type = "admin";
    this.options.path = "/api/sales/stop_lineitem_recurring";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};