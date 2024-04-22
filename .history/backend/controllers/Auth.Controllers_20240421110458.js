import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const registerUser = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
