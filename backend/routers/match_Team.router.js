import { Router } from "express";
import {
  getAllMatchTeams,
  getMatchTeamByIdTeam,
  createMatchTeam,
  getMatchTeamsByMatchId
//   updateMatch,
//   deleteMatch,
} from "../controllers/Match_Team.controllers.js";
// import { verifyToken } from "../middlewares/Permission.middlewares.js";

const matchTeamRouter = Router();

matchTeamRouter.get("/",getAllMatchTeams);
matchTeamRouter.get("/view/idmatch/:id", getMatchTeamsByMatchId);
matchTeamRouter.get("/:id", getMatchTeamByIdTeam);
matchTeamRouter.post("/add-match", createMatchTeam);
// matchTeamRouter.put("/:id", updateMatch);
// matchTeamRouter.delete("/:id", deleteMatch);

export default matchTeamRouter;
