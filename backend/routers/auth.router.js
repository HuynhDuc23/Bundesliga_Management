import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestRefreshToken,
  logoutUser,
  registerAccount, finalRegister
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
export default authRouter;
