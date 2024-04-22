import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // tao chuoi ngau hien
    const hashed = await bcrypt.hash(req.body.password, salt); // ma hoa + them chuoi

    // create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
