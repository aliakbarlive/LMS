import "express-async-errors";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
// Load environment variables from a .env file
dotenv.config();
import morgan from "morgan";
import path from "path";
import cors from "cors";
import connectDB from "./src/config/database";
import errorHandler from "./src/middlewares/errorHandler";
// Importing routes
import routes from "./src/routes";
// Creating an Express application
const app = express();
app.use(cors());
// Express and third-party Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// Connecting to the database
connectDB();
// API routes
app.use("/api", routes);
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, Google!");
});
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "frontend", "admin"))
);
app.use(express.static(path.join(__dirname, "frontend", "client")));
// app.use(express.static(path.join(__dirname, "mainApp/build")));
app.get("dashboard/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend", "admin", "index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend", "client", "index.html"));
});
// PORT
const PORT = process.env.PORT || 5000;
//! Alert: Error Handler must in Last,Then it's worked
//* Custom Async Error handler Middleware *//
app.use(errorHandler);
// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
