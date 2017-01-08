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

function stabDetect() {
  for (var i = 0; i < seals.length; i++) {
    var targetSeal = seals[i];
    var strikeZoneY = (targetSeal.y + targetSeal.height) - 5;
    var tuskCenter = {x: narwhal.x + narwhal.width/2, y: narwhal.tuskY};

      if (narwhal.speed >= 0 && tuskCenter.x >= targetSeal.x && tuskCenter.x <= targetSeal.x + targetSeal.width && tuskCenter.y <= targetSeal.y + targetSeal.height && tuskCenter.y >= strikeZoneY){
        console.log('boom');
        seals.splice(i, 1);
    }
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

  stabDetect();

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
