import cloudinary from "../configs/Cloudinary.config.js";
import dotenv from "dotenv";
import User from "../models/User.model.js";
export const uploadImages = async (req, res) => {
  try {
    let image = req.file;
    if (image != undefined) {
      let user = await User.findById(req.user.id);
      console.log(user);
      user.avatarUrl = image.path;
      console.log("Link : " + user.avatarUrl);
      await user.save();

      return res.status(200).json({
        message: "Uploaded images Successfully",
        data: image.path
      });
    }
    else {
      return res.status(200).json({
        message: "No Uploaded image "
      });
    }

  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
