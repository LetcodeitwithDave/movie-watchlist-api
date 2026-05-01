import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    const userId = req.user.id;

    console.log("userId name", req.user.name);

    // validate input
    if (!movieId) {
      return res.status(400).json({
        status: "error",
        message: "movieId is required",
      });
    }

    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      return res.status(404).json({
        status: "error",
        message: "Movie not Found",
      });
    }

    const existingWatchlistItem = await prisma.watchlistItem.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    if (existingWatchlistItem) {
      return res.status(409).json({
        status: "error",
        message: "Movie already in watchlist",
      });
    }

    // add to watchlist
    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      status: "success",
      data: watchlistItem,
    });
  } catch (error) {
    console.error("Add to watchlist error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getWatchList = async (req, res) => {};

const removeFromWatchList = async (req, res) => {};

export { addToWatchList, getWatchList, removeFromWatchList };
