import { Router } from "express";
import {getAllTeamJson,getPlayersInTeam,getAllTeam,createTeam,updateTeam,getOneTeam,deleteTeamById,getTeamsByName} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.post('/json',getAllTeamJson);
teamRouter.post('/',createTeam);
teamRouter.get('/:id/players',getPlayersInTeam);
//import {getAllTeam,createTeam,updateTeam,getOneTeam,deleteTeamById,getTeamsByName} from "../controllers/Team.controller.js"
teamRouter.get('/',getAllTeam)
teamRouter.get('/search',getTeamsByName)
teamRouter.get('/:id',getOneTeam)
teamRouter.put('/:id',updateTeam)
teamRouter.delete('/:id',deleteTeamById)
export default teamRouter;

