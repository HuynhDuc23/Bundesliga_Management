import { Router } from "express";
import {
  getAllUsers,
  deleteUserById,
  getUsersById,
  createUser,
  updateUser,
} from "../controllers/User.controllers.js";
import { verifyToken, verifyTokenAdminAuth, verifyTokenWithAdmin } from "../middlewares/Permission.middlewares.js";
const usersRouter = Router();
usersRouter.get("/", verifyToken, getAllUsers); // verifyToken
usersRouter.get("/:id", verifyToken, getUsersById);
usersRouter.delete("/:id", verifyToken, verifyTokenAdminAuth, deleteUserById);
usersRouter.post("/", verifyToken, verifyTokenWithAdmin, createUser);
usersRouter.patch("/:id", updateUser);
export default usersRouter;
