import { Router } from "express";
import { loginUser, registerUser } from "../controllers/Auth.Controllers.js";

const authRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/signin", loginUser);
export default authRouter;
