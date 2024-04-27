import { Router } from "express";
import {createPlayerMatch,getDetailPlayerMatch} from "../controllers/PlayerMacth.controller.js"
const playerMatchRouter = Router();
playerMatchRouter.get("/:id",getDetailPlayerMatch)
playerMatchRouter.post("/",createPlayerMatch)
export default playerMatchRouter
