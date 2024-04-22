import { Router } from "express";
import express from "express";
import userRouter from "./auth.router.js";
const router = express.Router();
router.use("/auth", userRouter);

export default router;
