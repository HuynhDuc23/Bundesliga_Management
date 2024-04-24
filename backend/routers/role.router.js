import { Router } from "express";
import { createRole, getRoles } from "../controllers/Role.controllers.js";
const roleRouter = Router();

roleRouter.post("/", createRole);
roleRouter.get("/", getRoles);
export default roleRouter;
