const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/data", (req, res) => {
  const data = req.body.data;
  console.log("Received data:", data);
  res.json({ message: "Data received at the backend." });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
