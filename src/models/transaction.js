const mongoose = require("mongoose");
const user = require("./user");
const modelProduct = require("./modelProduct");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Transaction = new Schema(
  {
    modelProductId: {
      type: ObjectId,
      required: true,
      ref: modelProduct,
    },
    userId: {
      type: ObjectId,
      ref: user,
      required: true,
    },
    priceIn: {
      type: Number,
      default: 0,
    },
    priceOut: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    dateSold: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", Transaction);
