import { Router } from "express";
import {
  addQuiz,
  getQuizzes,
  submitQuiz,
  getLeaderboard,
} from "../controllers/quizController.js";

const router = Router();

// Quiz management
router.post("/", addQuiz); // Add a new quiz
router.get("/", getQuizzes); // Get all quizzes

// Quiz logic
router.post("/:id/submit", submitQuiz); // Submit answers and calculate score

// Leaderboard for a specific quiz
router.get("/:id/leaderboard", getLeaderboard); // Get the leaderboard for a specific quiz

export default router;