import { Router } from "express";
import { create, getById, list, remove, update, } from "./profile.controller.js";
const profileRouter = Router();
profileRouter.get("/", list);
profileRouter.post("/:userId", create);
profileRouter.get("/:userId", getById);
profileRouter.patch("/:userId", update);
profileRouter.delete("/:userId", remove);
export default profileRouter;
