import * as misc from "./misc.js";
import * as blob from "./whiteBlob.js";
import * as keys from "./keyControl.js";
import { Enemy } from "./enemyControl.js";

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

ctx.font = "48px sans-serif";
ctx.fillStyle = "black";

misc.clearScreen(ctx, canvas);

let whiteBlob = {
  x: 500,
  y: 300,
  radius: 15,
  speed: 7,
};

window.onload = () => {
  canvas.width = window.innerWidth - 17;
  canvas.height = (window.innerHeight * 8.85) / 10 - 17;
  misc.clearScreen(ctx, canvas);
};

window.onresize = () => {
  canvas.width = window.innerWidth - 17;
  canvas.height = (window.innerHeight * 8.85) / 10 - 17;

  misc.clearScreen(ctx, canvas);
};

document.body.addEventListener(
  "keydown",
  (event) => (arrows = keys.keyDown(event, arrows))
);
document.body.addEventListener(
  "keyup",
  (event) => (arrows = keys.keyUp(event, arrows))
);
document.body.addEventListener("click", (event) => {
  if (misc.isClickOnCanvas(event, canvas)) {
    newGame();
  }
});

let arrows = {
  downPressed: false,
  upPressed: false,
  leftPressed: false,
  rightPressed: false,
};

let requestId,
  gameOver = false,
  enemies = [],
  multiplier = 0,
  score = 0;

function getEnemies() {
  enemies.push(new Enemy(multiplier, canvas.clientWidth, canvas.clientHeight));
}
setInterval(getEnemies, canvas.width / 10);

function drawGame() {
  misc.clearScreen(ctx, canvas);
  // sendElements(enemies);

  enemyUpdate();

  scoreElement.innerHTML = `Points: ${score}`;
  whiteBlob = keys.inputs(whiteBlob, arrows);
  whiteBlob = blob.whiteBlobBoundry(whiteBlob, canvas);
  blob.drawWhiteBlob(whiteBlob, ctx);
  if (!gameOver) {
    requestId = requestAnimationFrame(drawGame);
  } else {
    misc.genText(ctx, canvas.width / 2 - 300, canvas.height / 2, "Game Over");
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
      score++;
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
  score = 0;
  multiplier = 0;
  misc.genText(ctx, canvas.width - 100, canvas.height - 100, score);
  drawGame();
}

// async function sendElements(elements) {
//   try {
//     let response = await fetch("/data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: elements }),
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     let data = await response.json();
//     console.log(data.message);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }
