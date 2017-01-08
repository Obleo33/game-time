var chai = require('chai');
var assert = chai.assert;

var Narwhal = require('../lib/narwhal');

describe('Narwhal', function() {
  context('with default attributes', function() {

    var narwhal = new Narwhal({});
    
    it('should be a function', function () {
      assert.isFunction(Narwhal);
    });

    it('should instantiate a Narwhal', function () {
      assert.isObject(narwhal);
    });
  });
});
