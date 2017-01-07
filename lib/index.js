var canvas = document.getElementById('game')
var context = canvas.getContext('2d')

const Seal = require('./seal')
const Narwhal = require('./narwhal')
let narwhal = new Narwhal(context,canvas)

var seals = []
var spawnCount = 0

function spawnSeal(){
  if (spawnCount >=0){
    spawnCount --
  } else {
    if (seals.length<=5){
      seals.push(new Seal(context,canvas))
    }
    spawnCount = (Math.floor(Math.random()*300)+10)
  }
}

function gravity (){
  narwhal.y+=.5
}

var Keyboarder = function() {

    // Records up/down state of each key that has ever been pressed.
    var keyState = {};

    // When key goes down, record that it is down.
    window.addEventListener('keydown', function(e) {
      keyState[e.keyCode] = true;
    });

    // When key goes up, record that it is up.
    window.addEventListener('keyup', function(e) {
      keyState[e.keyCode] = false;
    });

    // Returns true if passed key is currently down.  `keyCode` is a
    // unique number that represents a particular key on the keyboard.
    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };

    // Handy constants that give keyCodes human-readable names.
    this.KEYS = { LEFT: 37, RIGHT: 39, SWIM: 32 };
  };

var playerInput = new Keyboarder;

console.log(playerInput)

// var keys = {}
//
// window.addEventListener('keydown', function(e) {
//   keys[e.keyCode] = true;
//   console.log(keys)
// });
//
// window.addEventListener('keyup', function(e) {
//   keys[e.keyCode] = false;
//   console.log(keys)
// });
//
// this.isDown = function(keyCode) {
//   console.log(keys)
//   return keys[keyCode] === true;
// };

// this.keyboarder.isDown(this.keyboarder.KEYS.LEFT

function moveInput() {
  window.addEventListener('keydown', function(e) {
    if (playerInput.isDown(playerInput.KEYS.LEFT)){ //Rotate Left LEFT ARROW
      narwhal.narwhalRotate(-5)
    } else if (playerInput.isDown(playerInput.KEYS.SWIM)) {//Swim SPACE BAR
      narwhal.swim()
    } else if (playerInput.isDown(playerInput.KEYS.RIGHT)) {//Rotate Right RIGHT ARROW
      narwhal.narwhalRotate(5)
    }
  })
}



moveInput();

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.beginPath()
  context.moveTo(0,125)
  context.lineTo(900,125)
  context.stroke()
  context.lineWidth=8

  // gravity()

  narwhal.popNarwhal()

  seals.forEach(function(seal) {
    seal.popSeal()
    seal.move()
    seal.turn()
    seal.detectCollision()
  })

  spawnSeal()

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
