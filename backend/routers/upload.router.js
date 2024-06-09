import { Router } from "express";
import { uploadImages } from "../controllers/Images.controller.js";
import uploadCloud from '../configs/Cloudinary.config.js';
import { verifyToken } from "../middlewares/Permission.middlewares.js";
const routerImages = Router();
routerImages.post("/", verifyToken, uploadCloud.single('image'), uploadImages);
export default routerImages;
