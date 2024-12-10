import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import connectDB from "./config/db.js"; // Database connection
import quizRoutes from "./routes/quizRoutes.js"; // Quiz routes

// Initialize dotenv for environment variables
config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());                         // Enable CORS
app.use(bodyParser.json());              // Parse incoming JSON requests

// Connect to the database
connectDB();

// API routes
app.use("/quizzes", quizRoutes);         // Add routes for quizzes

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});