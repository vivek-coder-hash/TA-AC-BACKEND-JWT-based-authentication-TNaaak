const jwt = require("jsonwebtoken");
module.exports = {
  verifyToken: async (req, res, next) => {
    var token = req.headers.authorization;
    console.log(token);
    try {
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        console.log({ payload });
        req.user = payload;
        next();
      } else {
        res.status(400).json({ error: "Token is required" });
      }
    } catch (error) {
      next(error);
    }
  },
};