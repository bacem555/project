// Import necessary dependencies
const mongoose = require('mongoose');

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  author: {
    type: String,
    
  },
  image:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);

// Export the Blog model
module.exports = Blog;
