const mongoose = require("mongoose");
const product = require("./product");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ModelProduct = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: product,
    },
    dateAdd: {
      type: String,
      default: "Chưa nhập",
    },
    priceAdd: {
      type: String,
      default: "Chưa nhập",
    },
    model: {
      type: String,
      default: "Chưa nhập",
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("modelProducts", ModelProduct);
