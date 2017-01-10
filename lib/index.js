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
var timer = 2000;

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

function countDown() {
  if (timer > 0){
    timer --;
    var seconds = Math.floor((timer/100)%60);
    return seconds;
  } else {
    return 0
  }
}

function drawScore(x,y) {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.fillText("SCORE:"+ score, x, y);
}

function drawTime(x,y) {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.fillText("TIME:"+ countDown(), x, y);
}

function clickToStart(x,y){
  context.font = "40px 'Press Start 2P'";
  context.fillStyle = "#000000";
  context.fillText("Click to start", 175,100);
}

function gameOver(x,y){
  context.font = "40px 'Press Start 2P'";
  context.fillStyle = "#000000";
  context.fillText("Game Over", x,y);
}

requestAnimationFrame(function gameStart(){
  clickToStart(175,300)
})

$('#game').on('click',function(){
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(underwaterImage, 0, 135, 900, 375)
    context.drawImage(arcticImage,0,0,900,135)
    drawScore(10,45)
    drawTime(600,45)

  if(timer>0){
    //Ice
      context.beginPath();
      context.moveTo(0,135);
      context.lineTo(900,135);
      context.stroke();
      context.lineWidth = 3;

      gravity();

      narwhal.popNarwhal();
      narwhal.detectCollision();
      narwhal.updateNarwhal();
      stabDetect();

      spawnSeal();
      seals.forEach(function(seal) {
        seal.popSeal();
        seal.move();
        seal.turn();
        seal.detectCollision();
      })
      requestAnimationFrame(gameLoop)
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
      gameOver(260,150)
      drawScore(310,250)
    }
  })
});
