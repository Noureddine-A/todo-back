const Todo = require("../models/todo");

exports.addTodo = (req, res, next) => {
  const todo = new Todo();
  todo.name = req.body.name;
  todo.completed = req.body.completed;

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

exports.deleteTodo = (req, res, next) => {
  const todo = new Todo();
  todo
    .deleteTodo(req.body.id)
    .then((result) => {
      Todo.fetchAllTodos()
        .then((todos) => res.send(JSON.stringify(todos)))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.updateTodo = (req, res, next) => {
  const todo = new Todo();
  todo
    .updateTodo(req.body.id, req.body.completed)
    .then((result) =>
      Todo.fetchAllTodos()
        .then((todos) => res.send(JSON.stringify(todos)))
        .catch((err) => {
          console.log(err);
        })
    )
    .catch((err) => console.log(err));
};

exports.fetchAllCompletedTodos = (req, res, next) => {
  const todo = new Todo();

  todo
    .filterTodo(true)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

exports.fetchAllActiveTodos = (req, res, next) => {
  const todo = new Todo();

  todo
    .filterTodo(false)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
};

exports.deleteAllCompletedTodos = (req, res, next) => {
  console.log('e');
  const todo = new Todo();
  todo
    .deleteCompletedTodos()
    .then((result) => {
      Todo.fetchAllTodos()
        .then((todos) => {
          res.send(JSON.stringify(todos));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
