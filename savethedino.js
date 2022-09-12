//canvas setup
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

//create one asteroid
class enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "blue";
    this.yVelocity = 6;
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

//create dinosaur
class player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 10;
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

    // console.log({ player: this.x });
  }
}

dinosaur.push(new player(canvas.width / 2, canvas.height - 50, 30, 100));

//keyboard interactivity
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

setInterval(() => {
  const x = 400;
  // = Math.random() * canvas.width;
  asteroids.push(new enemy(x, -10, 30));
  console.log(asteroids[1]);
  // for (items of asteroids) {
  //   return asteroids[items];
  // }
}, 2500);

//**STUCK HERE *//
//asteroid will come down. then check each asteroids x/y etc
//once asteroid hits ground, remove it
//repeat step 1

setInterval(() => {
  //   for (let i = 0; i < asteroids.length; i++) {

  //     if asteroids[i].y > 500{}
  //   }

  // if asteroids height is more than 500, remove it from array
  // if asteroids height is less than 500, keep it in array
  //do it by creating new array or use filter. filter the easiest. accessing key value of the objects
  //   if items.y > 500;
  //   asteroids.splice(0, 1);
  // }

  //**COLLISION DETECTION NOT WORKING TOO. SOMETHING TO DO WITH THE ARRAY */
  if (
    asteroids[0].x < dinosaur[0].x + dinosaur[0].width && //[1] = x, [2]=y, [3]=width, [4] = height
    asteroids[0].x + asteroids[0].y > dinosaur[0].x &&
    asteroids[0].y < dinosaur[0].y + dinosaur[0].width &&
    asteroids[0].y + asteroids[0].width > dinosaur[0].y
  ) {
    console.log("true");
  }
}, 100);

//collision detection

// console.log(asteroids);

// {
//   console.log("true");
// }

// const checkCollision = () => {
//   console.log("running");
//   console.log({ asteroid: asteroids });
//   console.log({ dinosaur: dinosaur });
//   if (
//     asteroids.x < dinosaur.x + dinosaur.width &&
//     asteroids.x + asteroids.width > dinosaur.x
//     // &&
//     // asteroids.y < dinosaur.y + dinosaur.height &&
//     // asteroids.y + asteroids.height > dinosaur.y
//   ) {
//     console.log("true");
//   }
// };

// setInterval(checkCollision, 200);

//animation loop
const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw(context);

  asteroids.forEach((ball) => {
    ball.update();
  });

  dinosaur.forEach((player) => {
    player.update();
  });

  requestAnimationFrame(animate);
};

animate();
