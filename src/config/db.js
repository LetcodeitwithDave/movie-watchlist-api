import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// console log log data
const logData =
  process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"];

const prisma = new PrismaClient({
  log: logData,
  adapter, //prisma7 adapter required for postgres connection
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (error) {
    console.error(`Database connection error ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { connectDB, disconnectDB, prisma };
