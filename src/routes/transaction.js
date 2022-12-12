const router = require("express").Router();
const model = require("../models");
router.get("/du-lieu", async (req, res) => {
  try {
    const search = req.query.search ?? "";
    const phone = req.query.phone ?? "";
    const pageSize = req.query.pageSize ?? 10;
    const pageNumber = req.query.pageNumber ?? 1;
    const skip = (pageNumber - 1) * pageSize;
    const filter = {};
    if (phone !== "") {
      const user = await model.user.findOne({ phone });
      filter.userId = user?._id ?? null;
    }
    const where = {
      $or: [
        {
          // dateSold: new RegExp(search, "i"),
        },
      ],
      ...filter,
    };
    const transactions = await model.transaction
      .find(where)
      .skip(skip)
      .limit(pageSize);
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
    return res.json({ transactions });
  } catch (error) {
    return res.status(500).send(error);
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
    const transactions = await model.transaction.findByIdAndUpdate(id, {
      ...data,
    });
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
