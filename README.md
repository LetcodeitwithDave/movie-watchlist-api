# Movie Watchlist API

A RESTful backend API for managing a personal movie watchlist. Users can register, log in, browse movies, and manage a personal watchlist with custom status, ratings, and notes.

## Live API

Base URL: `https://movie-watchlist-api-3oct.onrender.com`

## Repository

Repo url: `https://github.com/LetcodeitwithDave/movie-watchlist-api.git`

## Features

* User registration and login
* JWT-based authentication
* Protected routes with Bearer token authorization
* Browse all movies
* Fetch a single movie by ID
* Create movies
* Seeded movie catalog for testing
* Add movies to personal watchlist
* View all watchlist items
* Update watchlist item status, rating, and notes
* Remove movies from watchlist

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM (Prisma 7)
* JWT Authentication
* bcryptjs
* Bruno (API testing)
* Render (API hosting)
* Neon (PostgreSQL hosting)

## Project Structure

```bash
src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Auth middleware
├── routes/         # API route definitions
└── utils/          # Utility helpers
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/LetcodeitwithDave/movie-watchlist-api.git
cd movie-watchlist-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=your_database_url
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Seed movie data

```bash
npm run seed:movies
```

### 6. Start development server

```bash
npm run dev
```

## Authentication

This API uses JWT Bearer Token authentication.

Protected routes require an `Authorization` header:

```http
Authorization: Bearer <your_token>
```

## API Endpoints

### Auth Routes

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | Log in a user       |

---

### Movie Routes

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/v1/movies`          | Get all movies               |
| GET    | `/api/v1/movies?limit=5`  | Get limited number of movies |
| GET    | `/api/v1/movies/:movieId` | Get a single movie           |
| POST   | `/api/v1/movies`          | Create a movie               |

---

### Watchlist Routes (Protected)

> Requires Bearer Token in Header

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| POST   | `/api/v1/watchlist`          | Add movie to watchlist      |
| GET    | `/api/v1/watchlist`          | Get all watchlist items     |
| PUT    | `/api/v1/watchlist`          | Update watchlist item       |
| DELETE | `/api/v1/watchlist/:movieId` | Remove movie from watchlist |

## Example Request Headers

```http
Content-Type: application/json
Authorization: Bearer <your_token>
```

## Seeded Data

The project includes seeded movie data for testing and development.

To populate the database with sample movies:

```bash
npm run seed:movies
```

This is included intentionally for local development, testing, and demonstration.

## Deployment

* API hosted on Render
* PostgreSQL hosted on Neon

Production Base URL:

`https://movie-watchlist-api-3oct.onrender.com`

## Notes

* Watchlist routes are user-specific and require authentication
* A user cannot add the same movie to their watchlist twice
* Movies are shared records across users
* Watchlist items are personal user-movie relationships

## Future Improvements

* Pagination
* Search and filtering
* Movie reviews
* Favorites
* External movie API integration
* Rate limiting
* Centralized error handling
