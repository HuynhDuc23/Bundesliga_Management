import { Router } from "express";
import { uploadImages } from "../controllers/Images.controller.js";

const routerImages = Router();

//  const  storage = new CloudinaryStorage();

// cau hinh midder...

// upload anh
routerImages.post("/", uploadImages);
export default routerImages;
