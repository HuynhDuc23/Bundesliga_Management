import { Router } from "express";
import {
  getAllMatchTeams,
  getMatchTeamById,
  createMatchTeam,
//   updateMatch,
//   deleteMatch,
} from "../controllers/Match_Team.controllers.js";
// import { verifyToken } from "../middlewares/Permission.middlewares.js";

const matchTeamRouter = Router();

matchTeamRouter.get("/",getAllMatchTeams);
matchTeamRouter.get("/:id", getMatchTeamById);
matchTeamRouter.post("/add-match", createMatchTeam);
// matchTeamRouter.put("/:id", updateMatch);
// matchTeamRouter.delete("/:id", deleteMatch);

export default matchTeamRouter;
