const mongoose = require("mongoose");
const user = require("./user");
const product = require("./product");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Transaction = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: product,
    },
    userId: {
      type: ObjectId,
      ref: user,
      required: true,
    },
    bill: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", Transaction);
