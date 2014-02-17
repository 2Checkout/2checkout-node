var assert = require("assert"),
    tco = require("./spec_helper");


describe('coupons', function(){
    describe('list()', function(){
        it('should return a successful response', function(done){
            tco.coupons.list(function (error, data) {
                assert.ok(data.coupon);
                done();
            });
        });
    });

    describe('create()', function(){
        it('should return a successful response', function(done){
            tco.coupons.create(coupon_create, function (error, data) {
                assert.ok(data.coupon_code);
                coupon_data.coupon_code = data.coupon_code;
                coupon_update.coupon_code = data.coupon_code;
                done();
            });
        });
    });

    describe('retrieve()', function(){
        it('should return a successful response', function(done){
            tco.coupons.retrieve(coupon_data, function (error, data) {
                assert.equal(coupon_data.coupon_code, data.coupon.coupon_code);
                done();
            });
        });
    });

    describe('update()', function(){
        it('should return a successful response', function(done){
            tco.coupons.update(coupon_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });

    describe('delete()', function(){
        it('should return a successful response', function(done){
            tco.coupons.delete(coupon_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });
});