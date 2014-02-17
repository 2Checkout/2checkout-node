var assert = require("assert"),
    tco = require("./spec_helper");


describe('account', function(){
    describe('company()', function(){
        it('should return a successful response', function(done){
            tco.account.company(function (error, data) {
                assert.ok(data.vendor_company_info);
                done();
            });
        });
    });

    describe('contact()', function(){
        it('should return a successful response', function(done){
            tco.account.contact(function (error, data) {
                assert.ok(data.vendor_contact_info);
                done();
            });
        });
    });
});