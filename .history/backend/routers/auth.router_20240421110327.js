import { Router } from "express";
import { registerUser } from "../Auth.controllers.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
const userRouter = Router();
userRouter.post("/register", registerUser);
export default userRouter;
