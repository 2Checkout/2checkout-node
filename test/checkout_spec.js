var assert = require("assert"),
    tco = require("./spec_helper");

describe('checkout', function(){
    describe('authorize()', function(){
        it('should return a success or unauthorized response', function(done){
            tco.checkout.authorize(authorize, function (error, data) {
                if (error) {
                    assert.equal("Error: Unauthorized", error);
                } else {
                    assert.equal("APPROVED", data.response.responseCode);
                }
                done();
            });
        });
    });
});