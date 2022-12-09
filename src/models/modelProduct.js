const mongoose = require("mongoose");
const product = require("./product");
const Schema = mongoose.Schema;

const ModelProduct = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: product,
    },
    dateAdd: {
      type: String,
    },
    priceAdd: {
      type: String,
    },
    model: {
      type: String,
    },
    isSold: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("modelProducts", ModelProduct);
