import { Router } from "express";
import { registerUser } from "../controllers/Auth.controllers.js";
const userRouter = Router();
userRouter.post("/register");
export default userRouter;
