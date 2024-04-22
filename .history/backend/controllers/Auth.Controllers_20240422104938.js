import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerValid, loginValid } from "../validations/User.validations.js";
import dotenv from "dotenv";
dotenv.config();

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
        process.env.SECRETKEY_ACCESS_KEY || "jsjsjsj",
        {
          expiresIn: "30s",
        }
      );
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

// JWT : access token , refresh token

// iat : iussua atime : thoi gian tao token
