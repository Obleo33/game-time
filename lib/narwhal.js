function narwhal(context,canvas){
  this.x = 400
  this.y = 250
  this.width = 40
  this.height = 30
  this.speed = 2
  this.context = context
  this.canvas = canvas
}

narwhal.prototype.popNarwhal = function(){
  this.context.fillRect(this.x,this.y,this.width,this.height)
  return this
}

narwhal.prototype.move = function(){
}



module.exports = narwhal;
