import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    if (typeof email !== "string") {
      return res.status(400).json({ message: "Invalid email" });
    }

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("FULL PRISMA ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);
    console.error("META:", error.meta);

    next(error);
  }
};

export { registerUser };
