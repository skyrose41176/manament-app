const router = require("express").Router();
const model = require("../models");
router.get("/du-lieu", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    const pageSize = req.query.pageSize ?? 10;
    const pageNumber = req.query.pageNumber ?? 1;
    const skip = (pageNumber - 1) * pageSize;
    const where = {
      $or: [
        {
          model: new RegExp(search, "i"),
        },
      ],
    };
    const modelProducts = await model.modelProduct
      .find(where)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await model.modelProduct.count(where);
    return res.json({
      totalCount,
      pageSize,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      data: modelProducts,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/chi-tiet", async (req, res) => {
  try {
    const id = req.query.id;
    const modelProducts = await model.modelProduct.findById(id);
    return res.json({ modelProducts });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("/tao", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const modelProducts = await model.modelProduct.create({ ...data });
    return res.json({ modelProducts });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/cap-nhat", async (req, res) => {
  try {
    const data = req.body;
    const id = req.query.id;
    console.log({ data, id });
    const modelProducts = await model.modelProduct.findByIdAndUpdate(id, {
      ...data,
    });
    return res.json({ modelProducts });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.delete("/xoa", async (req, res) => {
  try {
    const id = req.query.id;
    const modelProducts = await model.modelProduct.findByIdAndRemove(id);
    return res.json({ modelProducts });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
