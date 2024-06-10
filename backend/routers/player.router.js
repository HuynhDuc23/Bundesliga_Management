import { Router } from "express";
import { getAllPlayer,createPlayer,getOnePlayer,getPlayerByIdTeam,updatePlayer,getEventsByMatch} from "../controllers/Player.controller.js";
import {checkTeam} from "../middlewares/Player.middlewares.js"
const playerRouter = Router();
playerRouter.get("/",getAllPlayer);
playerRouter.get("/:id",getOnePlayer);
playerRouter.post("/events/:id",getEventsByMatch)
playerRouter.put("/:id",updatePlayer);
playerRouter.post("/",checkTeam,createPlayer);
playerRouter.get('/team/:idTeam',getPlayerByIdTeam)
export default playerRouter;