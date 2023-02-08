const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(bodyParser.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  loadMain();
  loadSingle();
});

const loadMain = () => {
  loadFile("/", "gameselectpage/index.html");
  loadFile("/style.css", "gameselectpage/style.css");
};

const loadSingle = () => {
  loadFile("/single/", "singleplayer/game.html", "text/html");
  loadFile("/single/style.css", "singleplayer/style.css", "text/css");
  fs.readdir("../frontend/singleplayer/js", (err, files) => {
    files.forEach((file) => {
      loadFile(`/single/js/${file}`, `singleplayer/js/${file}`);
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
