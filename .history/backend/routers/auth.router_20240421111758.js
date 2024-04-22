import { Router } from "express";
import { registerUser } from "../controllers/Auth.Controllers.js";

const userRouter = Router();
userRouter.post("/register", registerUser);
export default userRouter;
