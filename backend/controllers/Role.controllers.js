import Role from "../models/Role.model.js";

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
