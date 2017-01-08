var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const Seal = require('./seal');
const Narwhal = require('./narwhal');
let narwhal = new Narwhal(context,canvas);

var seals = [];
var spawnCount = 0;

function spawnSeal() {
  if (spawnCount >= 0) {
    spawnCount--;
  } else {
    if (seals.length<= 5) {
      seals.push(new Seal(context,canvas));
    }
    spawnCount = (Math.floor(Math.random()*300)+10);
  }
}

function gravity() {
    narwhal.y += .75;
    narwhal.tuskY +=.75;
}

window.addEventListener('keydown', function(e) {
  event.preventDefault(e);
  if (e.keyCode === 37) {
    narwhal.rotateLeft = true;
  } else if (e.keyCode === 39) {
    narwhal.rotateRight = true;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = true;
  }
})

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 37) {
    narwhal.rotateLeft = false;
  } else if (e.keyCode === 39) {
    narwhal.rotateRight = false;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = false;
  }
})

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

//Ice
  context.beginPath();
  context.moveTo(0,125);
  context.lineTo(900,125);
  context.stroke();
  context.lineWidth = 8;

//bottom line
  context.beginPath();
  context.moveTo(0,500);
  context.lineTo(900,500);
  context.stroke();
  context.lineWidth = 8;

  narwhal.popNarwhal();

  seals.forEach(function(seal) {
    seal.popSeal();
    seal.move();
    seal.turn();
    seal.detectCollision();
  })

  spawnSeal();
  narwhal.updateNarwhal();
  gravity();

  requestAnimationFrame(gameLoop)
})








// var narwhal = new Image()
//   narwhal.src='images/narwhal.png'
//   narwhal.onload = function() {
//     context.mozImageSmoothingEnabled = true
//     context.webkitImageSmoothingEnabled = true
//     context.msImageSmoothingEnabled = true
//     context.imageSmoothingEnabled = true
//     context.drawImage(img, 0, 0, 400, 200)
// }
