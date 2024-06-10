import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestRefreshToken,
  logoutUser,
  registerAccount, finalRegister, forgotPassword, verifyOtpAndResetPass
} from "../controllers/Auth.controllers.js";
import { verifyToken } from "../middlewares/Permission.middlewares.js";

const authRouter = Router();
// RIGISTER
//authRouter.post("/register", registerUser);
authRouter.post("/register2", registerAccount);
authRouter.get("/final/:token", finalRegister);
// LOGIN
authRouter.post("/signin", loginUser);
//REFRESH
authRouter.post("/refresh", requestRefreshToken);
// LOGOUT
authRouter.post("/logout", verifyToken, logoutUser);
// Forgot Password
authRouter.post("/forgotPassword", forgotPassword);
authRouter.patch("/verifyOtpAndResetPass", verifyOtpAndResetPass);

export default authRouter;
