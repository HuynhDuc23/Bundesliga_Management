import cloudinary from "../configs/Cloudinary.config.js";

export const uploadImages = async (req, res) => {
  try {
    // khi tai file can cai them them thu vien multer
    // gui anh di , req.files
    const images = req.files.map((file) => file.path);
    // nhung anh upload thanh cong
    const uploadedImages = [];

    for (let image of images) {
      // chi hoat dong voi 1 anh 1
      const results = await cloudinary.uploader.upload(image);
      console.log(results);
      uploadedImages.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }
    return res.status(200).json({
      message: "Uploaded images Successfully",
      data: uploadedImages,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
