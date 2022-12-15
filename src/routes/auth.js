const router = require("express").Router();
const model = require("../models");
const { generateToken } = require("../middleware/authentication");
router.post("/", async (req, res) => {
  try {
    const phone = req.body?.phone ?? null;
    const pass = req.body?.password ?? null;
    console.log(phone, pass);
    if (phone === null || pass === null) {
      return res.status(500).send("Vui lòng điền đầy đủ thông tin");
    }
    const user = await model.user.findOne({ password: pass, phone });
    if (user == null) return res.status(500).send("Đăng nhập thất bại");
    const { _v, updatedAt, createdAt, password, ...auth } = user._doc;
    const token = generateToken({ user:auth });
    return res.json({auth,token});
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
