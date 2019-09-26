var assert = require("assert"),
    tco = require("./spec_helper");


describe('account', function(){
    describe('company()', function(){
        it('should return a successful response or error', function(done){
            tco.account.company(function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.ok(data.vendor_company_info);
                    assert.ok(data.vendor_company_info.vendor_id);
                }
                done();
            });
        });
    });

    describe('contact', function(){
        it('should return a successful response or error', function(done){
            tco.account.contact(function (error, data) {
                if (error) {
                    assert.ok(error.code);
                    assert.ok(error.message);
                } else {
                    assert.ok(data.vendor_contact_info);
                }
                done();
            });
        });
    });
});