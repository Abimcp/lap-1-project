const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// const postRoutes = require("./controllers/routes");

const fs = require("fs");

let user;

fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    user = JSON.parse(data);
    console.log(user);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

app.get("/posts", (req, res) => {
  res.send(user);
});

app.get("/", (req, res) => {
  res.send("Welcome to Love Island Reacts!");
});

app.post("/", (req, res) => {
  res.status(405).send("Not allowed!");
});

module.exports = app;
