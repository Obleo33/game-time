function narwhal(context,canvas){
  this.x = 400
  this.y = 250
  this.width = 45
  this.height = 25
  this.speed = 2
  this.angle = 0
  this.context = context
  this.canvas = canvas
  this.tuskX = 310
  this.tuskY = 258
  this.tuskWidth = 90
  this.tuskHeight = 2
}

narwhal.prototype.popNarwhal = function(){
  this.context.save();
  this.context.translate(this.x, (this.y + this.height/2));
  this.context.rotate(this.angle);
  this.context.translate(-this.x,-(this.y + this.height/2));
  this.context.fillRect(this.x,this.y,this.width,this.height)
  this.context.fillRect(this.tuskX,this.tuskY,this.tuskWidth, this.tuskHeight)
  this.context.restore();
  return this
}

narwhal.prototype.narwhalRotate = function(deg){
  this.angle += deg*(Math.PI/180);
  return this
}

narwhal.prototype.swim = function(){
  this.x -= 3
  this.tuskX -= 3
  return this
}



module.exports = narwhal;
