var assert = require("assert"),
    tco = require("./spec_helper");


describe('payments', function(){
    describe('pending()', function(){
        it('should return a successful response', function(done){
            tco.payments.pending(function (error, data) {
                assert.ok(data.payment);
                done();
            });
        });
    });

    describe('list()', function(){
        it('should return a successful response', function(done){
            tco.payments.list(function (error, data) {
                assert.ok(data.payments);
                done();
            });
        });
    });
});