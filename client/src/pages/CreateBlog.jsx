import React, { useState } from 'react';


const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
  
      const response = await fetch('http://localhost:7000/website/blogs/create', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response status is in the range 200-299
      if (response.ok) {
        const responseData = await response.json();
        // Handle the server response as needed
        console.log(responseData);
        // Reset the form after successful submission
        setTitle('');
        setDescription('');
        setImage(null);
      } else {
        // Handle the error response
        const errorData = await response.json();
        console.error('Error submitting blog:', errorData);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting blog:', error);
    }
  };
  
  
  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
