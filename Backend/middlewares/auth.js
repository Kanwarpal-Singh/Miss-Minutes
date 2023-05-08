const jwt = require("jsonwebtoken")
const {BlacklistModel} = require("../models/blacklist.model")



const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).send({ msg: "Token not found" });
      const isBlacklisted = await BlacklistModel.findOne({ token: token });
      if (isBlacklisted)
        return res.status(401).send({ msg: "Unauthorized" });
      const decoded = jwt.verify(token, "name");
      if (!decoded) return res.status(401).send({ msg: "Invalid token" });
      req.body.UserId = decoded.UserId;
      req.body.role = decoded.role;
      next();
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  };
   

module.exports={auth}