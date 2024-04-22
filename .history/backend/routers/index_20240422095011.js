import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", usersRouter);

export default router;
