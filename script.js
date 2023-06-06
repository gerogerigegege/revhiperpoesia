const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
const stars = [];

canvas.width = width;
canvas.height = height;

class Star {
  constructor(x, y, radius, opacity, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.opacity = opacity;
    this.speed = speed;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
  }

  update() {
    this.x += this.speed * this.directionX;
    this.y += this.speed * this.directionY;

    if (this.x + this.radius < 0 || this.x - this.radius > width) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.radius < 0 || this.y - this.radius > height) {
      this.directionY = -this.directionY;
    }
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    context.fill();
  }
}

function createStars() {
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 3;
    const opacity = Math.random() * 0.5 + 0.5;
    const speed = Math.random() * 0.5 + 0.1;

    stars.push(new Star(x, y, radius, opacity, speed));
  }
}

function drawStars() {
  context.clearRect(0, 0, width, height);

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    star.update();
    star.draw();
  }
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

createStars();
animate();

function showText(textId) {
  const textContainer = document.getElementById(`text-${textId}`);
  textContainer.style.display = "block";
}