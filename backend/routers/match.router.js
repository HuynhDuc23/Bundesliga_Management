import { Router } from "express";
import {
  getAllMatches,
  getMatchByIdSS,
  getMatchById,
  getTeamInSeasonById,
  updateMatch,
  deleteMatch,
} from "../controllers/Match.controllers.js";
// import { verifyToken } from "../middlewares/Permission.middlewares.js";

const matchRouter = Router();

matchRouter.get("/:id",getTeamInSeasonById);
matchRouter.get("/",getAllMatches);
matchRouter.post("/BySeason/:id", getMatchByIdSS);
matchRouter.post("/:id", getMatchById);
matchRouter.put("/:id", updateMatch);
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
