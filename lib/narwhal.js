function narwhal(context,canvas) {
  this.x = 400;
  this.y = 250;
  this.width = 40;
  this.height = 30;
  this.speed = 2;
  this.angle = 0;
  this.rotateLeft = false;
  this.rotateRight = false;
  this.flipperKick = false;
  this.context = context;
  this.canvas = canvas;
}

narwhal.prototype.popNarwhal = function(){
  this.context.save();
  this.context.translate(this.x, (this.y + this.height/2));
  this.context.rotate(this.angle);
  this.context.translate(-this.x,-(this.y + this.height/2));
  this.context.fillRect(this.x,this.y,this.width,this.height)
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
      this.x += Math.sin(this.angle);
      this.y -= Math.cos(this.angle);
    }
}



module.exports = narwhal;
