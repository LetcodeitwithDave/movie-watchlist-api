import express from "express";
import { getCurrenUser } from "./routes/getCurrentUser.js";
import { protectRoute } from "./middleware/authMiddleware.js";
import authRoute from "./routes/authRoute.js";
import moiveRoute from "./routes/movieRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movies", moiveRoute);

// testing protected route
app.use("/api/v1/currentuser", protectRoute, getCurrenUser);

export default app;
