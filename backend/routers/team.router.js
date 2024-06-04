import { Router } from "express";
import {createTeam,getAllTeamJson} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.post('/json',getAllTeamJson);

teamRouter.post('/',createTeam);
export default teamRouter;