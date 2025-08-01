const Subject = require('../models/Subject');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

// ----------- SUBJECT CONTROLLERS ------------

const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------- QUESTION CONTROLLERS ------------

const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getQuestionsBySubject = async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subjectId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------- QUIZ CONTROLLERS ------------

const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('subject');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------- RESULTS CONTROLLERS ------------

const getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    // Validate quizId format
    if (!quizId || quizId.length !== 24) {
      return res.status(400).json({ 
        error: 'Invalid quiz ID format' 
      });
    }

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ 
        error: 'Quiz not found' 
      });
    }

    // Get results for this quiz
    const results = await Result.find({ quiz: quizId })
      .populate('student', 'name rollNumber email')
      .populate({
        path: 'quiz',
        populate: {
          path: 'subject',
          select: 'name'
        }
      });

    res.json(results);
  } catch (err) {
    console.error('Error in getQuizResults:', err);
    res.status(500).json({ 
      error: 'Failed to fetch quiz results',
      details: err.message 
    });
  }
};

const exportQuizResults = async (req, res) => {
  try {
    const results = await Result.find({ quiz: req.params.quizId }).populate('user', 'name email');

    const doc = new PDFDocument();
    const stream = new Readable().wrap(doc);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=results.pdf');

    doc.fontSize(18).text('Quiz Results', { align: 'center' });
    doc.moveDown();

    results.forEach((r, idx) => {
      doc
        .fontSize(12)
        .text(`${idx + 1}. ${r.user.name} (${r.user.email}) - Score: ${r.score}/${r.total}`);
    });

    doc.end();
    stream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------- EXPORTING ALL CONTROLLERS ------------

module.exports = {
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
  exportQuizResults,
};
