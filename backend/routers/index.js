import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import teamRoute from "./team.router.js";
import playerRouter from "./player.router.js";
import playerMatchRouter from "./player_match.router.js";
import teamMatchRouter from "./team_match.router.js"
import seasonRouter from "./season.router.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/team",teamRoute);
router.use("/player",playerRouter);
router.use("/playermatch",playerMatchRouter);
router.use("/teammatch",teamMatchRouter);
router.use("/season",seasonRouter)
export default router;
