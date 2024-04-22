import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestRefreshToken,
  logoutUser,
} from "../controllers/Auth.Controllers.js";

const authRouter = Router();
// RIGISTER
authRouter.post("/register", registerUser);
// LOGIN
authRouter.post("/signin", loginUser);
//REFRESH
authRouter.post("/refresh", requestRefreshToken);
// LOGOU
authRouter.post("/logout", logoutUser);
export default authRouter;
