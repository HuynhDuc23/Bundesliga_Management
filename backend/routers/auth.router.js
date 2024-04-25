import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestRefreshToken,
  logoutUser,
} from "../controllers/Auth.Controllers.js";
import { verifyToken } from "../middlewares/Permission.middlewares.js";

const authRouter = Router();
// RIGISTER
authRouter.post("/register", registerUser);
// LOGIN
authRouter.post("/signin", loginUser);
//REFRESH
authRouter.post("/refresh", requestRefreshToken);
// LOGOUT
authRouter.post("/logout", verifyToken, logoutUser);
export default authRouter;
