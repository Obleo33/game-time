var chai = require('chai');
var assert = chai.assert;

var Seal = require('../lib/seal');

describe('Seal', function() {
  context('with default attributes', function() {

    var seal = new Seal({});

    it('should be a function', function () {
      assert.isFunction(Seal);
    });

    it('should instantiate a Seal', function () {
      assert.isObject(seal);
    });
  });
});
