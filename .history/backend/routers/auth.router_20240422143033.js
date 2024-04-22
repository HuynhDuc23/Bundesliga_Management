import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestRefreshToken,
} from "../controllers/Auth.Controllers.js";

const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/signin", loginUser);
authRouter.post("/refresh", requestRefreshToken);
export default authRouter;
