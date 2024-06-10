import { Router } from "express";
import {getAllPlayersWithStatusZero ,updatePlayerStatus,
     getAllPlayer,createPlayer,getOnePlayer,getPlayerByIdTeam,
     updatePlayer,getEventsByMatch } from "../controllers/Player.controller.js"
//const playerRouter = Router();
//export default playerRouter;
//import { Router } from "express";
//import { getAllPlayer,createPlayer,getOnePlayer,getPlayerByIdTeam,updatePlayer,getEventsByMatch} from "../controllers/Player.controller.js";
import {checkTeam} from "../middlewares/Player.middlewares.js"
const playerRouter = Router();
playerRouter.get("/",getAllPlayer);
playerRouter.get("/:id",getOnePlayer);
playerRouter.post("/events/:id",getEventsByMatch)
playerRouter.put("/:id",updatePlayer);
playerRouter.post("/",checkTeam,createPlayer);
playerRouter.get('/team/:idTeam',getPlayerByIdTeam)
////
playerRouter.get("/statuszero/", getAllPlayersWithStatusZero);
playerRouter.patch("/updateStatus", updatePlayerStatus)
export default playerRouter;