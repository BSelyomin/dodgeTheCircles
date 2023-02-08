export function checkGame(enemy, value, whiteBlob) {
  let distance = Math.sqrt(
    (whiteBlob.x - enemy.x) ** 2 + (whiteBlob.y - enemy.y) ** 2
  );
  if (distance < whiteBlob.radius + enemy.radius || value) {
    return true;
  }
}

export function drawWhiteBlob(whiteBlob, ctx) {
  ctx.fillStyle = "white";
  ctx.beginPath(); // starts circle
  ctx.arc(whiteBlob.x, whiteBlob.y, whiteBlob.radius, 0, Math.PI * 2); // x,y , radius, start angle, end angle.
  ctx.fill();
}

export function whiteBlobBoundry(whiteBlob, canvas) {
  if (whiteBlob.y < whiteBlob.radius) {
    whiteBlob.y = whiteBlob.radius;
  }
  if (whiteBlob.x < whiteBlob.radius) {
    whiteBlob.x = whiteBlob.radius;
  }
  if (whiteBlob.y > canvas.height - whiteBlob.radius) {
    whiteBlob.y = canvas.height - whiteBlob.radius;
  }
  if (whiteBlob.x > canvas.width - whiteBlob.radius) {
    whiteBlob.x = canvas.width - whiteBlob.radius;
  }
  return whiteBlob;
}
