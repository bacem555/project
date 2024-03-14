const express = require('express');
const multer = require('multer');
const { createBlog, getAllBlogs, deleteBlog, updateBlog } = require('../controllers/blogControllers');

const router = express.Router();

// Set up Multer storage for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST route for creating a new blog
router.post('/create', upload.single('image'), createBlog);

// GET route to get all blogs
router.get('/', getAllBlogs);

// DELETE route to delete a blog by ID
router.delete('/:id', deleteBlog);

// PUT route to update a blog by ID
router.put('/:id', updateBlog);

module.exports = router;
