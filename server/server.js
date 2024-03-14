const express = require('express');
const cors = require('cors');
const connectDb = require('./config/connectDb'); 
require('dotenv').config({ path:  './config/.env'});
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb();

// Serve static files (images)
app.use('/images', express.static('Public/images'));

// Routes
app.use('/website/auth', userRoutes); 
app.use('/website/blogs', blogRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
