import { Router } from "express";
import {getAllTeam,createTeam} from "../controllers/Team.controller"
const teamRoute = Router();
teamRoute.get('/team',getAllTeam)
teamRoute.post('/team',createTeam)
export default teamRoute;

