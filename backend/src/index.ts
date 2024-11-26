import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typedefs/typeDefs";
import resolvers from "./schema/resolvers/resolvers";
import { verifyToken } from "./auth/auth";
import { setupIHealthRoutes } from "./ihealth/ihealth";
// import fs from "fs";
// import https from "https";
import "./scheduler";

dotenv.config();

const startServer = async () => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(
    cors({
      origin: "*",
      credentials: true,
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

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      let user = null;

      if (token) {
        try {
          user = verifyToken(token.replace("Bearer ", ""));
        } catch (error) {
          console.warn("Invalid or expired token");
        }
      }
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  // Setup iHealth routes
  setupIHealthRoutes(app);

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript + MongoDB Server");
  });

  app.listen(port, () => {
    console.log(
      `[server]: Server is running at http://localhost:${port}${server.graphqlPath}`
    );
  });

  // app.listen(port, () => {
  //   console.log(
  //     `[server]: Server is running at http://localhost:${port}${server.graphqlPath}`
  //   );
  // });
};

startServer().catch((error) => {
  console.error("Server failed to start", error);
});
