var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var x = 60;
var y = 150;
var width = 10;
var height = 10;


var narwhal = new Image();
  narwhal.src='images/narwhal.png';
  narwhal.onload = function() {
    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;
    // context.drawImage(img, 0, 0, 400, 200);
};


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
  // context.fillRect(x++, y, width, height);
  context.drawImage(narwhal,parseInt(200), parseInt(200),parseInt(164.06),parseInt(45));

  context.beginPath();
  context.moveTo(0,125);
  context.lineTo(20,100);
  context.lineTo(70,100);
  context.lineTo(900,125)
  context.stroke();
  context.lineWidth=3;

  requestAnimationFrame(gameLoop);
});
