function Seal(context,canvas) {
  this.x = (Math.floor(Math.random() * 2) === 0) ? 1 : 899
  this.y = 105
  this.width = 50
  this.height = 30
  this.speed = (Math.floor(Math.random()*1)+1)
  this.count = (Math.floor(Math.random()*300)+100)
  this.context = context
  this.canvas = canvas
}

Seal.prototype.popSeal = function() {
  // this.context.fillRect(this.x, this.y, this.width, this.height)
  var sealImage = document.getElementById('seal');
  this.context.drawImage(sealImage, this.x, this.y, this.width, this.height)
  return this
}

Seal.prototype.move = function() {
  this.x += this.speed
  return this
}

Seal.prototype.detectCollision = function(){
  if (this.x > this.canvas.width){
    this.speed = -1*this.speed
  } else if (this.x < 0){
    this.speed = -1*this.speed
  }
}

Seal.prototype.draw = function() {

  this.context.fillRect(this.x, this.y, this.width, this.height)
}

Seal.prototype.turn = function(){
  if (this.count > 0) {
    this.count--
  }else if (this.count === 0){
    this.speed = this.speed = -1*this.speed
    this.count = (Math.floor(Math.random()*300)+100)
  }
  return this
}



module.exports = Seal;
