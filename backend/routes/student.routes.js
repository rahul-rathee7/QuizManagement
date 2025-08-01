const express = require('express');
const router = express.Router();
const {
  getAvailableQuizzes,
  startQuiz,
  submitQuiz,
  getStudentResults
} = require('../controllers/studentController');
const authenticate = require('../middleware/authMiddleware');

// All student routes are protected
router.use(authenticate);

// Available quizzes
router.get('/quizzes', getAvailableQuizzes);

// Start quiz (fetch questions)
router.get('/quizzes/:quizId/start', startQuiz);

// Submit quiz
router.post('/quizzes/:quizId/submit', submitQuiz);

// View student results
router.get('/results', getStudentResults);

module.exports = router;
