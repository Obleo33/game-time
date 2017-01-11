var chai = require('chai');
var assert = chai.assert;

var Seal = require('../lib/seal');

describe('Seal', function() {
  context('with default attributes', function() {

    var canvas = {
      height:500,
      width:900
    }
    
    it('should be a function', function () {
      assert.isFunction(Seal);
    });

    it('should instantiate a Seal', function () {
      var seal = new Seal({},{});
      assert.isObject(seal);
    });

    it('should have a move function',function(){
      var seal = new Seal({},{});
      assert.isFunction(seal.move);
    })

    it('should move the value of speed in the x direction', function (){
      var seal = new Seal({},{});
      var speed = seal.speed
      var x = seal.x
      seal.move()
      assert.equal(seal.x, x + speed)
    });

    it('should have a detectCollision function',function(){
      var seal = new Seal({},{});
      assert.isFunction(seal.detectCollision);
    })

    it('should change direction if the x value is greather than the canvas width',function(){
      var seal = new Seal({canvas:canvas});
      seal.x = 901
      seal.detectCollision();
      assert.equal(seal.speed, -1)
    })

    it('should have a turn fucntion',function(){
      var seal = new Seal({canvas:canvas});
      assert.isFunction(seal.turn);
    })

    it('should change direction when the turn counter hits 0',function(){

    })


  });
});
