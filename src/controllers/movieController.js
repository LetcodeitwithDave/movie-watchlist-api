import { prisma } from "../config/db.js";

const createmovie = async (req, res) => {
  try {
    const {
      title,
      overview,
      releaseYear,
      rating,
      genres,
      posterUrl,
      createdBy,
    } = req.body;

    // console.log("req.body", req.body);

    // validate input
    if (!title || !releaseYear || !genres || !createdBy) {
      return res.status(400).json({
        status: "error",
        message: "title, releaseYear, genres and createdBy are required",
      });
    }

    const movieExists = await prisma.movie.findFirst({
      where: { title },
    });

    if (movieExists) {
      return res.status(400).json({
        status: "error",
        message: "Movie with this title already exists",
      });
    }

    // create movie
    const newMovie = await prisma.movie.create({
      data: {
        title,
        overview,
        releaseYear,
        rating,
        genres: genres || [],
        posterUrl,
        createdBy,
      },
    });

    return res.status(201).json({
      status: "success",
      data: newMovie,
    });
  } catch (error) {
    // console.error("Error creating movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all movies with optional limit query param
const getMovies = async (req, res) => {
  const limit = parseInt(req.query.limit);

  //   console.log("limit", limit);
  const movies = await prisma.movie.findMany();

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json({
      status: "success",
      data: movies.slice(0, limit),
    });
  }

  return res.status(200).json({
    status: "success",
    data: movies,
  });
};

// single item
const getMovieById = async (req, res) => {
  const id = req.params.id;

  //   console.log("id", id);

  const filterData = await prisma.movie.findUnique({
    where: { id },
  });

  if (!filterData) {
    return res.status(404).json({
      status: "error",
      message: "Movie not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: filterData,
  });
};

export { createmovie, getMovies, getMovieById };
