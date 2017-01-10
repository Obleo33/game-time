function narwhal(context,canvas) {
//body
  this.x = 435;
  this.y = 250;
  this.width = 30;
  this.height = 40;
  this.speed = 3;
  this.angle = 0;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.flipperKick = false;
  this.burst = false;
  this.context = context;
  this.canvas = canvas;

//tusk
  this.tuskX = 450;
  this.tuskY = 160;
  this.tuskWidth = 2;
  this.tuskHeight = 90;
  this.targetX = this.tuskX;
  this.targetY = this.tuskY;
  this.angle0 = this.angle * Math.PI / 180;
}

narwhal.prototype.popNarwhal = function(){

  var narwhalImage = document.getElementById('narwhal');


  this.context.save();
  this.context.translate((this.x + this.width/2), this.y);
  this.context.rotate(this.angle);
  this.context.translate(-(this.x + this.width/2), -this.y);

  this.context.fillStyle = "#000000";
  // this.context.fillRect(this.x, this.y, this.width, this.height)
  // this.context.fillRect(this.tuskX, this.tuskY, this.tuskWidth, this.tuskHeight)
  this.context.drawImage(narwhalImage, this.x -12, this.y -90, 40, 150)
  this.context.restore();
  return this
}

narwhal.prototype.justTheTip = function() {
  // var diffX = this.tuskX - this.mx;
  // var diffY = this.tuskY - this.my;
  // var dist = Math.sqrt(diffX * diffX + diffY * diffY);
  // var ca = Math.atan2(diffY, diffX) * 180/Math.PI;
  // var na = ((ca + this.angle) % 360) * Math.PI/180;
  //
  // targetX = ( this.mx + dist * Math.cos(na) + 0.5);
  // targetY = ( this.my + dist * Math.sin(na) + 0.5);
  console.log(this.tuskX, this.tuskY);
}

narwhal.prototype.updateNarwhal = function() {
  this.angle0 = (this.angle % 360) * Math.PI / 180;
  console.log(this.angle0)
    if (this.rotateLeft) {
      this.angle -= .05;
      this.tuskX += this.tuskHeight * (Math.sin(this.angle0));
      this.tuskY += this.tuskHeight * (Math.cos(this.angle0));
      this.justTheTip();
    } else if (this.rotateRight) {
      this.angle += .05
      this.tuskX -= this.tuskHeight * (Math.sin(this.angle0));
      this.tuskY -= this.tuskHeight * (Math.cos(this.angle0));
      this.justTheTip();
    }
    if (this.flipperKick) {
      this.x += this.speed * (Math.sin(this.angle));
      this.tuskX += this.speed * (Math.sin(this.angle));
      this.y -= this.speed * (Math.cos(this.angle));
      this.tuskY -= this.speed * (Math.cos(this.angle));
      this.justTheTip();
    }
    if (this.burst){
      this.x += (this.speed *20) * (Math.sin(this.angle));
      this.tuskX += (this.speed *20) * (Math.sin(this.angle));
      this.y -= (this.speed *20) * (Math.cos(this.angle));
      this.tuskY -= (this.speed *20) * (Math.cos(this.angle));
      this.burst = false;
    }
}

narwhal.prototype.detectCollision = function(){
  if(this.y>500){
    this.y = 500;
    this.tuskY = 410;
  } else if (this.y<125){
    this.y = 125;
    this.tuskY = 35;
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
