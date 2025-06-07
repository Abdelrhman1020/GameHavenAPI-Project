
import mongoose from "mongoose";
import supertest from "supertest";
import { app, server } from "../app.js";

jest.mock("../middleware/logger.middleware.js", () => (req, res, next) => next());
jest.mock("morgan", () => {
  return () => (req, res, next) => next();
});

export const request = supertest(app);

afterAll(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await mongoose.connection.close();
  server.close();
});