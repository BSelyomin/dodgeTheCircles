const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.post("/data", (req, res) => {
  console.log(req.body.data);
  res.send({ status: "success" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const server = http.createServer((request, response) => {
  // // response.write("Hello Node");
  // response.writeHead(200, { "Content-Type": "application/json" });
  // response.write("Shut up bitch");
  // response.end("Hello Node.js Server!");
});

// server.listen(port, (err) => {
//   if (err) {
//     return console.log("something bad happened", err);
//   } else {
//     console.log("Server is listening on port ", port);
//   }
// });
