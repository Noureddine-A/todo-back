const express = require("express");

const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(todoRoutes);

mongoConnect(() => {
  app.listen(8080);
});
