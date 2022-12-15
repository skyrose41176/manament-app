const jwt = require("jsonwebtoken");

const secret = "assfs87gshahsdknf2@#$@#$";
exports.checkAuthentication = (req, res, next) => {
  try {
    const token = `${req.headers.authorization}`.split(" ")[1];
    if (!token) return res.status(401).send("UNTHENTICATION");
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).send("UNTHENTICATION");
  }
};

exports.generateToken = (payload) => {  
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};
