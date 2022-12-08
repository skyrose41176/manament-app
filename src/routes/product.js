const router = require("express").Router();
const model = require("../models");
router.get("/", async (req, res) => {
  try {
    const products = await model.product.find({});
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
