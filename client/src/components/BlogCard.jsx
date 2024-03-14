import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="card my-3">
      <img src={blog.image} className="card-img-top" alt={blog.title} />
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.description}</p>
        {/* You can add additional details or buttons here */}
      </div>
    </div>
  );
};

export default BlogCard;
