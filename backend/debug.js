const mongoose = require('mongoose');
const User = require('./models/User');
const Subject = require('./models/Subject');
const Quiz = require('./models/Quiz');
const Result = require('./models/Result');
require('dotenv').config();

const debugDatabase = async () => {
  try {
    console.log('🔍 Debugging Database...');
    
    // Check users
    const users = await User.find().select('name email rollNumber role');
    console.log('\n👥 Users:', users.length);
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    // Check subjects
    const subjects = await Subject.find();
    console.log('\n📚 Subjects:', subjects.length);
    subjects.forEach(subject => {
      console.log(`   - ${subject.name}`);
    });

    // Check quizzes
    const quizzes = await Quiz.find().populate('subject');
    console.log('\n🧠 Quizzes:', quizzes.length);
    quizzes.forEach(quiz => {
      console.log(`   - ${quiz.title} (${quiz.subject?.name || 'No Subject'}) - ID: ${quiz._id}`);
    });

    // Check results
    const results = await Result.find().populate('quiz').populate('student');
    console.log('\n📊 Results:', results.length);
    results.forEach(result => {
      console.log(`   - Quiz: ${result.quiz?.title || 'Unknown'} - Student: ${result.student?.name || 'Unknown'} - Score: ${result.score}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

debugDatabase(); 