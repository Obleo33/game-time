function Seal(object) {
  this.x = (Math.floor(Math.random() * 2) === 0) ? 1 : 899
  this.y = 105
  this.width = 50
  this.height = 30
  this.maxSpeed = object.maxSpeed
  this.minSpeed = object.minSpeed
  this.speed = object.speed || (Math.floor(Math.random()*this.maxSpeed)+this.minSpeed)
  this.count = (Math.floor(Math.random()*300)+100)
  this.context = object.context
  this.canvas = object.canvas
  this.points = this.pointVal(this.speed)

}

Seal.prototype.popSeal = function() {

  this.context.fillStyle = "#000000";
  // this.context.fillRect(this.x, this.y, this.width, this.height)
  var sealImage = document.getElementById('seal');
  this.context.drawImage(sealImage, this.x, this.y, this.width, this.height);

  return this;
};

Seal.prototype.move = function() {
  this.x += this.speed;
  return this;
};

Seal.prototype.detectCollision = function(){
  if (this.x > this.canvas.width){
    this.speed = -1*this.speed;
  } else if (this.x < 0){
    this.speed = -1*this.speed;
  }
};

Seal.prototype.turn = function(){
  if (this.count > 0) {
    this.count--;
  } else if (this.count === 0){
    this.speed = this.speed = -1*this.speed;
    this.count = (Math.floor(Math.random()*300)+100);
  }
  return this;
};

Seal.prototype.pointVal = function (speed){
  if (this.speed === this.maxSpeed){
    return 25
  } else if (this.speed === this.minSpeed){
    return 15
  } else {
    return 20

  }
};


module.exports = Seal;
