import { Router } from "express";
import {createPlayerMatch,getDetails,getEditMatch,getEditEvent,editPlayerMatch} from "../controllers/PlayerMacth.controller.js"
const playerMatchRouter = Router();
playerMatchRouter.get("/edit",getEditMatch)
playerMatchRouter.get("/editevent/:id",getEditEvent)
playerMatchRouter.get("/:id",getDetails)
playerMatchRouter.post("/update/:id",editPlayerMatch)
// playerMatchRouter.post("/",createPlayerMatch)
export default playerMatchRouter
