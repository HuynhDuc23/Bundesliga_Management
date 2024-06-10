import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
} from "../controllers/Role.controllers.js";
const roleRouter = Router();

roleRouter.post("/", createRole);
roleRouter.get("/", getRoles);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
