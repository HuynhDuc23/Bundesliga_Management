import { Router } from "express";
import { registerUser } from "../controllers/Auth.controllers.js";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/signin", signinUser);
export default userRouter;
