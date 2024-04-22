import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  // Bearer 12312312323123123123231231323v value gui len
  if (token) {
    const accessToken = token.split(" "[1]);
    jwt.verify(accessToken, process.env.SECRETKEY_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token is not valid",
        });
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    });
  }
};
