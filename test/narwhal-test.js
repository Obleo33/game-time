var chai = require('chai');
var assert = chai.assert;

var Narwhal = require('../lib/narwhal');

describe('Narwhal', function() {
  context('with default attributes', function() {

    it('should be a function', function () {
      assert.isFunction(Narwhal);
    });

    it('should instantiate a Narwhal', function () {
      var narwhal = new Narwhal();
      assert.isObject(narwhal);
    });

    it('should have a default x and y position for body and tusk', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.x, 435);
      assert.equal(narwhal.y, 250);
      assert.equal(narwhal.tuskX, 450);
      assert.equal(narwhal.tuskY, 160);
    });

    it('should have a default body height and width', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.height, 40);
      assert.equal(narwhal.width, 30);
    });

    it('should have a default tusk height and width', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.tuskHeight, 90);
      assert.equal(narwhal.tuskWidth, 1);
    });


    it('should have a default speed', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.speed, 3);
    });

    it('should not have a burst of speed by default', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.flipperKick, false);
    });

    it('should have a function "updateNarwhal"', function() {
      var narwhal = new Narwhal();
      assert.isFunction(narwhal.updateNarwhal);
    });

    it('should have a property called moveLeft that defaults to false', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.moveLeft, false);
    });

    it('if moveLeft is true, x should decrement by narwhal speed', function(){
      var narwhal = new Narwhal();
      assert.equal(narwhal.x, 435);
      assert.equal(narwhal.tuskX, 450);
      narwhal.moveLeft = true;
      narwhal.updateNarwhal();
      assert.equal(narwhal.x, 432);
      assert.equal(narwhal.tuskX, 447);
    });

    it('should have a property moveRight that defaults to false', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.moveRight, false);
    });

    it('if moveRight is true, x should increment by narwhal speed',function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.x, 435);
      assert.equal(narwhal.tuskX, 450);
      narwhal.moveRight = true;
      narwhal.updateNarwhal();
      assert.equal(narwhal.x, 438);
      assert.equal(narwhal.tuskX, 453);
    });

    it('should have a property flipperKick that defaults to false', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.flipperKick, false);
    });

    it('if flipperKick is true, narwhal should move up by its speed', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.y, 250);
      assert.equal(narwhal.tuskY, 160);
      narwhal.flipperKick = true;
      narwhal.updateNarwhal();
      assert.equal(narwhal.y, 247);
      assert.equal(narwhal.tuskY, 157);
    });

    it('should have a property burst that defaults to false', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.burst, false);
    });

    it('if burst is true, narwhal should move up 10x its speed', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.y, 250);
      assert.equal(narwhal.tuskY, 160);
      narwhal.burst = true;
      narwhal.updateNarwhal();
      assert.equal(narwhal.y, 220);
      assert.equal(narwhal.tuskY, 130);
    });

    it('should have a detectCollision function', function() {
      var narwhal = new Narwhal();
      assert.isFunction(narwhal.detectCollision);
    });

    function swimLeft(num, narwhal) {
      for (var i = 0; i < num; i++) {
        narwhal.moveLeft = true;
        narwhal.updateNarwhal();
      }
    }

    it('detectCollision should prevent narwhal moving left of the canvas edge', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.x, 435);
      swimLeft(440, narwhal);
      narwhal.detectCollision();
      assert.equal(narwhal.x, 0);
    });

    function swimRight(num, narwhal) {
      for (var i = 0; i < num; i++) {
        narwhal.moveRight = true;
        narwhal.updateNarwhal();
      }
    }

    it('detectCollision should prevent narwhal moving right of the canvas edge', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.x, 435);
      swimRight(915, narwhal);
      narwhal.detectCollision();
      assert.equal(narwhal.x, 900);
    });

    function swimUp(num, narwhal) {
      for (var i = 0; i < num; i++) {
        narwhal.flipperKick = true;
        narwhal.updateNarwhal();
      }
    }

    it('detectCollision should prevent narwhal moving above the ice', function() {
      var narwhal = new Narwhal();
      assert.equal(narwhal.y, 250);
      swimUp(175, narwhal);
      narwhal.detectCollision();
      assert.equal(narwhal.y, 125);
    });

  });
});
