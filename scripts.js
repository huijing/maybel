// canvas setup
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let gameOver = false;
//***** */ let gameFrame = 0;
//***** */ context.font = "50px Georgia";

const asteroids = [];
const dinosaur = [];
let left;
let right;

// create background
class background {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("backgroundImage");
    this.x = 0;
    this.y = 0;
    this.width = 800;
    this.height = 500;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

const backgroundImage = new background(canvas.width, canvas.height);

// create one asteroid
class enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "blue";
    this.yVelocity = 1;
    //link to sprite** this.image = document.getElementById();
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, 30);
    context.fillStyle = this.color;
    context.fill();
    //** context.drawImage(this.image, 0,0)
  }

  update() {
    this.draw();
    this.y += this.yVelocity;
  }
}

// create dinosaur
class player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    if (right) this.x += this.speed;
    if (left) this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
  }
}

dinosaur.push(new player(canvas.width / 2, canvas.height - 100, 75, 100));

// keyboard interactivity
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    left = true;
  }

  if (event.key == "ArrowRight") {
    right = true;
  }
});

document.addEventListener("keyup", () => {
  left = false;
  right = false;
});

// push and remove asteroids

//todo:

//clear out asteroid that hit the ground
//game is over if collision = true
// check all present asteroids for collision --> may need to convert into function to keep calling
//increase number of asteroids through increasing asteroid.push

const asteroidCreation = () => {
  const x = Math.random() * canvas.width;
  asteroids.push(new enemy(x, 0, 30, 30));
}

setInterval(asteroidCreation, 2500);

//**STUCK HERE *//
// asteroid will come down. then check each asteroids x/y etc
// once asteroid hits ground, remove it
// repeat step 1

const asteroidRemoval = () => {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].y > 500) {
      asteroids.splice(0, 1);
    }
  }
}

// collision detection
const checkCollision = () => {
  if (asteroids.length) {
    if (
      asteroids[0].x < dinosaur[0].x + dinosaur[0].width 
      && asteroids[0].x + asteroids[0].width > dinosaur[0].x
      && asteroids[0].height + asteroids[0].y > dinosaur[0].y
    ) {
      console.log('true');
    }
  }
};

setInterval(() => {
  asteroidRemoval();
  checkCollision();
}, 100);

//animation loop
const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw(context);

  asteroids.forEach((asteroid) => {
    asteroid.update();
  });

  dinosaur.forEach((player) => {
    player.update();
  });

  requestAnimationFrame(animate);
};

animate();
