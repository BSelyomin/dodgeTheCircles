const join = document.querySelector("#joinGame");
const create = document.querySelector("#createGame");

join.addEventListener("click", () => {
  localStorage.setItem("path", "join");

  window.location.href = "name/";
});

create.addEventListener("click", () => {
  localStorage.setItem("path", "create");
  window.location.href = "name/";
});

join.addEventListener("click", () => {
  localStorage.setItem("path", "join");
  window.location.href = "name/";
});
