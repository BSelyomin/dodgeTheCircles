let dom = {
  code: document.querySelector("h3"),
  playerCounter: document.querySelector("h2"),
  host: document.querySelector(".host"),
};

window.onload = async () => {
  let name = localStorage.getItem("name");
  localStorage.removeItem("name");

  if (name === null) {
    localStorage.setItem("path", window.location.href);
    window.location.href = "/name/";
    return;
  } else {
    localStorage.removeItem("path");
    localStorage.setItem("currentRoom", {
      location: window.location.href,
      name: name,
    });
  }

  let url = window.location.href.split("/");
  const socket = new WebSocket(`ws://${url[2]}/room/${url[4]}/data`);

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    socket.send(JSON.stringify({ type: "name", data: name }));
    localStorage.remove("currentRoom");
  });

  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    if (data.messageType === "overflow") {
      window.location.href = "/";
    }

    if (data.messageType == "first") {
      console.log(data.otherPlayers.includes(name));
      if (data.otherPlayers.includes(name) || data.host === name) {
        localStorage.setItem("path", window.location.href);
        window.location.href = "/name/";
      }
      socket.send(JSON.stringify({ type: "name", data: name }));
    }
    console.log(data);
    update(data.code, data.players, data.host, data.otherPlayers);
  });

  //   data.playerNames.array.forEach((name, index) => {});
  //   let li = document.createElement("li");
  //   li.textContent = localStorage.getItem("name");
};

function update(code, players, host, names) {
  dom.code.innerHTML = `Room Code: ${code}`;
  dom.playerCounter.innerHTML = `Player List (${players}/6):`;
  dom.host.innerHTML = `${host} (Host)`;
  if (names !== undefined) {
    names.forEach((name, index) => {
      document.querySelector(`.li${index}`).innerHTML = name;
    });
  }
}

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
