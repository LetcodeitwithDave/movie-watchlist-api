import express from "express";
import { addToWatchList } from "../controllers/watchListController";

const router = express.Router();

router.post("/", addToWatchList);

export default router;
