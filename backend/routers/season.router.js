import { Router } from "express";
import {
    getAllSeason,

  } from "../controllers/Season.controllers.js";
const seasonRouter = Router();

seasonRouter.get('/',getAllSeason);

export default seasonRouter;