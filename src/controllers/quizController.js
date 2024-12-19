import Quiz from "../models/quizModel.js";

// Add a new quiz
export async function addQuiz(req, res) {
  try {
    // Create a new quiz with the request body data
    const newQuiz = new Quiz(req.body);

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    // Respond with the saved quiz
    res.status(201).json(savedQuiz);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
}

// Get all quizzes
export async function getQuizzes(req, res) {
  try {
    // Retrieve all quizzes from the database
    const quizzes = await Quiz.find(); // Correct method usage

    // Respond with the quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
}

// Submit quiz answers, calculate score, and add to leaderboard
export async function submitQuiz(req, res) {
  const { user, score } = req.body; // Include 'user' in the request body
  const { id } = req.params;
  console.log('Quiz ID:', id);
  console.log(`User: ${user}, Score: ${score}`);
  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(id);
    // If the quiz is not found, return an error
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Add the user's score to the leaderboard
    quiz.scores.push({ user, score });
    await quiz.save();

    // Return the score and the total number of questions
    res.status(200).json({ score : quiz.scores.score, total: quiz.questions.length, message: "Score submitted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: error.message });
  }
}

// Get leaderboard for a specific quiz
export async function getLeaderboard(req, res) {
  try {
    const id = req.params; // Get quiz ID from the route params
    
    // Find the quiz by its ID
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Sort leaderboard by highest score first
    const leaderboard = quiz.scores.sort((a, b) => b.score - a.score);

    // Return the leaderboard
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
}