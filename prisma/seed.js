import { prisma } from "../src/config/db.js";

const userId = "51025524-65ba-4c79-b9b5-c9440546611a";

const movies = [
  {
    title: "Interstellar",
    overview:
      "A team travels through a wormhole in search of a new home for humanity.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A skilled thief enters dreams to steal secrets and is offered a chance at redemption.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Action", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/the-dark-knight.jpg",
    createdBy: userId,
  },
  {
    title: "Dune",
    overview:
      "A young nobleman must survive on a desert planet and embrace his destiny.",
    releaseYear: 2021,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: 155,
    posterUrl: "https://example.com/dune.jpg",
    createdBy: userId,
  },
  {
    title: "Avengers: Endgame",
    overview:
      "The Avengers assemble one final time to undo the devastation caused by Thanos.",
    releaseYear: 2019,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 181,
    posterUrl: "https://example.com/avengers-endgame.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview:
      "A hacker discovers reality is a simulation and joins a rebellion against machines.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    posterUrl: "https://example.com/the-matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Gladiator",
    overview:
      "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama", "Adventure"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId,
  },
  {
    title: "Parasite",
    overview:
      "A poor family schemes to infiltrate the lives of a wealthy household.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    posterUrl: "https://example.com/parasite.jpg",
    createdBy: userId,
  },
  {
    title: "Whiplash",
    overview:
      "An ambitious drummer pushes himself to the limit under a ruthless music instructor.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runtime: 106,
    posterUrl: "https://example.com/whiplash.jpg",
    createdBy: userId,
  },
  {
    title: "Mad Max: Fury Road",
    overview:
      "In a post-apocalyptic wasteland, Max joins a rebel fleeing a tyrannical warlord.",
    releaseYear: 2015,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 120,
    posterUrl: "https://example.com/mad-max-fury-road.jpg",
    createdBy: userId,
  },
];

// loop through and create each to DB
const seedMovies = async (next) => {
  console.log("Seeding movies ....");

  try {
    for (const movie of movies) {
      await prisma.movie.create({
        data: movie,
      });
      console.log(`Movie created: ${movie.title}`);

      console.log("Seeding completed");
    }
  } catch (error) {
    console.error("Error seeding movies:", error);
    next(error);
  }
};
