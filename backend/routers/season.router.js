import { Router } from "express";
import {
    getAllSeason,

  } from "../controllers/Season.controller.js";
const seasonRouter = Router();

seasonRouter.get('/',getAllSeason);

export default seasonRouter;