import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// verify token
const verifyToken = (req, res) => {
  const token = req.header.token;
  // Bearer 12312312323123123123231231323v :token
  if (token) {
    const accessToken = token.split(" "[1]);
    jwt.verify(accessToken, process.env.SECRETKEY_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: err,
        });
        req.user = user;
        next();
      }
    });
  }
};
