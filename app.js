const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/auth", authRouter);
app.use('/todo', todoRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({error: "Couldn't find resource."})
})

app.use((err, req, res, next) => {
  res.status(err.status).send({error: err.message});
})

mongoose.connect("mongodb+srv://noureddine:lXGUT2FopDwCLK5f@cluster0.pvibp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(result => {
    app.listen(8080);
});
