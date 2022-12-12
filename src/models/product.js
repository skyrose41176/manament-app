const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      default: "Chưa nhập",
    },
    brand: {
      type: String,
      default: "Chưa nhập",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", Product);
