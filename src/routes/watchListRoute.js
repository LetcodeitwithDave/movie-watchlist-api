import express from "express";
import {
  addToWatchList,
  getWatchList,
} from "../controllers/watchListController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", addToWatchList);
router.get("/", getWatchList);

export default router;
