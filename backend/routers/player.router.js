import { Router } from "express";
import {getAllPlayersWithStatusZero ,updatePlayerStatus } from "../controllers/Player.controllers.js"
const playerRouter = Router();

playerRouter.get("/", getAllPlayersWithStatusZero);

playerRouter.patch("/updateStatus", updatePlayerStatus)


export default playerRouter;