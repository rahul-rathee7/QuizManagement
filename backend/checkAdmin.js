const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz_management_system');
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      console.log('✅ Admin user exists:');
      console.log(`   Name: ${admin.name}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Roll Number: ${admin.rollNumber}`);
      console.log(`   Role: ${admin.role}`);
    } else {
      console.log('❌ No admin user found');
      console.log('Run: node createAdmin.js to create admin user');
    }

    // Check total users
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users in database: ${totalUsers}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAdmin(); 