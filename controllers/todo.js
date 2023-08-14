const Todo = require("../models/todo");

exports.addTodo = (req, res, next) => {
  const todo = new Todo();
  todo.name = req.body.name;
  todo
    .insertTodoToDb()
    .then((result) => {
      Todo.fetchAllTodos()
        .then((todos) => res.send(JSON.stringify(todos)))
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.fetchAllTodos = (req, res, next) => {
  Todo.fetchAllTodos()
    .then((todos) => res.send(JSON.stringify(todos)))
    .catch((error) => console.log(error));
};
