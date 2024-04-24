import { Router } from "express";
import {
  getAllUsers,
  deleteUserById,
  getUsersById,
  createUser,
} from "../controllers/User.controllers.js";
import { verifyToken } from "../middlewares/Permission.middlewares.js";
const usersRouter = Router();
usersRouter.get("/", getAllUsers); // verifyToken
usersRouter.get("/:id", getUsersById);
usersRouter.delete("/:id", deleteUserById);
usersRouter.post("/", createUser);
export default usersRouter;
