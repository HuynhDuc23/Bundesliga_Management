import { Router } from "express";
import { registerUser, loginUser } from "../controllers/Auth.controllers.js";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/signin", loginUser);
export default userRouter;
