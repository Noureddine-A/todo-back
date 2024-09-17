const express = require('express');
const isAuth = require('../middleware/is-auth');

const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/add-todo', isAuth, todoController.addTodo);

router.get('/get-todos', isAuth, todoController.getTodos);

router.patch('/update-todo', isAuth, todoController.updateTodo);

router.delete('/delete-todos', isAuth, todoController.deleteCompletedTodos);

module.exports = router;
