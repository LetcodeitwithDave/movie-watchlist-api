import { prisma } from "../config/db.js";

// add movie to watchlist
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

    const existingWatchlistItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
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

// get watchlist for user
const getWatchList = async (req, res) => {
  const moviesInWatchlist = await prisma.watchlistItem.findMany({
    where: { userId: req.user.id },
    include: {
      movie: true,
    },
  });

  // console.log(
  //   "movies in warchlist",
  //   moviesInWatchlist.length == 0
  //     ? "No movies found in watchlist"
  //     : moviesInWatchlist.map((item) => item.movie.title),
  // );

  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json({
      status: "success",
      data: moviesInWatchlist.slice(0, limit),
    });
  }

  return res.status(404).json({
    status: "error",
    data:
      moviesInWatchlist.length == 0
        ? "No movies found in watchlist"
        : moviesInWatchlist,
  });
};

// remove movie from watchlist
const removeFromWatchList = async (req, res) => {
  const { movieId } = req.params;

  const userId = req.user.id;

  const deletedItem = await prisma.watchlistItem.deleteMany({
    where: {
      userId,
      movieId,
    },
  });

  console.log("deleted item count", deletedItem);
  console.log("deleted item count", deletedItem.count);

  if (deletedItem.count === 0) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found in watchlist",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

// update watchlist item (status, rating, notes)

const updateWatchListItem = async (req, res) => {
  const { movieId } = req.params;
  const { status, rating, notes } = req.body;

  const userId = req.user.id;
  const updatedItem = await prisma.watchlistItem.updateMany({
    where: {
      userId,
      movieId,
    },
    data: {
      status,
      rating,
      notes,
    },
  });

  // console.log("updated item count", updatedItem);

  if (updatedItem.count === 0) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found in watchlist",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Watchlist item updated",
    data: updatedItem,
  });
};
export {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
  updateWatchListItem,
};
