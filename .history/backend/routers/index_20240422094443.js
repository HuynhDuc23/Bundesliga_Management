import { Router } from "express";
import express from "express";
import userRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
const router = express.Router();
router.use("/auth", userRouter);
router.use("/user", usersRouter);

export default router;
