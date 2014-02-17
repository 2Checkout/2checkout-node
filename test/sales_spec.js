var assert = require("assert"),
    tco = require("./spec_helper");


describe('sales', function(){
    describe('retrieve()', function(){
        it('should return a successful response', function(done){
            tco.sales.retrieve(sale_retrieve, function (error, data) {
                assert.equal(sale_retrieve.sale_id, data.sale.sale_id);
                done();
            });
        });
    });

    describe('list()', function(){
        it('should return a successful response', function(done){
            tco.sales.list(list, function (error, data) {
                assert.equal(list.pagesize, data.sale_summary.length);
                done();
            });
        });
    });

    describe('refund()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.refund(sale_refund, function (error, data) {
                if (error) {
                    assert.equal("Error: Invoice too old to refund.", error);
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
                    assert.equal("Error: Lineitem is not scheduled to recur.", error);
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
                    assert.equal("Error: Sale already marked shipped.", error);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });

    describe('reauth()', function(){
        it('should return a successful response or error', function(done){
            tco.sales.reauth(sale_reauth, function (error, data) {
                if (error) {
                    assert.equal("Error: Payment is already pending or deposited and cannot be reauthorized.", error);
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
                    assert.equal("Error: Required parameter missing: sale_comment", error);
                } else {
                    assert.equal("OK", data.response_code);
                }
                done();
            });
        });
    });
});
