module.exports = function (req, res, next) {
  // 401 means token not provided correctly retry
  // 403 means forbidden don't have access don't retry
  if (!req.user.isAdmin) return res.status(403).send("Forbidden");
  next();
};
