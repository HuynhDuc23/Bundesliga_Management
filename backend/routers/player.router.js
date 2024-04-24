import { Router } from "express";
import { getAllPlayer,createPlayer,getOnePlayer,getPlayerByIdTeam,updatePlayer} from "../controllers/Player.controller.js";
const playerRouter = Router();
playerRouter.get("/",getAllPlayer);
playerRouter.get("/:id",getOnePlayer);
playerRouter.put("/:id",updatePlayer);
playerRouter.post("/",createPlayer);
playerRouter.get('/team/:idTeam',getPlayerByIdTeam)
export default playerRouter;