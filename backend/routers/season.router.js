import { Router } from "express";
import { createSeason,getAllSeason,updateSeason} from "../controllers/Season.controller.js"
const seasonRouter = Router();
seasonRouter.post("/",createSeason)
seasonRouter.get("/",getAllSeason)
export default seasonRouter;