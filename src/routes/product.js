const router = require("express").Router();
const model = require("../models");
router.get("/du-lieu", async (req, res) => {
  try {
    const search = req.query.search.trim() ?? "";
    const pageSize = req.query.pageSize ?? 10;
    const pageNumber = req.query.pageNumber ?? 1;
    const skip = (pageNumber - 1) * pageSize;
    const where = {
      $or: [
        {
          name: new RegExp(search, "i"),
        },
        {
          brand: new RegExp(search, "i"),
        },
      ],
    };
    const products = await model.product.find(where).skip(skip).limit(pageSize).sort({createdAt:-1});
    const totalCount = await model.product.count(where);
    return res.json({
      totalCount,
      pageSize,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      data: products,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/chi-tiet", async (req, res) => {
  try {
    const id = req.query.id;
    const products = await model.product.findById(id);
    return res.json({ 
      data:products,
      errors:null,
      message:null, 
      succeeded:true
    });
  } catch (error) {
    return res.status(500).send({
      data:null,
      errors:null,
      message:`${error}`, 
      succeeded:false
    });
  }
});
router.post("/tao", async (req, res) => {
  try {
    const data = req.body;
    const products = await model.product.create({ ...data });
    return res.json({ products });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/cap-nhat", async (req, res) => {
  try {
    const data = req.body;
    const id = req.query.id;
    console.log({ data, id });
    const products = await model.product.findByIdAndUpdate(id, { ...data });
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
