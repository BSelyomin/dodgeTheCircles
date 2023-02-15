let dom = {
  code: document.querySelector("h3"),
  playerCounter: document.querySelector("h2"),
  list: document.querySelector("ul"),
};

window.onload = async () => {
  let name = localStorage.getItem("name");
  if (name === null) {
    localStorage.setItem("path", window.location.href);
    window.location.href = "/name/";
  } else {
    localStorage.removeItem("path");
  }

  //   let data = await fetch(`${window.location.href}/first`).then((response) =>
  //     response.json()
  //   );
  let url = window.location.href;
  url = url.split("/");
  const socket = new WebSocket(`ws://${url[2]}/room/${url[4]}/data`);

  let data = [];
  socket.addEventListener("message", (event) => {
    if (data.host !== name) {
      socket.send(JSON.stringify(name));
    }

    data = event.data;
    console.log(data);
  });

  //   data.playerNames.array.forEach((name, index) => {});
  //   let li = document.createElement("li");
  //   li.textContent = localStorage.getItem("name");
};

// Listen for messages from the server

// Send data to the server
// socket.send(JSON.stringify({ ... } ));

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
