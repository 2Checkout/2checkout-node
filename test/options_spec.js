var assert = require("assert"),
    tco = require("./spec_helper");


describe('options', function(){
    describe('list()', function(){
        it('should return a successful response', function(done){
            tco.productOptions.list(list, function (error, data) {
                assert.equal(2, data.options.length);
                done();
            });
        });
    });

    describe('create()', function(){
        it('should return a successful response', function(done){
            tco.productOptions.create(option_create, function (error, data) {
                assert.ok(data.option_id);
                option_data.option_id = data.option_id;
                option_update.option_id = data.option_id;
                done();
            });
        });
    });

    describe('retrieve()', function(){
        it('should return a successful response', function(done){
            tco.productOptions.retrieve(option_data, function (error, data) {
                assert.equal(option_data.option_id, data.option[0].option_id);
                done();
            });
        });
    });

    describe('update()', function(){
        it('should return a successful response', function(done){
            tco.productOptions.update(option_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });

    describe('delete()', function(){
        it('should return a successful response', function(done){
            tco.productOptions.delete(option_update, function (error, data) {
                assert.equal("OK", data.response_code);
                done();
            });
        });
    });
});