const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateRollNumber = (rollNumber) => {
  return rollNumber.length >= 3;
};

const validateQuestionData = (data) => {
  const errors = [];
  
  if (!data.questionText || data.questionText.trim().length < 10) {
    errors.push('Question text must be at least 10 characters long');
  }
  
  if (!data.options || data.options.length < 2) {
    errors.push('Question must have at least 2 options');
  }
  
  if (!data.correctAnswer || data.correctAnswer.trim() === '') {
    errors.push('Correct answer is required');
  }
  
  if (!data.subject) {
    errors.push('Subject is required');
  }
  
  return errors;
};

const validateQuizData = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Quiz title must be at least 3 characters long');
  }
  
  if (!data.subject) {
    errors.push('Subject is required');
  }
  
  if (!data.questionBank || data.questionBank.length === 0) {
    errors.push('At least one question must be selected');
  }
  
  if (!data.duration || data.duration < 1) {
    errors.push('Duration must be at least 1 minute');
  }
  
  if (!data.totalMarks || data.totalMarks < 1) {
    errors.push('Total marks must be at least 1');
  }
  
  if (!data.scheduledAt) {
    errors.push('Scheduled date is required');
  }
  
  return errors;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRollNumber,
  validateQuestionData,
  validateQuizData
}; 