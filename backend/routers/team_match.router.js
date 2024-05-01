import { getTeamMatchByIdMatch,addTeamMatch } from "../controllers/TeamMatch.controller.js"
import { Router } from "express";
const teamMatchRouter = Router();
teamMatchRouter.get("/:id",getTeamMatchByIdMatch)
teamMatchRouter.post("/",addTeamMatch)
export default teamMatchRouter