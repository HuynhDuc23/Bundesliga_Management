import { Router } from "express";
import { getAllUsers } from "../controllers/User.controllers";
const usersRouter = Router();
usersRouter.get("/,getAllUsers");
export default usersRouter;
