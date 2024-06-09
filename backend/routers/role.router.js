import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
} from "../controllers/Role.controllers.js";

import { verifyToken, verifyTokenWithAdmin, verifyTokenAdminAuth } from "../middlewares/Permission.middlewares.js";
const roleRouter = Router();

roleRouter.post("/", verifyToken, verifyTokenWithAdmin, createRole);
roleRouter.get("/", verifyToken, verifyTokenWithAdmin, getRoles);
roleRouter.delete("/:id", verifyToken, verifyTokenWithAdmin, deleteRole);

export default roleRouter;
