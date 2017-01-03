var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


// var narwhal = new Image();
//   narwhal.src='images/narwhal.png';
//   narwhal.onload = function() {
//     context.mozImageSmoothingEnabled = true;
//     context.webkitImageSmoothingEnabled = true;
//     context.msImageSmoothingEnabled = true;
//     context.imageSmoothingEnabled = true;
//     context.drawImage(img, 0, 0, 400, 200);
// };

var seals = [];
seals.push(new Seal());
seals.push(new Seal());
seals.push(new Seal());
// seals.push(new Seal());
// seals.push(new Seal());
// seals.push(new Seal());
// seals.push(new Seal());
// seals.push(new Seal());
// seals.push(new Seal());

console.log(seals);

function Seal() {
  this.x = (Math.floor(Math.random() * 2) === 0) ? -15 : 895;
  this.y = 105;
  this.width = 20;
  this.height = 20;
  this.speed = this.x > 1? -(Math.floor(Math.random()*2)+1) : (Math.floor(Math.random()*2)+1);
  this.turns = 3;
  this.count = (Math.floor(Math.random()*300)+100);
}

Seal.prototype.birth = function() {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Seal.prototype.move = function() {
  this.x += this.speed;
  return this;
}

Seal.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.width, this.height)
}

Seal.prototype.turnAround = function(){
  this.count --;

}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
  // context.drawImage(narwhal,parseInt(200), parseInt(200),parseInt(164.06),parseInt(45));

  context.beginPath();
  context.moveTo(0,125);
  context.lineTo(900,125)
  context.stroke();
  context.lineWidth=8;

  seals.forEach(function(seal) {
    seal.birth();
    seal.move();
  })

  requestAnimationFrame(gameLoop);
});
