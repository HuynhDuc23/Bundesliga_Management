import { Router } from "express";
import {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/Match.controllers.js";
// import { verifyToken } from "../middlewares/Permission.middlewares.js";

const matchRouter = Router();

matchRouter.get("/",getAllMatches);
matchRouter.post("/", createMatch);
matchRouter.get("/:id", getMatchById);
matchRouter.put("/:id", updateMatch);
matchRouter.delete("/:id", deleteMatch);

export default matchRouter;
