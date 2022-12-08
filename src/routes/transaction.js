const router = require("express").Router();
const model = require("../models");
router.get("/", async (req, res) => {
  try {
    const transactions = await model.transaction.find({});
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
