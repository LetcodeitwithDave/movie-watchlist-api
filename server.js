// import dotenv from 'dotenv'
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./src/config/db.js";

config(); // load .env file globally
connectDB();

import app from "./src/app.js";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g... database connections error)
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.log("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shuttiing down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Api designs
