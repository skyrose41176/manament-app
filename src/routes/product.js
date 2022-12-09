const router = require("express").Router();
const model = require("../models");
router.get("/du-lieu", async (req, res) => {
  try {
    const products = await model.product.find({});
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/chi-tiet", async (req, res) => {
  try {
    const id = req.query.id;
    const products = await model.product.findById(id);
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("/tao", async (req, res) => {
  try {
    const data = req.body;
    const products = await model.product.create({...data});
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/cap-nhat", async (req, res) => {
  try {
    const data = req.body;
    const id = req.query.id;
    console.log({data,id});
    const products = await model.product.findByIdAndUpdate(id,{...data});
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.delete("/xoa", async (req, res) => {
  try {
    const id = req.query.id;
    const products = await model.product.findByIdAndRemove(id);
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
