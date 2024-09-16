const User = require("../models/User");

exports.addTodo = (req, res, next) => {
  const todoTitle = req.body.todo;
  const completed = req.body.completed;

  User.findById(req.user.userId)
    .then((user) => {
      if (!user) {
        let error = new Error();
        error.status = 422;
        error.message =
          "Apparently something went wrong with adding the todo. Try it again later.";
        throw error;
      }

      user.todos.push({ name: todoTitle, completed: completed });
      user.save().then((result) => {
        res.status(200).json({ message: "Successfully added todo" });
      });
    })
    .catch((err) => {
      err.status = 500;
      err.message =
        "Something went wrong with the server. Please try again later.";
    });
};

exports.getTodos = (req, res, next) => {
  User.findById(req.user.userId).then((user) => {
    if (!user) {
      let error = new Error();
      error.status = 422;
      error.message =
        "Apparently something went wrong with adding the todo. Try it again later.";
      throw error;
    }

    res.status(200).json({ todos: user.todos });
  });
};

exports.updateTodo = (req, res, next) => {
  User.findById(req.user.userId).then((user) => {
    if (!user) {
      let error = new Error();
      error.status = 422;
      error.message =
        "Apparently something went wrong with adding the todo. Try it again later.";
      throw error;
    }

    for (i = 0; i < user.todos.length; i++) {
      if (user.todos[i]._id.toString() === req.body.todoId.toString()) {
        if (user.todos[i].completed === false) {
          user.todos[i].completed = true;
        } else {
          user.todos[i].completed = false;
        }
      }
    }

    user
      .save()
      .then((result) => {
        res.status(200).send({ message: "Successfully updated todo." });
      })
      .catch((error) => {
        err.status = 500;
        err.message =
          "Something went wrong with the server. Please try again later.";
      });
  });
};
