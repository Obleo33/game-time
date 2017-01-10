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

    it('should have a default speed', function() {
      assert.equal(narwhal.speed, 3);
    });

    it('should not have a burst of speed by default', function() {
      assert.equal(narwhal.flipperKick, false);
    });

    it('should have a function "updateNarwhal" that updates the narwhals position', function() {
      assert.isFunction(narwhal.updateNarwhal);
    });

    it('should have a property called moveLeft that defaults to false', function() {
      assert.equal(narwhal.moveLeft, 432);

    });

    it.skip('if "moveLeft" is true, narwhal.x should decrement by its speed', function() {
      narwhal.moveLeft = true;
      assert.equal(narwhal.moveLeft, true);
      assert.equal(narwhal.x, 432)
    });

    it.skip('if moveRight is true, narwhal.x should increment by its speed', function() {

    });

    it.skip('if flipperKick is true, narwhal.y should decrement by 10', function() {

    });

    it.skip('')


  });
});
