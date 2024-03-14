const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.db);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDb;
