import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerValid, loginValid } from "../validations/User.validations.js";
import dotenv from "dotenv";
import uniqid from 'uniqid';
import sendMail from "../utils/Email.js";
dotenv.config();
// save refresh token in list
let listToken = [];
// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { error } = registerValid.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        name: "Bad request",
        data: errors,
      });
    }
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({
        name: "Bad request !",
        data: "User already exists",
      });
    }
    const emailExists = await User.findOne({ password: req.body.email });
    if (emailExists) {
      return res.status(402).json({
        name: "Bad request !",
        data: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
    });
    return res.status(200).json({
      name: "Sucessfully Create Account",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const registerAccount = async (req, res) => {
  try {
    const { error } = registerValid.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        name: "Bad request",
        data: errors,
      });
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({
        name: "Bad request !",
        data: "User already exists",
      });
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(402).json({
        name: "Bad request !",
        data: "Email already exists",
      });
    }
    // luu tam thoi duoi cookie
    const token = uniqid();
    res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 2 * 60 * 1000 });
    const html = ` 
  Please click here to confirm the account, the email will take effect 2 minutes after the request. <a href=${process.env.SERVER}/api/v1/auth/final/${token}> Click Me </a>`;
    await sendMail({ email, html, subject: 'Complete Registration' });
    return res.json({
      success: true,
      mes: 'Please select email to confirm account, email will take effect in 2 minutes'
    })
  } catch {
    return res.json({
      name: 'Bad request',
      data: 'Invalid , Please re-enter the information'
    })
  }
}
export const finalRegister = async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  if (!cookie || cookie?.dataregister?.token !== token) {
    res.status(404).json({
      name: 'Invalid',
      data: "The verification email has expired, please re-register or the token is incorrect",
    })
  }
  const salt = await bcrypt.genSalt(10); // tao chuoi ngau hien
  const hashed = await bcrypt.hash(cookie?.dataregister?.password, salt);
  const user = await User.create({
    username: cookie?.dataregister.username,
    password: hashed,
    email: cookie?.dataregister.email,
  });
  return res.status(200).json({
    name: "Sucessfully Create Account",
    data: user,
  });
}

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
        //refreshToken: refreshToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// REFRESH TOKEN AFTER ACCESS TOKEN het han
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
    // loc bo resfresh toen cu di
    listToken = listToken.filter((token) => token !== refreshToken);

    // create lai token : access token va refresh token
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
    // access token nay se luu trong redux ben frontend
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
    // luu vao cookie cua user va 1 ben server
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    // add lai resfresh token moi
    listToken.push(newRefreshToken);

    // response user ben clent
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  });
};
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  listToken = listToken.filter((token) => token !== req.cookies.refreshToken);
  return res.status(200).json({
    message: "Logout successfully",
  });
};

// STORE TOKEN : 3 cach
// 1 localStorage : de bi tan cong XSS
// STORE COOKIE : tan cong CSRF khac phuc SAMESITE
// 2 HTTPOnly Cookie
// 3 REDUX STORE -> access token
// 3 HTTPOnly Cookie -> refresh token
// BFF PATTERN
