import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import roleRouter from "./role.router.js";
import routerImages from "./upload.router.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/role", roleRouter);
router.use("/upload", routerImages);

export default router;
