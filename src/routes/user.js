const router = require("express").Router();
const model = require("../models");
router.get("/", async (req, res) => {
  try {
    const users = await model.user.find({});
    return res.json({ users });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
