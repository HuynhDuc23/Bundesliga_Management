import { Router } from "express";
import {
  getAllMatches,
  getMatchById,
  // createMatch,
  getTeamInSeasonById,
  updateMatch,
  deleteMatch,
} from "../controllers/Match.controllers.js";
// import { verifyToken } from "../middlewares/Permission.middlewares.js";

const matchRouter = Router();

matchRouter.get("/:id",getTeamInSeasonById);
matchRouter.get("/",getAllMatches);
// matchRouter.get("/:id", getMatchById);
// matchRouter.post("/", createMatch);
matchRouter.put("/:id", updateMatch);
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
