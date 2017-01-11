var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


const Seal = require('./seal');
const Narwhal = require('./narwhal');
let narwhal = new Narwhal(context,canvas);


var sealImage = document.getElementById('seal');
var narwhalImage = document.getElementById('narwhal');
var underwaterImage = new Image();
  underwaterImage.src='images/underwater.jpg';
var arcticImage = new Image();
  arcticImage.src='images/arctic.jpg';
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
    if (narwhal.tuskX >= targetSeal.x && narwhal.tuskX <= (targetSeal.x + targetSeal.width) && narwhal.tuskY <= (targetSeal.y + targetSeal.height) && narwhal.tuskY >= targetSeal.y && (narwhal.flipperKick || narwhal.burst)){
      score += seals[i].points;
      seals.splice(i, 1);
    }
  }
}

function gravity() {
    narwhal.y += 0.75;
    narwhal.tuskY += 0.75;
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
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 37) {
    narwhal.moveLeft = false;
  } else if (e.keyCode === 39) {
    narwhal.moveRight = false;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = false;
  }
});

function countDown() {
  if (timer > 0){
    timer --;
    var seconds = Math.floor((timer/100)%60);
    return seconds;
  } else {
    return 0;
  }
}

function drawScore(x,y,align) {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.textAlign = align;
    context.fillText("SCORE:"+ score, x, y);
}

function drawTime(x,y) {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#000000";
    context.textAlign = "left";
    context.fillText("TIME:"+ countDown(), x, y);
}

function clickToStart(x,y){
  context.font = "40px 'Press Start 2P'";
  context.fillStyle = "#000000";
  context.textAlign = "center";
  context.fillText("Click to start",x,y);
}

function gameOver(x,y){
  context.font = "40px 'Press Start 2P'";
  context.fillStyle = "#000000";
  context.textAlign = "center";
  context.fillText("Game Over", x,y);
}

requestAnimationFrame(function gameStart(){
  clickToStart(canvas.width * 0.5, canvas.height * 0.5);
  //175,300
});

$('#game').on('click',function(){
  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(underwaterImage, 0, 135, 900, 375);
    context.drawImage(arcticImage,0,0,900,135);
    drawScore(25,50,"left");
    drawTime(625,50);

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
      });
      requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(gameLoop);
      context.clearRect(0, 0, canvas.width, canvas.height);
      gameOver(canvas.width * 0.5, 200);
      drawScore(canvas.width * 0.5, 250,"center");
      clickToStart(canvas.width * 0.5, 400);
      $('#game').on('click', function(){
        timer = 2000;
        score = 0;
        // requestAnimationFrame(gameLoop)
      });
    }
  });
});
