import { Router } from "express";
import {getAllTeam,createTeam,updateTeam,getOneTeam,deleteTeamById} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.get('/',getAllTeam)
teamRouter.get('/:id',getOneTeam)
teamRouter.post('/',createTeam)
teamRouter.put('/:id',updateTeam)
teamRouter.delete('/:id',deleteTeamById)
export default teamRouter;

