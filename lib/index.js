var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const Seal = require('./seal');
const Narwhal = require('./narwhal');
let narwhal = new Narwhal(context,canvas);

var seals = [];
var spawnCount = 0;
var bottomTerrain = [];
var topTerrain = [];
var score = 0;
var timer = 8000;
// function lineGen(terrain,min,max){
//   var points = Math.floor(Math.random()*(30-5+1)+5;
//
//   lastX = lastX + Math.floor( Math.random() * (maxX - lastX) + 1 )+lastX;
//
//
//   for (var i = 0; i < points; i++){
//     terrain.push({x:Math.floor(Math.random() * (max - min + 1) + min)
//       y:Math.floor(Math.random() * (max - min + 1) + min)});
//   }
// };
//
// lineGen(bottomTerrain,500,450);
//
// console.log(bottomTerrain)

function spawnSeal() {
  if (spawnCount >= 0) {
    spawnCount--;
  } else {
    if (seals.length< 5) {
      seals.push(new Seal(context,canvas));
      spawnCount = Math.floor(Math.random()*300)+10;
      console.log(seals)
    }
  }
}

function stabDetect() {
  for (var i = 0; i < seals.length; i++) {
    var targetSeal = seals[i];
    var strikeZoneY = ((targetSeal.y + targetSeal.height)-10);
    var tuskCenter = {x:(narwhal.tuskX + narwhal.tuskWidth/2), y: narwhal.tuskY};


      // if (narwhal.speed >= 1 && tuskCenter.x >= targetSeal.x && tuskCenter.x <= targetSeal.x + targetSeal.width && tuskCenter.y <= targetSeal.y + targetSeal.height && tuskCenter.y >= strikeZoneY){
      //   console.log('boom');
      //   seals.splice(i, 1);
      if (tuskCenter.x >= targetSeal.x && tuskCenter.x <= (targetSeal.x + targetSeal.width) && tuskCenter.y <= (targetSeal.y + targetSeal.height) && tuskCenter.y >= strikeZoneY){
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
    narwhal.rotateLeft = true;
  } else if (e.keyCode === 39) {
    narwhal.rotateRight = true;
  } else if (e.keyCode === 38) {
    narwhal.flipperKick = true;
  } else if (e.keyCode === 32) {
    narwhal.burst = true;
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

function drawScore() {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#FFB5EE";
    context.fillText("SCORE:"+ score, 10, 45);
}

function drawTime() {
    context.font = "35px 'Press Start 2P'";
    context.fillStyle = "#FFB5EE";
    context.fillText("TIME:"+ score, 600, 45);
}

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








// var narwhal = new Image()
//   narwhal.src='images/narwhal.png'
//   narwhal.onload = function() {
//     context.mozImageSmoothingEnabled = true
//     context.webkitImageSmoothingEnabled = true
//     context.msImageSmoothingEnabled = true
//     context.imageSmoothingEnabled = true
//     context.drawImage(img, 0, 0, 400, 200)
// }
