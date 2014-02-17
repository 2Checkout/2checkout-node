var assert = require("assert"),
    tco = require("./spec_helper");

describe('notification', function(){
    describe('valid()', function(){
        it('should return true', function(){
            assert.ok(tco.notification.valid(notification));
        });
    });
});