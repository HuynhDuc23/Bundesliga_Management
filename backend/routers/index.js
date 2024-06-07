import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import roleRouter from "./role.router.js";

import matchRouter from "./match.router.js";
import matchteamRouter from "./match_Team.router.js";

import seasonRouter from "./season.router.js";
import teamRouter from "./team.router.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }))
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/role", roleRouter);

router.use("/team", teamRouter);

router.use("/match", matchRouter);
router.use("/matchteam", matchteamRouter);

router.use("/season", seasonRouter);

export default router;
