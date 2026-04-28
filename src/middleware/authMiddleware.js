import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded token", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export { protectRoute };
