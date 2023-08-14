const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Email:5qZw1nlWr2fw3yez@cluster0.n2yctlm.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db("todo");
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw " No db found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
