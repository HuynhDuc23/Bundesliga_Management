import Role from "../models/Role.model.js";
import User from "../models/User.model.js";

// CREATE ROLE
export const createRole = async (req, res) => {
  try {
    const data = await Role.create(req.body);
    if (!data) {
      return res.status(400).json({
        message: "Cant not create role ",
      });
    }
    return res.status(201).json({
      message: "Create role successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE ROLE
export const deleteRole = async (req, res) => {
  try {
    const data = await Role.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Role does not exist",
      });
    }
    await User.updateMany(
      { role: req.params.id }, // Tìm tất cả người dùng có vai trò đó
      { $unset: { role: 1 } } // Loại bỏ trường role
    );
    return res.status(200).json({
      message: "Role deleted",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// GET ROLES
export const getRoles = async (req, res) => {
  try {
    const data = await Role.find({});
    if (!data) {
      return res.status(400).json({
        message: "Cant not get all roles",
      });
    }
    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
