import * as misc from "./misc";
import * as blob from "./whiteBlob";
import * as keys from "./keyControl";
import { Enemy } from "./enemyControl";
import "../css/style.css";

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 17;
canvas.height = window.innerHeight - 17;

console.log(window.innerHeight, window.innerWidth);
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

let requestId,
  gameOver = false,
  enemies = [],
  multiplier = 0;

function getEnemies() {
  enemies.push(new Enemy(multiplier, canvas.clientWidth, canvas.clientHeight));
}
setInterval(getEnemies, canvas.width / 100);

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
    if (!gameOver) {
      determineGame(enemy, whiteBlob);
    }
    enemy.update();
  });
}

function determineGame(enemy, whiteBlob) {
  if (blob.checkGame(enemy, gameOver, whiteBlob)) {
    if (whiteBlob.radius < enemy.radius) {
      return (gameOver = true);
    } else if (whiteBlob.radius >= enemy.radius) {
      whiteBlob.radius += 2;
      multiplier += 2;
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

fetch("http://localhost:3000", {
  method: "POST",
  body: JSON.stringify({ whiteBlob }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((response) => console.log("Success:", JSON.stringify(response)))
  .catch((error) => console.error("Error:", error));
