const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRouter = require('./routes/authRouter');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/auth", authRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({error: "Couldn't find resource."})
})

mongoose.connect("mongodb+srv://noureddine:lXGUT2FopDwCLK5f@cluster0.pvibp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(result => {
    app.listen(8080);
});
