import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const userTag = { id: userId };

  const token = jwt.sign(userTag, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  console.log("user token", token);

  return token;
};

export { generateToken };
