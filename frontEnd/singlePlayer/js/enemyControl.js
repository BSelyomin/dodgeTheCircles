import { getRandom } from "./misc.js";

export class Enemy {
  constructor(mult, width, height) {
    (this.x = 0),
      (this.y = 0),
      (this.speedX = 0),
      (this.speedY = 0),
      (this.radius = getRandom(10 + mult, 50 + mult));
    this.color = `rgb(
        ${getRandom(50, 220)},
        ${getRandom(50, 220)},
        ${getRandom(50, 220)})`;
    this.randomizePosition(width, height);
  }

  randomizePosition(width, height) {
    const ran = getRandom(1, 4);
    switch (ran) {
      case 1:
        this.x = -this.radius;
        this.y = getRandom(0, height);
        this.speedX = getRandom(0.5, 4);
        this.speedY = getRandom(-4, 4);
        break;
      case 2:
        this.y = -this.radius;
        this.x = getRandom(0, width);
        this.speedX = getRandom(-4, 4);
        this.speedY = getRandom(0.5, 4);
        break;
      case 3:
        this.y = getRandom(0, height);
        this.x = width + this.radius;
        this.speedX = getRandom(-4, -0.5);
        this.speedY = getRandom(-4, 4);
        break;
      case 4:
        this.y = height + this.radius;
        this.x = getRandom(0, width);
        this.speedX = getRandom(-4, 4);
        this.speedY = getRandom(-4, -0.5);
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
