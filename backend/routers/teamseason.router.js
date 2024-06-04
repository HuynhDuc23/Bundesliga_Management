import { Router } from "express";
import {
    createTeamSeason,
  } from "../controllers/TeamSeason.controller.js";
const teamSeasonRouter = Router();
teamSeasonRouter.post('/',createTeamSeason);
export default teamSeasonRouter;