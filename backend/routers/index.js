import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import matchRouter from "./match.router.js";
import matchteamRouter from "./match_Team.router.js";
import roleRouter from "./role.router.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/match", matchRouter);
router.use("/matchteam", matchteamRouter);
router.use("/role", roleRouter);

export default router;
