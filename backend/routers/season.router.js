import { Router } from "express";
import {
  createSeason,
  getAllSeason,
  getSeasonById,
  updateSeason,
  deleteSeason,
  getTeamInSeasonById,
  getSeasonByName,
  getName
} from "../controllers/Season.controllers.js";
import { verifyToken } from "../middlewares/Permission.middlewares.js";
const seasonRouter = Router();


seasonRouter.post('/', createSeason);
seasonRouter.post('/getName', getName);
seasonRouter.get('/', getAllSeason);
seasonRouter.get('/:id', getSeasonById);
seasonRouter.get('/findByNameSeason/:name', getSeasonByName);
seasonRouter.get('/newSeason/:id', getTeamInSeasonById);


seasonRouter.put('/:id', updateSeason);


seasonRouter.delete('/:id', deleteSeason);
export default seasonRouter;