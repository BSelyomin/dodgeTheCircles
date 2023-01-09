import { getRandom, isCanvasVisible, clearScreen, isNearEdge } from "./misc";
import { checkGame, drawWhiteBlob, whiteBlobBoundry } from "./whiteBlob";
import { Enemy } from "./enemyControl";
import { keyDown, keyUp, inputs } from "./keyControl";

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

clearScreen(ctx, canvas);

let whiteBlob = {
  x: 500,
  y: 300,
  radius: 25,
  speed: 7,
};

document.body.addEventListener(
  "keydown",
  (event) => (arrows = keyDown(event, arrows))
);
document.body.addEventListener(
  "keyup",
  (event) => (arrows = keyUp(event, arrows))
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
let onScreenEnemies = [];
let enemies = [];

function getEnemies() {
  enemies.push(new Enemy());
}
setInterval(getEnemies, 200);

function drawGame() {
  clearScreen(ctx, canvas);
  enemyUpdate();
  whiteBlob = inputs(whiteBlob, arrows);
  whiteBlob = whiteBlobBoundry(whiteBlob, canvas);
  drawWhiteBlob(whiteBlob, ctx);
  if (!gameOver) {
    requestId = requestAnimationFrame(drawGame);
  }
  console.log(enemies);
}

function enemyUpdate() {
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    gameOver = checkGame(enemy, gameOver, whiteBlob);
    enemy.update();
    if (!isNearEdge(enemy.x, enemy.y)) {
      enemies.splice(enemies.indexOf(enemy), 1);
    }
  });
}

function newGame() {
  cancelAnimationFrame(requestId);
  gameOver = false;
  whiteBlob.x = 500;
  whiteBlob.y = 300;
  whiteBlob.radius = 25;
  enemies = [];
  drawGame();
}
