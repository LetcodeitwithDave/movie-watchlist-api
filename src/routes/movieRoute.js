import express from "express";
import {
  getMovies,
  getMovieById,
  createmovie,
} from "../controllers/movieController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// ROUTES

router.post("/", createmovie);
router.get("/", getMovies);

router.get("/:id", getMovieById);

// router.delete("/movie/:id", deleteMovie);

export default router;
