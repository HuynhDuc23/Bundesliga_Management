import User from "../models/User.model.js";
// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        message: "Cant not get all users!",
      });
    }
    return res.status(200).json({
      message: "Success!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
