const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class Todo {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
  }

  insertTodoToDb() {
    const db = getDb();
    console.log(this);
    return db.collection("todos").insertOne(this);
  }

  static fetchAllTodos() {
    const db = getDb();
    return db
      .collection("todos")
      .find()
      .toArray()
      .then((todos) => {
        return todos;
      })
      .catch((error) => console.log(error));
  }

  deleteTodo(id) {
    const db = getDb();
    return db.collection("todos").deleteOne({ _id: new ObjectId(id) });
  }

  updateTodo(id, completed) {
    const db = getDb();
    return db
      .collection("todos")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { completed: completed } },
        { $currentDate: { lastUpdated: true } }
      );
  }
}

module.exports = Todo;
