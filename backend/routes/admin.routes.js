const express = require('express');
const router = express.Router();
const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  createQuestion,
  getQuestionsBySubject,
  updateQuestion,
  deleteQuestion,
  createQuiz,
  getAllQuizzes,
  getQuizResults,
  exportQuizResults
} = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

// All admin routes are protected
router.use(authenticate, isAdmin);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Admin route working!', 
    user: req.user 
  });
});

// Subjects
router.post('/subjects', createSubject);
router.get('/subjects', getSubjects);
router.put('/subjects/:id', updateSubject);
router.delete('/subjects/:id', deleteSubject);

// Questions
router.post('/questions', createQuestion);
router.get('/questions/:subjectId', getQuestionsBySubject);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

// Quizzes
router.post('/quizzes', createQuiz);
router.get('/quizzes', getAllQuizzes);

// Results
router.get('/results/:quizId', getQuizResults);
router.get('/results/export/:quizId', exportQuizResults); // PDF/CSV export

module.exports = router;
