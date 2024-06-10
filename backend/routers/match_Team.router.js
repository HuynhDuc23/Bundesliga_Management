import { Router } from "express";
import {
  getAllMatchTeams,
  getMatchTeamByIdTeam,
  createMatchTeam,
  getMatchTeamsByMatchId
} from "../controllers/Match_Team.controllers.js";
const matchTeamRouter = Router();
matchTeamRouter.get("/",getAllMatchTeams);
matchTeamRouter.get("/view/idmatch/:id", getMatchTeamsByMatchId);
matchTeamRouter.get("/:id", getMatchTeamByIdTeam);
matchTeamRouter.post("/add-match", createMatchTeam);
export default matchTeamRouter;
