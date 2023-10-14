const express = require("express");
const cors = require("cors");
const Auth = require("./routes/authentication");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Add new routes here
app.use("/api/", Auth);

app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = app;
