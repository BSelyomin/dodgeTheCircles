const elements = {
  input: document.querySelector(".name"),
  form: document.querySelector("form"),
};

document.onload = () => {
  if (path === undefined || path === null) {
    window.location.href = "/";
  }
};

elements.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let name = elements.input.value;
  if (
    name === "" ||
    name === null ||
    name === undefined ||
    name.includes("‎")
  ) {
    alert("Please enter a valid name");
  } else {
    localStorage.setItem("name", name);

    let path = localStorage.getItem("path");
    localStorage.removeItem("path");

    if (path === "create") {
      let url = await fetch("/name/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      }).then((response) => response.json());
      window.location.href = url.location;
    } else if (path === "join") {
      window.location.href = "/join/";
    } else {
      window.location.href = path;
    }
    window.location.href = url.location;
  }
});
