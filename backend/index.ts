import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
// Load environment variables from a .env file
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/config/database";
import errorHandler from "./src/middlewares/errorHandler";
// Importing routes
import routes from "./src/routes";
import path from "path";
import { verifySmtpConnection } from "./src/utils/emailUtils";
import EventEmitter from "events";

// Creating an Express application
const app = express();
app.use(cors());

// PORT
const PORT = process.env.PORT || 5151;

// Express and third-party Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});

// API routes
app.use("/api", routes);

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, Word!");
});

// Serve images from the "img" folder inside the "frontend/dashboard" folder
app.use(
  "/img",
  express.static(path.resolve(process.cwd(), "frontend", "dashboard", "img"))
);

// Serve static files for the dashboard and home
app.use(
  "/dashboard",
  express.static(path.resolve(process.cwd(), "frontend", "dashboard"))
);
app.use(express.static(path.resolve(process.cwd(), "frontend", "home")));

// Serve the React app for the dashboard route
app.get("/dashboard/*", (req, res) => {
  res.sendFile(
    path.resolve(process.cwd(), "frontend", "dashboard", "index.html")
  );
});

// Serve the React app for other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "frontend", "home", "index.html"));
});

async function main() {
  try {
    // Connecting to the database
    await connectDB();
    EventEmitter.defaultMaxListeners = 20;
    // Verify the SMTP connection
    // await verifySmtpConnection();

    // Starting the server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "An error occurred during application initialization:",
      error
    );
    process.exit(1);
  }
}

main();
