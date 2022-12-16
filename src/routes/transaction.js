const router = require("express").Router();
const model = require("../models");
router.get("/du-lieu", async (req, res) => {
  try {
    const search = req.query.search.trim() ?? "";
    const pageSize = req.query.pageSize ?? 10;
    const pageNumber = req.query.pageNumber ?? 1;
    const skip = (pageNumber - 1) * pageSize;
    const modelProductId = req.query.modelProductId ?? "";
    const filter = {};
    if (modelProductId !== "") {
      filter.modelProductId = modelProductId;
    }
    const where = {
      $or: [
        {
          phoneCustomer: new RegExp(search, "i"),
        },
        {
          nameCustomer: new RegExp(search, "i"),
        },
      ],
      ...filter,
    };
    const transactions = await model.transaction.find(where).skip(skip).limit(pageSize).sort({createdAt:-1});
    const totalCount = await model.transaction.count(where);
    return res.json({
      totalCount,
      pageSize,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      data: transactions,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/chi-tiet", async (req, res) => {
  try {
    const id = req.query.id;
    const transactions = await model.transaction.findById(id);
    return res.json({ 
      data:transactions,
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
    const transactions = await model.transaction.create({ ...data });
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/cap-nhat", async (req, res) => {
  try {
    const data = req.body;
    const id = req.query.id;
    console.log({ data, id });
    const transactions = await model.transaction.findByIdAndUpdate(id, { ...data });
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.delete("/xoa", async (req, res) => {
  try {
    const id = req.query.id;
    const transactions = await model.transaction.findByIdAndRemove(id);
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
