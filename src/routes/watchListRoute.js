import express from "express";
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
  updateWatchListItem,
} from "../controllers/watchListController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", addToWatchList);
router.get("/", getWatchList);
router.delete("/:movieId", removeFromWatchList);
router.put("/:movieId", updateWatchListItem);

export default router;
