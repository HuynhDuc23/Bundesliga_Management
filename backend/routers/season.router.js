import { Router } from "express";
import {
    createSeason,
    getAllSeason,
    getSeasonById
  } from "../controllers/Season.controllers.js";
const seasonRouter = Router();


seasonRouter.post('/',createSeason);
seasonRouter.get('/',getAllSeason);
seasonRouter.get('/:id',getSeasonById);
export default seasonRouter;