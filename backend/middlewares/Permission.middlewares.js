import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRETKEY_ACCESS_KEY, (err, user) => {
      // user : cai id va admin luc signin
      if (err) {
        return res.status(403).json({
          message: "Token is not valid",
        });
      }
      console.log(req.user);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Unauthenticated!",
    });
  }
};

// AUTHEN  AND AUTHORIZATION
export const verifyTokenAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.admin);
    // decode tron g token + voi id gui param
    if (req.user.id == req.param.id || req.user.admin == 'admin') {
      // de xoa 1 user : 1 chinh no 2 la admin
      next();
    } else {
      return res.status(403).json("You're not allowed to delete other if delete user authorize ' admin role '");
    }
  });
};

export const verifyTokenWithAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.admin);
    if (req.user.admin == 'admin') {
      next();
    } else {
      return res.status(403).json("Sucessfully authorized");
    }
  });
};
