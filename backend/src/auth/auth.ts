import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "yourSecretKey";

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, jwtSecret, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
