const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const Question = require('../models/Question');

exports.getAvailableQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().populate('subject');
  res.json(quizzes);
};

exports.startQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).populate('questionBank');
  let questions = quiz.questionBank.map(q => ({
    _id: q._id,
    questionText: q.questionText,
    options: q.options
  }));
  if (quiz.randomize) {
    questions = questions.sort(() => Math.random() - 0.5);
  }
  res.json({
    quizId: quiz._id,
    subject: quiz.subject,
    duration: quiz.duration,
    questions
  });
};

exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { answers, timeTaken } = req.body;
    const studentId = req.user.id;

    const quiz = await Quiz.findById(quizId).populate('questionBank');
    let score = 0;
    const processedAnswers = [];

    for (let ans of answers) {
      const question = quiz.questionBank.find(q => q._id.toString() === ans.questionId);
      const isCorrect = question.correctAnswer === ans.selectedAnswer;
      if (isCorrect) score++;

      processedAnswers.push({
        question: question._id,
        selectedAnswer: ans.selectedAnswer,
        isCorrect
      });
    }

    const result = await Result.create({
      quiz: quizId,
      student: studentId,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questionBank.length,
      timeTaken
    });

    res.json({ message: 'Quiz submitted successfully', result });

  } catch (err) {
    res.status(500).json({ message: 'Error submitting quiz', error: err.message });
  }
};

exports.getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
      .populate({
        path: 'quiz',
        populate: {
          path: 'subject',
          select: 'name'
        }
      });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
