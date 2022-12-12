const router = require("express").Router();
const productRoute = require("./product");
const transactionRoute = require("./transaction");
const modelProductRoute = require("./modelProduct");
const userRoute = require("./user");

router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/transactions", transactionRoute);
router.use("/modelproducts", modelProductRoute);

module.exports = router;
