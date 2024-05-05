import { Router } from "express";
import {
    createSeason,
    getAllSeason,
    getSeasonById,
    updateSeason,
    deleteSeason,
    getTeamInSeasonById
  } from "../controllers/Season.controllers.js";
const seasonRouter = Router();


seasonRouter.post('/',createSeason);
seasonRouter.get('/',getAllSeason);
seasonRouter.get('/:id',getSeasonById);
seasonRouter.get('/newSeason/:id',getTeamInSeasonById);
seasonRouter.put('/:id',updateSeason);
seasonRouter.delete('/:id',deleteSeason);
export default seasonRouter;