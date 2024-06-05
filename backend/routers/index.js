import { Router } from "express";
import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import roleRouter from "./role.router.js";
import routerImages from "./upload.router.js";
import teamRoute from "./team.router.js";
// season routes
import seasonRouter from "./season.router.js";
import teamSeasonRouter from "./teamseason.router.js";
// player routes
import playerRouter from "./player.router.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/role", roleRouter);
router.use("/upload", routerImages);
// user routes
router.use("/season", seasonRouter);
router.use("/teamSeasons",teamSeasonRouter);
// team routes
router.use("/team",teamRoute);
// player routes
router.use("/player", playerRouter);
export default router;
