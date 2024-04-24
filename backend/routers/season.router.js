import { Router } from "express";
import { getAllSeason,getOneSeason,getSeasonById,createSeason,updateSeason,deleteSeason} from "../controllers/Season.controllers.js";
const seasonRouter = Router();
seasonRouter.get("/",getAllSeason);
seasonRouter.get("/:idSeason",getOneSeason);
seasonRouter.post("/",createSeason);
seasonRouter.put("/:idSeason",updateSeason);
seasonRouter.delete("/:id", deleteSeason);
export default seasonRouter;