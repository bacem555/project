const Blog = require('../models/Blogs');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;

    // Call the createBlog controller function to handle blog creation
    const result = await new Blog({ title, description, imageUrl });

    // Save the blog to the database
    await result.save();

    // Send the result as a JSON response
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
};
