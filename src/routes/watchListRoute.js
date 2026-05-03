import express from "express";
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} from "../controllers/watchListController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", addToWatchList);
router.get("/", getWatchList);
router.delete("/:movieId", removeFromWatchList);

export default router;
