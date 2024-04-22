import { Router } from "express";
import { loginUser, registerUser } from "../controllers/Auth.Controllers.js";
import { verifyToken } from "../middlewares/Permission.middlewares.js";
const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/signin", loginUser);
export default authRouter;
