import { Router } from "express";
import {
  getAllUsers,
  deleteUserById,
} from "../controllers/User.controllers.js";
const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.delete("/:id", deleteUserById);
export default usersRouter;
