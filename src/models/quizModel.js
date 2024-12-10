import mongoose from "mongoose";

// Define the schema for the quiz
const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    scores: [
      {
        user: { type: String, required: true },
        score: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Create the quiz model based on the schema
const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;