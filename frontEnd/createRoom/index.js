let dom = {
  code: document.querySelector("h3"),
  playerCounter: document.querySelector("h2"),
  host: document.querySelector(".host"),
};

window.onload = async () => {
  let currentRoom = localStorage.getItem(currentRoom);

  if (currentRoom !== undefined) {
    if (currentRoom.location !== window.location.href) {
      window.location.href = currentRoom.location;
    }
  }
  let name = localStorage.getItem("name");
  localStorage.removeItem("name");
  let ifHost = localStorage.getItem("host");
  localStorage.removeItem("host");
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
    socket.send(JSON.stringify({ type: "close", data: name }));
    localStorage.remove("currentRoom");
  });

  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    if (data.messageType === "overflow") {
      window.location.href = "/";
    }

    if (data.messageType == "first") {
      if (!ifHost) {
        if (data.otherPlayers.includes(name) || data.host === name) {
          localStorage.setItem("path", window.location.href);
          window.location.href = "/name/";
        }
      }

      socket.send(JSON.stringify({ type: "name", data: name }));
    }
    console.log(data);
    update(data.code, data.players, data.host, data.otherPlayers);
  });
};

function update(code, players, host, names) {
  document.querySelectorAll("li").forEach((li) => {
    li.innerHTML = "";
  });
  dom.code.innerHTML = `Room Code: ${code}`;
  dom.playerCounter.innerHTML = `Player List (${players}/6):`;
  dom.host.innerHTML = `${host} (Host)`;
  if (names !== undefined) {
    names.forEach((name, index) => {
      document.querySelector(`.li${index}`).innerHTML = name;
    });
  }
}
