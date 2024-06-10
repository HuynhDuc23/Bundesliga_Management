import { Router } from "express";
import {
  getAllMatches,
  getMatchByIdSS,
  rank,
  getRanking,
  getMatchById,
  updateMatch,
  deleteMatch,
} from "../controllers/Match.controllers.js";

const matchRouter = Router();

matchRouter.get("/",getAllMatches);
matchRouter.get("/rank",rank);
matchRouter.get("/rank/:id",getRanking);
matchRouter.get("/view/idseason/:id", getMatchByIdSS);
matchRouter.get("/view/idmatch/:id", getMatchById);
matchRouter.post("/update", updateMatch);
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
