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
  this.x = (Math.floor(Math.random() * 2) === 0) ? 1 : 899;
  this.y = 105;
  this.width = 20;
  this.height = 20;
  this.speed = (Math.floor(Math.random()*3)+1);
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

Seal.prototype.detectCollision = function(){
  if (this.x > canvas.width){
    this.speed = -1*this.speed;
  } else if (this.x < 0){
    this.speed = -1*this.speed;
  }
}



Seal.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.width, this.height)
}

Seal.prototype.turn = function(){
  if (this.count > 0) {
    this.count--;
  }else if (this.count === 0){
    //add new direction speed
    this.count = (Math.floor(Math.random()*300)+100);
  }
  return this;
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
    seal.turn();
    seal.detectCollision();
  })

  console.log("hey");

  requestAnimationFrame(gameLoop);
});
