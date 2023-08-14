const getDb = require("../util/database").getDb;

class Todo {
  constructor(name) {
    this.name = name;
  }

  insertTodoToDb() {
    const db = getDb();
    return db.collection("todos").insertOne(this);
  }

  static fetchAllTodos() {
    const db = getDb();
    return db.collection("todos")
      .find()
      .toArray()
      .then((todos) => {
        return todos;
      })
      .catch((error) => console.log(error));
  }
}

module.exports = Todo;
