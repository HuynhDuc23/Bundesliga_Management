import { Router } from "express";
import {getAllTeam,createTeam,updateTeam,getOneTeam,deleteTeamById,getTeamsByName} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.get('/',getAllTeam)
teamRouter.get('/search',getTeamsByName)
teamRouter.get('/:id',getOneTeam)
teamRouter.post('/',createTeam)
teamRouter.put('/:id',updateTeam)
teamRouter.delete('/:id',deleteTeamById)
export default teamRouter;

