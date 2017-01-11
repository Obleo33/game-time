var chai = require('chai');
var assert = chai.assert;
var canvas = {
  height:500,
  width:900
};

var Seal = require('../lib/seal');

describe('Seal', function() {
  context('with default attributes', function() {

    var seal = new Seal({canvas:canvas, maxSpeed: 1, minSpeed: 1});


    it('should be a function', function () {
      assert.isFunction(Seal);
    });

    it('should instantiate a Seal', function() {
      assert.isObject(seal);
    });

    it('should have a move function', function(){
      assert.isFunction(seal.move);
    });

    it('should move the value of speed in the x direction', function (){
      var speed = seal.speed;
      var x = seal.x;
      seal.move();
      assert.equal(seal.x, x + speed);
    });

    it('should have a detectCollision function', function(){
      assert.isFunction(seal.detectCollision);
    });

    it('should change direction if the x value is greather than the canvas width', function(){
      seal.x = 901;
      seal.speed = 1;
      seal.detectCollision();
      assert.equal(seal.speed, -1);
    });

    it('should change direction if the x value is less than the canvas width', function(){
      seal.x = -1;
      seal.speed = -1;
      seal.detectCollision();
      assert.equal(seal.speed, 1);
    });

    it('should have a turn fucntion', function(){
      assert.isFunction(seal.turn);
    });

    it('should change direction if the count is 0', function(){
      seal.speed = 1;
      seal.count = 0;
      seal.turn();
      assert.equal(seal.speed,-1);
    });

    it('should have a pointVal function', function(){
      assert.isFunction(seal.pointVal);
    });

    it('should have a point value of 25 if the speed equals the max speed', function(){
      var seal = new Seal({canvas:canvas, maxSpeed: 3, minSpeed: 1, speed: 3});
      seal.speed = 3;
      seal.pointVal();
      assert.equal(seal.points,25);
    });

    it('should have a point value of 20 if the speed is inbetween the min and max speeds', function(){
      var seal = new Seal({canvas:canvas, maxSpeed: 3, minSpeed: 1, speed: 2});
      seal.speed = 2;
      console.log(seal.speed);
      seal.pointVal();
      assert.equal(seal.points,20);
    });

    it('should have a point value of 15 if the speed equals the min speed', function(){
      var seal = new Seal({canvas:canvas, maxSpeed: 3, minSpeed: 1, speed: 1});
      console.log(seal.speed);
      seal.pointVal();
      assert.equal(seal.points,15);
    });
  });
});
