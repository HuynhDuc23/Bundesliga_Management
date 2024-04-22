import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerValid, loginValid } from "../validations/User.validations.js";
import dotenv from "dotenv";
dotenv.config();

let listToken = [];
// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { error } = registerValid.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        name: "bad_request",
        data: errors,
      });
    }

    // user_exists
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({
        name: "Bad request !",
        data: "User already exists",
      });
    }
    // email Exists
    const emailExists = await User.findOne({ password: req.body.email });
    if (emailExists) {
      return res.status(402).json({
        name: "Bad request !",
        data: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10); // tao chuoi ngau hien
    const hashed = await bcrypt.hash(req.body.password, salt); // ma hoa + them chuoi
    const user = await User.create({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
    });
    return res.status(200).json({
      name: "success creating user",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { error } = loginValid.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        name: "bad_request",
        data: errors,
      });
    }

    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).json({
        message: "Wrong username!",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({
        message: "Wrong password!",
      });
    }
    if (user && validPassword) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.SECRETKEY_ACCESS_KEY,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.SECRETKEY_REFRESH_TOKEN,
        {
          expiresIn: "365d",
        }
      );
      listToken.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc; //  obj
      return res.status(200).json({
        message: "Success!",
        ...others,
        accsessToken: accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const requestRefreshToken = async (req, res) => {
  // lay token tu user luu  o  cookie
  const refreshToken = req.cookie.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "You not not authenticated",
    });
  }
  if (!listToken.includes(refreshToken)) {
    return res.status(403).json({
      message: "Refresh token is not valid",
    });
  }
  // verify
  jwt.verify(refreshToken, process.env.SECRETKEY_REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
    listToken = listToken.filter((token) => token !== refreshToken);
    const newAccessToken = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.SECRETKEY_ACCESS_KEY,
      {
        expiresIn: "1h",
      }
    );
    const newRefreshToken = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.SECRETKEY_REFRESH_TOKEN,
      {
        expiresIn: "365d",
      }
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    listToken.push(newRefreshToken);
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  });
};
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  listToken = listToken.filter((token) => token !== req.cookies.refreshToken);
};

// JWT : access token , refresh token

// iat : iussua atime : thoi gian tao token

// STORE TOKEN : 3 cach
// 1 localStorage : de bi tan cong XSS
// STORE COOKIE : tan cong CSRF khac phuc SAMESITE

// 2 HTTPOnly Cookie

// 3 REDUX STORE -> access token
// 3 HTTPOnly Cookie -> refresh token

// BFF PATTERN
