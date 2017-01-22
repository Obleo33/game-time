/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	const Seal = __webpack_require__(1);
	const Narwhal = __webpack_require__(2);
	let narwhal = new Narwhal(context, canvas);

	var sealImage = document.getElementById('seal');
	var narwhalImage = document.getElementById('narwhal');
	var underwaterImage = new Image();
	underwaterImage.src = 'images/underwater.jpg';
	var arcticImage = new Image();
	arcticImage.src = 'images/arctic.jpg';
	var seals = [];
	var spawnCount = 0;
	var bottomTerrain = [];
	var topTerrain = [];
	var score = 0;
	var timer = 2000;
	var level = 1;

	function spawnSeal(object) {
	  if (spawnCount >= 0) {
	    spawnCount--;
	  } else {
	    if (seals.length < 5) {
	      seals.push(new Seal({ context: context, canvas: canvas, maxSpeed: object.maxSpeed, minSpeed: object.minSpeed }));
	      spawnCount = Math.floor(Math.random() * 300) + 10;
	    }
	  }
	}

	function stabDetect() {
	  for (var i = 0; i < seals.length; i++) {
	    var targetSeal = seals[i];
	    if (narwhal.tuskX >= targetSeal.x && narwhal.tuskX <= targetSeal.x + targetSeal.width && narwhal.tuskY <= 134 && narwhal.tuskY >= 133 && (narwhal.flipperKick || narwhal.burst)) {
	      score += seals[i].points;
	      seals.splice(i, 1);
	    }
	  }
	}

	function burstBonus() {
	  if (narwhal.burst === true) {
	    for (var i = 0; i < seals.length; i++) {
	      var targetSeal = seals[i];
	      if (narwhal.tuskX >= targetSeal.x && narwhal.tuskX <= targetSeal.x + targetSeal.width && narwhal.tuskY <= 134 && narwhal.tuskY >= 130 && (narwhal.flipperKick || narwhal.burst)) {
	        score += seals[i].points;
	        seals.splice(i, 1);
	      }
	    }
	  }
	}

	function gravity() {
	  narwhal.y += 0.75;
	  narwhal.tuskY += 0.75;
	}

	window.addEventListener('keydown', function (e) {
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

	window.addEventListener('keyup', function (e) {
	  if (e.keyCode === 37) {
	    narwhal.moveLeft = false;
	  } else if (e.keyCode === 39) {
	    narwhal.moveRight = false;
	  } else if (e.keyCode === 38) {
	    narwhal.flipperKick = false;
	  } else if (e.keyCode === 32) {
	    narwhal.burst = false;
	  }
	});

	function countDown() {
	  if (timer > 0) {
	    timer--;
	    var seconds = Math.floor(timer / 100 % 60);
	    return seconds;
	  } else {
	    return 0;
	  }
	}

	function clickToStart(x, y) {
	  context.font = "40px 'Press Start 2P'";
	  context.fillStyle = "#000000";
	  context.textAlign = "center";
	  context.fillText("Click to start", x, y);
	}

	function drawScore(x, y, align) {
	  context.font = "35px 'Press Start 2P'";
	  context.fillStyle = "#000000";
	  context.textAlign = align;
	  context.fillText("SCORE:" + score, x, y);
	}

	function drawTime(x, y) {
	  context.font = "35px 'Press Start 2P'";
	  context.fillStyle = "#000000";
	  context.textAlign = "left";
	  context.fillText("TIME:" + countDown(), x, y);
	}

	function levelUp(x, y) {
	  context.font = "15px 'Press Start 2P'";
	  context.fillStyle = "#ffffff";
	  context.textAlign = "center";
	  context.fillText("Level:" + level, x, y);
	}

	function gameOver(x, y) {
	  context.font = "40px 'Press Start 2P'";
	  context.fillStyle = "#000000";
	  context.textAlign = "center";
	  context.fillText("Game Over", x, y);
	}

	requestAnimationFrame(function gameStart() {
	  clickToStart(canvas.width * 0.5, canvas.height * 0.5);
	});

	$('#game').on('click', function () {
	  requestAnimationFrame(function gameLoop() {
	    context.clearRect(0, 0, canvas.width, canvas.height);

	    context.drawImage(underwaterImage, 0, 135, 900, 375);
	    context.drawImage(arcticImage, 0, 0, 900, 135);
	    drawScore(25, 50, "left");
	    drawTime(625, 50);
	    levelUp(450, 480);

	    if (timer > 0) {
	      //Ice
	      context.beginPath();
	      context.moveTo(0, 135);
	      context.lineTo(900, 135);
	      context.stroke();
	      context.lineWidth = 3;

	      gravity();

	      narwhal.popNarwhal();
	      narwhal.detectCollision();
	      narwhal.updateNarwhal();
	      stabDetect();
	      burstBonus();

	      if (level === 1) {
	        spawnSeal({ maxSpeed: 3, minSpeed: 1 });
	      } else if (level === 2) {
	        spawnSeal({ maxSpeed: 4, minSpeed: 2 });
	      } else if (level === 3) {
	        spawnSeal({ maxSpeed: 5, minSpeed: 3 });
	      } else if (level === 4) {
	        spawnSeal({ maxSpeed: 6, minSpeed: 4 });
	      } else {
	        spawnSeal({ maxSpeed: 10, minSpeed: 8 });
	      }

	      seals.forEach(function (seal) {
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
	      drawScore(canvas.width * 0.5, 250, "center");

	      clickToStart(canvas.width * 0.5, 400);
	      seals = [];
	      if (level < 5) {
	        level++;
	      }

	      $('#game').on('click', function () {
	        timer = 2000;
	        score = 0;
	      });
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	function Seal(object) {
	  this.x = Math.floor(Math.random() * 2) === 0 ? 1 : 899;
	  this.y = 105;
	  this.width = 50;
	  this.height = 30;
	  this.maxSpeed = object.maxSpeed;
	  this.minSpeed = object.minSpeed;
	  this.speed = object.speed || Math.floor(Math.random() * this.maxSpeed) + this.minSpeed;
	  this.count = Math.floor(Math.random() * 300) + 100;
	  this.context = object.context;
	  this.canvas = object.canvas;
	  this.points = this.pointVal(this.speed);
	}

	Seal.prototype.popSeal = function () {

	  this.context.fillStyle = "#000000";
	  // this.context.fillRect(this.x, this.y, this.width, this.height)
	  var sealImage = document.getElementById('seal');
	  this.context.drawImage(sealImage, this.x, this.y, this.width, this.height);

	  return this;
	};

	Seal.prototype.move = function () {
	  this.x += this.speed;
	  return this;
	};

	Seal.prototype.detectCollision = function () {
	  if (this.x > this.canvas.width) {
	    this.speed = -1 * this.speed;
	  } else if (this.x < 0) {
	    this.speed = -1 * this.speed;
	  }
	};

	Seal.prototype.turn = function () {
	  if (this.count > 0) {
	    this.count--;
	  } else if (this.count === 0) {
	    this.speed = this.speed = -1 * this.speed;
	    this.count = Math.floor(Math.random() * 300) + 100;
	  }
	  return this;
	};

	Seal.prototype.pointVal = function (speed) {
	  if (this.speed === this.maxSpeed) {
	    return 25;
	  } else if (this.speed === this.minSpeed) {
	    return 15;
	  } else {
	    return 20;
	  }
	};

	module.exports = Seal;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function narwhal(context, canvas) {
	  //body
	  this.x = 435;
	  this.y = 250;
	  this.width = 30;
	  this.height = 40;
	  this.speed = 3;
	  // this.angle = 0
	  this.moveLeft = false;
	  this.moveRight = false;
	  this.flipperKick = false;
	  this.burst = false;
	  this.context = context;
	  this.canvas = canvas;

	  //tusk
	  this.tuskX = 450;
	  this.tuskY = 160;
	  this.tuskWidth = 1;
	  this.tuskHeight = 90;
	}

	narwhal.prototype.popNarwhal = function () {

	  var narwhalImage = document.getElementById('narwhal');

	  this.context.save();
	  this.context.translate(this.x + this.width / 2, this.y);
	  this.context.translate(-(this.x + this.width / 2), -this.y);
	  this.context.fillStyle = "#000000";
	  this.context.drawImage(narwhalImage, this.x - 12, this.tuskY, 40, 150);
	  this.context.restore();
	  return this;
	};

	narwhal.prototype.updateNarwhal = function () {
	  if (this.moveLeft) {
	    this.x -= this.speed;
	    this.tuskX -= this.speed;
	  } else if (this.moveRight) {
	    this.x += this.speed;
	    this.tuskX += this.speed;
	  }
	  if (this.flipperKick) {
	    this.y -= this.speed;
	    this.tuskY -= this.speed;
	  }
	  if (this.burst) {
	    this.y -= this.speed * 2;
	    this.tuskY -= this.speed * 2;
	  }
	};

	narwhal.prototype.detectCollision = function () {
	  if (this.y > 500) {
	    this.y = 500;
	    this.tuskY = 410;
	  } else if (this.y < 135) {
	    this.y = 135;
	    this.tuskY = 45;
	  }
	  if (this.x < 0) {
	    this.x = 0;
	    this.tuskX = 15;
	  } else if (this.x > 900) {
	    this.x = 900;
	    this.tuskX = 915;
	  }
	};

	module.exports = narwhal;

/***/ }
/******/ ]);