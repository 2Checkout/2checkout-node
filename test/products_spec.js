var assert = require("assert"),
    tco = require("./spec_helper");


describe('products', function(){
    describe('list()', function(){
        it('should return a successful response', function(done){
            tco.products.list(list, function (error, data) {
                assert.equal(2, data.products.length);
                done();
            });
        });
    });

    describe('create()', function(){
        it('should return a successful response', function(done){
            tco.products.create(product_create, function (error, data) {
                assert.ok(data.product_id);
                product_data.product_id = data.product_id;
                product_update.product_id = data.product_id;
                done();
            });
        });
    });

    describe('retrieve()', function(){
        it('should return a successful response', function(done){
            tco.products.retrieve(product_data, function (error, data) {
                assert.equal(product_data.product_id, data.product.product_id);
                done();
            });
        });
    });

    describe('update()', function(){
        it('should return a successful response', function(done){
            tco.products.update(product_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });

    describe('delete()', function(){
        it('should return a successful response', function(done){
            tco.products.delete(product_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });

});
