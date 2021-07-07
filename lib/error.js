const util = require("util");

class TwocheckoutError {
    constructor(code, message) {
        this.name = "TwocheckoutError";
        this.code = code;
        this.message = message;
    }
}
util.inherits(TwocheckoutError, Error);

module.exports = TwocheckoutError;
