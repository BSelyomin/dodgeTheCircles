let dom = {
  code: document.querySelector("h3"),
  playerCounter: document.querySelector("h2"),
  list: document.querySelector("ul"),
};

// const socket = new WebSocket(`room//data`);

window.onload = async () => {
  let name = localStorage.getItem("name");
  if (name === null) {
    localStorage.setItem("path", window.location.href);
    window.location.href = "/name/";
  } else {
    localStorage.removeItem("path");
  }

  let data = await fetch(`${window.location.href}/first`).then((response) =>
    response.json()
  );
  if (data.host === name) {
  } else {
  }
  //   socket.addEventListener("message", (event) => {
  //     socket.send(JSON.stringify(name));
  //     const data = JSON.parse(event.data);
  //     console.log(data);
  //   });

  room.playerNames.array.forEach((name, index) => {});
  let li = document.createElement("li");
  li.textContent = localStorage.getItem("name");
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
