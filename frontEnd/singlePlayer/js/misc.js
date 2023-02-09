export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let returned = Math.floor(Math.random() * (max - min + 1)) + min;
  return returned;
}

export function isCanvasVisible() {
  let canvas = document.getElementById("canvas");
  let isVisible = true;

  // Check if the Page Visibility API is supported
  if (typeof document.visibilityState !== "undefined") {
    isVisible = document.visibilityState === "visible";
  }

  // Check if the element is in the viewport
  if (isVisible) {
    let boundingRect = canvas.getBoundingClientRect();
    isVisible =
      boundingRect.top >= 0 &&
      boundingRect.left >= 0 &&
      boundingRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      boundingRect.right <=
        (window.innerWidth || document.documentElement.clientWidth);
  }

  return isVisible;
}

export function clearScreen(ctx, canvas) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

export function isNearEdge(x, y, width, height) {
  switch (true) {
    case x < -100:
    case x > width + 100:
    case y < -100:
    case y > height + 100:
      return false;
    default:
      return true;
  }
}

export function radiusChecker(r1, r2) {
  if (r1 > r2) {
    return true;
  } else {
    return false;
  }
}

export function genText(ctx, x, y, text) {
  ctx.font = "120px robotto";
  ctx.fillStyle = "red";
  ctx.fillText(`${text}`, x, y);
}

export function isClickOnCanvas(event, canvas) {
  let x = event.clientX;
  let y = event.clientY;
  let canvasRect = canvas.getBoundingClientRect();
  return (
    x >= canvasRect.left &&
    x <= canvasRect.right &&
    y >= canvasRect.top &&
    y <= canvasRect.bottom
  );
}
