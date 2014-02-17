var assert = require("assert"),
    tco = require("./spec_helper");

describe('response', function(){
    describe('valid()', function(){
        it('should return true', function(){
            assert.ok(tco.response.valid(response, "0.01"));
        });
    });
});