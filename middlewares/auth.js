const jwt = require("jsonwebtoken");

const errors = require("../constants/errors");

module.exports = {
  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        if (decoded) {
          req.user = decoded.tokenUser;
          next();
        } else {
          res.status(401).json(errors.AUTH_FAILED);
        }
      } catch (err) {
        console.log(err);
        res.status(401).json(errors.INVALID_TOKEN);
      }
    } else {
      res.status(401).json(errors.NO_TOKEN);
    }
  },
};
