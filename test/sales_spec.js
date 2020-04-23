var assert = require("assert"),
    tco = require("./spec_helper");


describe('sales', function(){
    describe('retrieve()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.retrieve(sale_retrieve, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                    assert.equal(sale_retrieve.sale_id, data.sale.sale_id);
                }
                done();
            });
        });
    });

    describe('list()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.list(list, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                    assert.equal(list.pagesize, data.sale_summary.length);
                }
                done();
            });
        });
    });

    describe('refund()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.refund(sale_refund, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });

    describe('stop()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.stop(sale_stop, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });

    describe('ship()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.ship(sale_ship, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });


    describe('comment()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.comment(sale_comment, function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });
});
