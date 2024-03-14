import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the server and update state
    fetch('http://localhost:7000/website/blogs')
      .then((response) => response.json())
      .then((data) => {
        // Log blog image URLs for debugging
        console.log('Blog Image URLs:', data.map((blog) => blog.image));

        // Set blogs in the state
        setBlogs(data);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Latest Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4">
            {/* Pass the blog data to BlogCard */}
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
