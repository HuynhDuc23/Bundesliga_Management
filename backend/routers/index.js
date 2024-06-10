import { Router } from "express";
import express from "express";
// Account
import authRouter from "./auth.router.js";
import usersRouter from "./user.router.js";
import roleRouter from "./role.router.js";

import matchRouter from "./match.router.js";
import matchTeamRouter from "./match_Team.router.js";
import routerImages from "./upload.router.js";
// Team
import teamRouter from "./team.router.js";
// Season
import seasonRouter from "./season.router.js";
import teamSeasonRouter from "./teamseason.router.js";
// Player
import playerRouter from "./player.router.js";
import playerMatchRouter from "./player_match.router.js";
// Team match
import teamMatchRouter from "./team_match.router.js"
import { verifyToken } from "../middlewares/Permission.middlewares.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }))
router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/role", roleRouter);

router.use("/team", teamRouter);

router.use("/match", matchRouter);
router.use("/matchteam", matchTeamRouter);
router.use("/season", seasonRouter);
router.use("/upload", routerImages);
// user routes
router.use("/season", verifyToken, seasonRouter);
router.use("/teamSeasons", teamSeasonRouter);
// team routes
router.use("/team",teamRouter);
//router.use("/team", teamRoute);
// player routes
router.use("/player", playerRouter);
router.use("/playermatch",playerMatchRouter);
router.use("/teammatch",teamMatchRouter);
export default router;
