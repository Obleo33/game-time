function narwhal(context,canvas){
  this.x = 400
  this.y = 250
  this.width = 40
  this.height = 30
  this.speed = 2
  this.angle = 0
  this.context = context
  this.canvas = canvas
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

narwhal.prototype.narwhalRotate = function(deg){
  this.angle += deg*(Math.PI/180);
  // this.angle %= 2*Math.PI;
  return this
}



module.exports = narwhal;
