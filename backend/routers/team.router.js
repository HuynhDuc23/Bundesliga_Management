import { Router } from "express";
import {getAllTeam,createTeam,updateTeam,getOneTeam} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.get('/',getAllTeam)
teamRouter.get('/:id',getOneTeam)
teamRouter.post('/',createTeam)
teamRouter.put('/:id',updateTeam)
export default teamRouter;

