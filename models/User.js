const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      name: {
        type: String,
      },
      completed: {
        type: Boolean,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
