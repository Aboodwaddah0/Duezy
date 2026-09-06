import { Router } from "express";
import { create, getById, list, remove, update, } from "./subscription.controller.js";
const subscriptionRouter = Router();
subscriptionRouter.post("/:userId", create);
subscriptionRouter.get("/:userId", list);
subscriptionRouter.get("/:userId/:subscriptionId", getById);
subscriptionRouter.patch("/:userId/:subscriptionId", update);
subscriptionRouter.delete("/:userId/:subscriptionId", remove);
export default subscriptionRouter;
