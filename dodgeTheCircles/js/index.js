import * as misc from "./misc";
import * as blob from "./whiteBlob";
import * as keys from "./keyControl";
import { Enemy } from "./enemyControl";

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

misc.clearScreen(ctx, canvas);

let whiteBlob = {
  x: 500,
  y: 300,
  radius: 15,
  speed: 7,
};

document.body.addEventListener(
  "keydown",
  (event) => (arrows = keys.keyDown(event, arrows))
);
document.body.addEventListener(
  "keyup",
  (event) => (arrows = keys.keyUp(event, arrows))
);
document.body.addEventListener("click", newGame);

let arrows = {
  downPressed: false,
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
};

let requestId;
let gameOver = false;
let enemies = [];

function getEnemies() {
  enemies.push(new Enemy());
}
setInterval(getEnemies, 200);

function drawGame() {
  misc.clearScreen(ctx, canvas);
  enemyUpdate();
  whiteBlob = keys.inputs(whiteBlob, arrows);
  whiteBlob = blob.whiteBlobBoundry(whiteBlob, canvas);
  blob.drawWhiteBlob(whiteBlob, ctx);
  if (!gameOver) {
    requestId = requestAnimationFrame(drawGame);
  }
}

function enemyUpdate() {
  enemies = enemies.filter((enemy) =>
    misc.isNearEdge(enemy.x, enemy.y, canvas.clientWidth, canvas.clientHeight)
  );
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    determineGame(enemy, whiteBlob);
    enemy.update();
  });
}

function determineGame(enemy, whiteBlob) {
  if (blob.checkGame(enemy, gameOver, whiteBlob)) {
    if (whiteBlob.radius < enemy.radius) {
      return (gameOver = true);
    } else {
      whiteBlob.radius += enemy.radius / 3;
      return enemies.splice(enemies.indexOf(enemy), 1);
    }
  }
}

function newGame() {
  cancelAnimationFrame(requestId);
  gameOver = false;
  whiteBlob.x = 500;
  whiteBlob.y = 300;
  whiteBlob.radius = 15;
  enemies = [];
  drawGame();
}
