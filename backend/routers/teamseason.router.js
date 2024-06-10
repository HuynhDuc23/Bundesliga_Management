import { Router } from "express";
import { getAllTeamSeason,createTeamSeason} from "../controllers/Teamseason.controller.js";
const teamSeasonRouter = Router();
teamSeasonRouter.get("/",getAllTeamSeason);
teamSeasonRouter.post("/",createTeamSeason);
export default teamSeasonRouter;