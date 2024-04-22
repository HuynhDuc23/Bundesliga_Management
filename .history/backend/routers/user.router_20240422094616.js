import { Router } from "express";
import { getAllUsers } from "../controllers/User.controllers.js";
const usersRouter = Router();
usersRouter.get("/,getAllUsers");
export default usersRouter;
