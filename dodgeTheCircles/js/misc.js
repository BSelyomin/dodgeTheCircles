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

export function isNearEdge(x, y) {
  switch (true) {
    case x < -100:
    case x > 1100:
    case y < -100:
    case y > 700:
      return false;
    default:
      return true;
  }
}
