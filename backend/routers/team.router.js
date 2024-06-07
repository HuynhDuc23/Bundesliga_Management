import { Router } from "express";
import {getTeamById} from "../controllers/Team.controller.js"
const teamRouter = Router();
teamRouter.post('/:id',getTeamById);

export default teamRouter;