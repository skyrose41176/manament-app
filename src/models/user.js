const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
