import express from "express";
import authRoute from "./routes/authRoute.js";
import { getCurrenUser } from "./routes/getCurrentUser.js";
import { protectRoute } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/currentuser", protectRoute, getCurrenUser);

export default app;
