var canvas = document.getElementById('game')
var context = canvas.getContext('2d')

const Seal = require('./seal');

var seals = []
var birthCounter = 0

function birthSeal(){
  if (birthCounter >=0){
    birthCounter --
    console.log(birthCounter)
  } else {
    if (seals.length<=5){
      seals.push(new Seal(context,canvas))
    }
    birthCounter = (Math.floor(Math.random()*300)+10)
  }
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas.
  // context.drawImage(narwhal,parseInt(200), parseInt(200),parseInt(164.06),parseInt(45))
  context.beginPath()
  context.moveTo(0,125)
  context.lineTo(900,125)
  context.stroke()
  context.lineWidth=8

  seals.forEach(function(seal) {
    seal.popSeal()
    seal.move()
    seal.turn()
    seal.detectCollision()
  })

  birthSeal();

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
