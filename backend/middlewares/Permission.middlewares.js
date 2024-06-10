import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // Bearer 12312312323123123123231231323v value gui len
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRETKEY_ACCESS_KEY, (err, user) => {
      // user : cai id va admin luc signin
      if (err) {
        return res.status(403).json({
          message: "Token is not valid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Unauthenticated!",
    });
  }
};
export const verifyTokenAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.param.id || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to delete other");
    }
  });
};
