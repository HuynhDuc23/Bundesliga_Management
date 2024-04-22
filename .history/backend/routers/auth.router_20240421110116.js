import { Router } from "express";
import { registerUser } from "../Auth.controllers.js";
const userRouter = Router();
userRouter.post("/register");
export default userRouter;
