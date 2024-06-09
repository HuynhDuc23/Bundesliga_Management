import { Router } from "express";
import {getTeamById,getTeamInSeasonById} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.get('/:id',getTeamInSeasonById);
teamRouter.get('/view/idteam/:id',getTeamById);

export default teamRouter;