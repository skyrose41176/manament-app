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
          name: new RegExp(search, "i"),
        },
        {
          brand: new RegExp(search, "i"),
        },
      ],
    };
    const users = await model.user.find(where).skip(skip).limit(pageSize);
    const totalCount = await model.user.count(where);
    return res.json({
      totalCount,
      pageSize,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / pageSize),
      data: users,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/chi-tiet", async (req, res) => {
  try {
    const id = req.query.id;
    const users = await model.user.findById(id);
    return res.json({ users });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("/tao", async (req, res) => {
  try {
    const data = req.body;
    const users = await model.user.create({ ...data });
    return res.json({ users });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.put("/cap-nhat", async (req, res) => {
  try {
    const data = req.body;
    const id = req.query.id;
    console.log({ data, id });
    const users = await model.user.findByIdAndUpdate(id, { ...data });
    return res.json({ users });
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.delete("/xoa", async (req, res) => {
  try {
    const id = req.query.id;
    const users = await model.user.findByIdAndRemove(id);
    return res.json({ users });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
