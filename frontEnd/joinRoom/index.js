let DOM = {
  list: document.querySelector(".rooms-list"),
};

window.onload = async () => {
  console.log(await serverCall());
};

async function serverCall() {
  return fetch("/join/list")
    .then((response) => response.json())
    .then((data) => new Set(...data));
}
