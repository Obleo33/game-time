var chai = require('chai');
var assert = chai.assert;

var Seal = require('../lib/seal');

describe('Seal', function() {
  context('with default attributes', function() {

    it('should be a function', function () {
      assert.isFunction(Seal);
    });

    it('should instantiate a Seal', function () {
      var seal = new Seal();
      assert.isObject(seal);
    });

    it('should have a move function',function(){
      var seal = new Seal();
      assert.isFunction(seal.move);
    })

    it('should move the value of speed in the x direction', function (){
      var seal = new Seal();
      var speed = seal.speed
      var x = seal.x
      seal.move()
      assert.equal(seal.x, x + speed)
    });

    it('should change direction if the x value is greather than the canvas width',function(){

    })


  });
});
