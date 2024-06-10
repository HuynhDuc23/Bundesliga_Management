import { Router } from "express";
import {createPlayerMatch,getDetails,getEditMatch,getEditEvent,checkConstraint,editPlayerMatch} from "../controllers/PlayerMacth.controller.js"
const playerMatchRouter = Router();
playerMatchRouter.get("/edit",getEditMatch)
playerMatchRouter.get("/editevent/:id",getEditEvent)
playerMatchRouter.get("/:id",getDetails)
playerMatchRouter.post("/update/:id",checkConstraint,editPlayerMatch)
// playerMatchRouter.post("/",createPlayerMatch)
export default playerMatchRouter
