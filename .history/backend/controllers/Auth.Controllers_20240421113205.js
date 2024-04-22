import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // tao chuoi ngau hien
    const hashed = await bcrypt.hash(req.body.password, salt); // ma hoa + them chuoi

    // create user
    const newUser = await new User({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
    });
    // save user to DB
    const user = await newUser.save();
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
