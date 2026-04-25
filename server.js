// import dotenv from 'dotenv'
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./src/config/db.js";
import app from "./src/app.js";

config(); // load .env file globally
connectDB(); // connect to database

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// measures inplace to prevent data loss when code breaks:
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
