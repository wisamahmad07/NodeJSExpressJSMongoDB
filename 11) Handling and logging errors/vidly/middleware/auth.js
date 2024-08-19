const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied, invalid token");

  try {
    const verified = jwt.verify(token, process.env.jwtPrivateKey);
    console.log(verified);
    req.user = verified;
    next();
  } catch (ex) {
    res.status(400).send("bad request, invalid token");
  }
};
