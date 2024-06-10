import { Router } from "express";
import {createTeam,getAllTeamJson,getPlayersInTeam} from "../controllers/Team.controller.js"
const teamRouter = Router();

teamRouter.post('/json',getAllTeamJson);
teamRouter.post('/',createTeam);

teamRouter.get('/:id/players',getPlayersInTeam);

export default teamRouter;