function narwhal(context,canvas) {
  this.x = 400;
  this.y = 250;
  this.width = 30;
  this.height = 40;
  this.speed = 2;
  this.angle = 0;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.flipperKick = false;
  this.context = context;
  this.canvas = canvas;
  this.tuskX = 414;
  this.tuskY = 180;
  this.tuskWidth = 2;
  this.tuskHeight = 90;
}

narwhal.prototype.popNarwhal = function(){
  this.context.save();
  this.context.translate(this.x, (this.y + this.height/2));
  this.context.rotate(this.angle);
  this.context.translate(-this.x,-(this.y + this.height/2));
  this.context.fillRect(this.x,this.y,this.width,this.height)
  this.context.fillRect(this.tuskX,this.tuskY,this.tuskWidth,this.tuskHeight)
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
      this.x += 3 * (Math.sin(this.angle));
      this.tusk += 3 * (Math.sin(this.angle));
      this.y += -3 * (Math.cos(this.angle));
      this.tuskY += 3 * (Math.cos(this.angle));
    }
}



module.exports = narwhal;
