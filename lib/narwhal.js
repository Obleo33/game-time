function narwhal(context,canvas) {
  this.x = 400;
  this.y = 250;
  this.width = 30;
  this.height = 40;
  this.speed = 3;
  this.angle = 0;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.flipperKick = false;
  this.context = context;
  this.canvas = canvas;
  this.tuskX = 414;
  this.tuskY = 160;
  this.tuskWidth = 2;
  this.tuskHeight = 90;
}

narwhal.prototype.popNarwhal = function(){
  this.context.save();
  this.context.translate((this.x + this.width/2), this.y);
  this.context.rotate(this.angle);
  this.context.translate(-(this.x + this.width/2), -this.y);
  this.context.fillRect(this.x, this.y, this.width, this.height)
  this.context.fillRect(this.tuskX, this.tuskY, this.tuskWidth, this.tuskHeight)
  this.context.restore();
  return this
}

narwhal.prototype.updateNarwhal = function() {
    if (this.rotateLeft) {
      this.angle -= Math.PI / 180;
    } else if (this.rotateRight) {
      this.angle += Math.PI / 180;
    }
    if (this.flipperKick) {
      this.x += this.speed * (Math.sin(this.angle));
      this.tuskX += this.speed * (Math.sin(this.angle));
      this.y -= this.speed * (Math.cos(this.angle));
      this.tuskY -= this.speed * (Math.cos(this.angle));
    }
}

// var narwhalPos = [];
//
// narwhal.prototype.topLeft = function () {
//     narwhalPos.push({
//       x: this.x,
//       y: this.y
//     })
// }
//
// narwhal.prototype.topRight = function () {
//     narwhalPos.push ({
//       x: this.x + this.width,
//       y: this.y
//     })
// }
//
// narwhal.prototype.bottomLeft = function () {
//     narwhalPos.push ({
//       x: this.x,
//       y: this.y + this.height
//     })
// }
//
// narwhal.prototype.bottomRight = function () {
//     narwhalPos.push({
//       x: this.x + this.width,
//       y: this.y + this.height
//     })
// }

narwhal.prototype.detectCollision = function(){
  // narwhalPos.forEach(function(obj){
    if(this.y>500){
      this.y = 500;
      this.tuskY = 410;
    } else if (this.y<125){
      this.y = 125;
      this.tuskY = 35;
    }
  // });
};

module.exports = narwhal;
