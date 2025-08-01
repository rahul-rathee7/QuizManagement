const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questionBank: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  duration: Number,
  totalMarks: Number,
  scheduledAt: Date,
  randomize: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
