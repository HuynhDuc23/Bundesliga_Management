import RoleModel from "../models/Role.model.js";
import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import bcrypt from "bcrypt";
import {
  registerValid,
  createUserValid,
} from "../validations/User.validations.js";

// GET ALL USERS WITH ROLE
export const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();
    // bao nhieu trang , bao nhieu san pham , sap xep theo gi , sap xep theo chieu nao
    // query = ?
    const {
      _page = 1, // trang 1 neu ho khong nhap tu nguoi dung
      _limit = 10, // toi da 10 trang neu ho khong nhap
      _sort = "createdAt", // sap xep theo ngay tao neu ho khong nhap sap xep theo gi
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        // sap xep theo nhieu tieu chi khac nhau
        [_sort]: _order === "asc" ? 1 : -1, // createdAt: _order === "asc" ? 1 : -1,
      },
      populate: "role", // Populate thông tin role cho mỗi user
    };
    const users = await User.paginate({}, options);
    console.log(users);
    if (!users.docs || users.docs.length === 0) {
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

// GET USERS BY ID WITH ROLE
export const getUsersById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).populate("role");
    if (!data) {
      return res.status(404).json({
        message: "Cant not find user by id",
      });
    }
    return res.status(200).json({
      message: "Sucessfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// CREATE USER WITH ROLE
export const createUser = async (req, res) => {
  try {
    const { error } = createUserValid.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const salt = await bcrypt.genSalt(10); // tao chuoi ngau hien
    const hashed = await bcrypt.hash(req.body.password, salt); // ma hoa + them chuoi
    const user = await User.create({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
      role: req.body.role,
    });
    if (!user) {
      return res.status(400).json({
        message: "Cant not create user",
      });
    }
    const updateRole = await Role.findByIdAndUpdate(user.role, {
      $addToSet: {
        user: user._id,
      },
    });
    return res.status(201).json({
      message: "Successfully created",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// DELETE USER BY ID -> TRONG ROLE CX MAT LUON QUYEN CUA NO
export const deleteUserById = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: `Cant no delete with ${req.params.id}`,
      });
    }
    // xoa di role cua id do trong bang role
    // Xóa id của người dùng khỏi danh sách người dùng của từng vai trò trong bảng vai trò
    await Role.updateMany(
      { user: req.params.id }, // Tìm các vai trò có người dùng có id tương ứng
      { $pull: { user: req.params.id } } // Loại bỏ id của người dùng khỏi danh sách người dùng của vai trò
    );

    // thong bao
    return res.status(200).json({
      message: `Delete Sucess ${req.params.id}`,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
// UPDATE USER AND ROLE
export const updateUser = (req, res) => {
  // user name , password , confirm password , email
};
