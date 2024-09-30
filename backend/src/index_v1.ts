import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typedefs/typeDefs";
import resolvers from "./schema/resolvers/resolvers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
} else {
  console.error("MONGODB_URI is not defined in the .env file");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript + MongoDB Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
