import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "yourSecretKey";

export const generateToken = (userId: string, email: string) => {
  const accessToken = jwt.sign({ userId, email }, jwtSecret, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
