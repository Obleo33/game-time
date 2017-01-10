var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


const Seal = require('./seal');
const Narwhal = require('./narwhal');
let narwhal = new Narwhal(context,canvas);


var sealImage = document.getElementById('seal');
var narwhalImage = document.getElementById('narwhal');
var underwaterImage = new Image()
  underwaterImage.src='images/underwater.jpg'
var arcticImage = new Image()
  arcticImage.src='images/arctic.jpg'
var seals = [];
var spawnCount = 0;
var bottomTerrain = [];
var topTerrain = [];
var score = 0;
var timer = 8000;

function spawnSeal() {
  if (spawnCount >= 0) {
    spawnCount--;
  } else {
    if (seals.length< 5) {
      seals.push(new Seal(context,canvas));
      spawnCount = Math.floor(Math.random()*300)+10;
    }
  }
}

function stabDetect() {
  for (var i = 0; i < seals.length; i++) {
    var targetSeal = seals[i];
      if (narwhal.tuskX >= targetSeal.x && narwhal.tuskX <= (targetSeal.x + targetSeal.width) && narwhal.tuskY <= (targetSeal.y + targetSeal.height) && narwhal.tuskY >= targetSeal.y){
        score += seals[i].points
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
    narwhal.moveLeft = true;
  } else if (e.keyCode === 39) {
    narwhal.moveRight = true;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = true;
  } else if (e.keyCode === 32) {
    narwhal.burst = true;
  }
})

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 37) {
    narwhal.moveLeft = false;
  } else if (e.keyCode === 39) {
    narwhal.moveRight = false;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = false;
  }
})

function drawScore() {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.fillText("SCORE:"+ score, 10, 45);
}

function drawTime() {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.fillText("TIME:"+ score, 600, 45);
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(underwaterImage, 0, 135, 900, 375)
  context.drawImage(arcticImage,0,0,900,135)
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
  context.lineWidth = 1;

  narwhal.popNarwhal();

  seals.forEach(function(seal) {
    seal.popSeal();
    seal.move();
    seal.turn();
    seal.detectCollision();
  })

  spawnSeal();
  narwhal.detectCollision();
  narwhal.updateNarwhal();
  gravity();

  stabDetect();


  drawScore()
  drawTime()
  requestAnimationFrame(gameLoop)
})
