import { Router } from "express";
import {
    createSeason,
    getAllSeason,
    getSeasonById,
    updateSeason,
    deleteSeason
  } from "../controllers/Season.controllers.js";
const seasonRouter = Router();


seasonRouter.post('/',createSeason);
seasonRouter.get('/',getAllSeason);
seasonRouter.get('/:id',getSeasonById);
seasonRouter.put('/:id',updateSeason);
seasonRouter.delete('/:id',deleteSeason);
export default seasonRouter;