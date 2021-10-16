const mongoose = require("mongoose");

//creating schema object
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: mongoose.Types.objectId,
      ref: "Todo",
    },
  ],
});

module.exports = userSchema;
