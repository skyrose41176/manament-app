const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    address: {
      type: String,
      default: "Chưa nhập",
    },
    name: {
      type: String,
      default: "Chưa nhập",
    },
    phone: {
      type: String,
      default: "Chưa nhập",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
