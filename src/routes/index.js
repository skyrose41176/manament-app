const router = require("express").Router();
const productRoute = require("./product");
const transactionRoute = require("./transaction");
const modelProductRoute = require("./modelProduct");
const userRoute = require("./user");
const authRoute = require("./auth");

const { checkAuthentication } = require("../middleware/authentication");

router.use("/products", checkAuthentication, productRoute);
router.use("/users", checkAuthentication, userRoute);
router.use("/authenticate", authRoute);
router.use("/transactions", checkAuthentication, transactionRoute);
router.use("/modelproducts", checkAuthentication, modelProductRoute);

module.exports = router;
