import { Router } from "express";
import { getAllTeamSeason,createTeamSeason} from "../controllers/Teamseason.controllers.js";
const teamSeasonRouter = Router();
teamSeasonRouter.get("/",getAllTeamSeason);
teamSeasonRouter.post("/",createTeamSeason);
export default teamSeasonRouter;