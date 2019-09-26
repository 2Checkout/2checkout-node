var util = require('util');
var TwocheckoutError = module.exports = function(code, message) {
  this.name = 'TwocheckoutError';
  this.code = code;
  this.message = message;
}

util.inherits(TwocheckoutError, Error);

