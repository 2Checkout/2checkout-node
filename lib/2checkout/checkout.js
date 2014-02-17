var utils = require("./utils");
var qs = require('querystring');

var checkout = module.exports = function (options) {
    this.options = options;
};

checkout.prototype.form = function (params, button) {
    html = '<form id="2checkout" action="'+this.options.domain+'/checkout/purchase" method="post">';
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            html += '<input type="hidden" name="'+key+'" value="'+params[key]+'"/>';
        }
    }
    html += '<input type="hidden" name="sid" value="'+this.options.sellerId+'"/>';
    html += '<input type="submit" value="'+button+'" /></form>';
    return html;
};

checkout.prototype.direct = function (params, button) {
    html = '<form id="2checkout" action="'+this.options.domain+'/checkout/purchase" method="post">';
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            html += '<input type="hidden" name="'+key+'" value="'+params[key]+'"/>';
        }
    }
    html += '<input type="hidden" name="sid" value="'+this.options.sellerId+'"/>';
    html += '<input type="submit" value="'+button+'" /></form>';
    html += '<script src='+this.options.domain+'/static/checkout/javascript/direct.min.js"></script>';
    return html;
};

checkout.prototype.link = function (params) {
    params.sid = this.options.sellerId;
    return this.options.domain+'/checkout/purchase?'+qs.stringify(params);
};

checkout.prototype.authorize = function (args, callback) {
    this.options.type = "payment";
    this.options.path = "/checkout/api/1/"+this.options.sellerId+"/rs/authService";
    this.options.method = "POST";
    this.options.payload = args;
    return utils.execute(this.options, callback);
};