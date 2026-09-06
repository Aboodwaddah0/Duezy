import express from "express";
import cors from "cors";
import errorHandler from "./middleware/error-handler.js";
import profileRouter from "./modules/profile/profile.routes.js";
import subscriptionRouter from "./modules/subscription/subscription.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profiles", profileRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.get("/api/health", (req, res) => {
  res.json({
    message: "Duezy API is running ",
  });
});

app.use(errorHandler);

export default app;