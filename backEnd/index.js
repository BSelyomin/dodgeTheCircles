const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");
const expressWs = require("express-ws");
const express = require("express");
const { json } = require("body-parser");
const app = express();
app.use(bodyParser.json());
expressWs(app);

const port = 80;

const connectedClients = new Set();
let rooms = [];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  loadMain();
  loadSingle();
  loadName();
  loadJoin();
});

const loadMain = () => {
  loadFile("/", "gameselectpage/index.html");
  loadFile("/style.css", "gameselectpage/style.css");
  loadFile("/index.js", "gameselectpage/index.js");
};

const loadSingle = () => {
  loadFile("/single/", "singleplayer/game.html");
  loadFile("/single/style.css", "singleplayer/style.css", "text/css");
  fs.readdir("../frontend/singleplayer/js", (err, files) => {
    files.forEach((file) => {
      loadFile(`/single/js/${file}`, `singleplayer/js/${file}`);
    });
  });
};

const loadName = () => {
  loadFile("/name/", "nameSelect/name.html");
  loadFile("/name/style.css", "nameSelect/style.css");
  loadFile("/name/index.js", "nameSelect/index.js");
};

const loadJoin = () => {
  loadFile("/join/", "joinroom/room.html");
  loadFile("/join/style.css", "joinroom/style.css");
  loadFile("/join/index.js", "joinroom/index.js");
};

app.post("/name/create", (req, res) => {
  const randomCode = crypto.randomBytes(3).toString("hex");
  let name = req.body.name;

  loadFile(`/room/${randomCode}/`, "createroom/create.html");
  loadFile(`/room/${randomCode}/style.css`, "createroom/style.css", "text/css");
  loadFile(`/room/${randomCode}/index.js`, "createroom/index.js");
  let room = {
    location: `/room/${randomCode}/`,
    code: randomCode,
    players: 1,
    host: name,
    otherPlayers: [],
    messageType: null,
  };
  res.json({ location: `/room/${randomCode}/`, code: randomCode });
  loadRooms(room);
});

const loadRooms = (room) => {
  app.ws(`/room/${room.code}/data`, (ws, req) => {
    if (room.players === 6) {
      ws.send(JSON.stringify({ messageType: "overflow" }));
      return;
    }
    connectedClients.add(ws);
    room.messageType = "first";
    ws.send(JSON.stringify(room));
    room.messageType = null;
    ws.on("message", (message) => {
      let data = JSON.parse(message);
      if (
        data.type === "name" &&
        data.data !== room.host &&
        !room.otherPlayers.includes(data.data)
      ) {
        room.players++;
        room.otherPlayers.push(data.data);

        for (const client of connectedClients) {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(room));
          }
        }
      }
      if (data.type === "close") {
        room.otherPlayers.splice(room.otherPlayers.indexOf(data.name), 1);
        room.players--;
        for (const client of connectedClients) {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(room));
          }
        }
      }
    });
    ws.on("close", () => {
      connectedClients.delete(ws);
    });
  });
};

function loadFile(url, dir, type) {
  app.get(url, (req, res) => {
    if (type) {
      res.set("Content-Type", type);
    }
    res.sendFile(path.join(__dirname, "..", "frontend", ...dir.split("/")));
  });
}

app.post("/data", (req, res) => {
  let data = req.body.data;
  res.json({ message: "Data received at the backend." });
});
