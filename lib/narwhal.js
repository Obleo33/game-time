function narwhal(context,canvas) {
//body
  this.x = 435;
  this.y = 250;
  this.width = 30;
  this.height = 40;
  this.speed = 3;
  // this.angle = 0
  this.moveLeft = false;
  this.moveRight = false;
  this.flipperKick = false;
  this.burst = false;
  this.context = context;
  this.canvas = canvas;

//tusk
  this.tuskX = 450;
  this.tuskY = 160;
  this.tuskWidth = 1;
  this.tuskHeight = 90;
}

narwhal.prototype.popNarwhal = function(){

  var narwhalImage = document.getElementById('narwhal');


  this.context.save();
  this.context.translate((this.x + this.width/2), this.y);
  this.context.translate(-(this.x + this.width/2), -this.y);
  this.context.fillStyle = "#000000";
  this.context.drawImage(narwhalImage, this.x -12, this.tuskY, 40, 150);
  this.context.restore();
  return this;
};

narwhal.prototype.updateNarwhal = function() {
    if (this.moveLeft) {
      this.x -= this.speed;
      this.tuskX -= this.speed;
    } else if (this.moveRight) {
      this.x += this.speed;
      this.tuskX += this.speed;
    }
    if (this.flipperKick) {
      this.y -= this.speed;
      this.tuskY -= this.speed;
    }
    if (this.burst) {
      this.y -= (this.speed*10);
      this.tuskY -= (this.speed*10);
      this.burst = false;
    }
};

narwhal.prototype.detectCollision = function(){
  if(this.y>500) {
    this.y = 500;
    this.tuskY = 410;
  } else if (this.y<135){
    this.y = 135;
    this.tuskY = 45;
  }
  if (this.x < 0){
    this.x = 0;
    this.tuskX = 15;
  } else if (this.x > 900){
    this.x = 900;
    this.tuskX = 915;
  }
};

module.exports = narwhal;
