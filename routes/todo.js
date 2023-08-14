const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo");

router.get("/", todoController.fetchAllTodos);
router.post("/add", todoController.addTodo);

module.exports = router;
