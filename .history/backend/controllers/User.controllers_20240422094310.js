import User from "../models/User.model";
// GET ALL USERS
export const getAllUsers = (req, res) => {
  try {
    const users = User.find();
    if (!user) {
      return res.status(404).json({
        message: "Cant not get all users!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
