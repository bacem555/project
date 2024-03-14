import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // State variables to track username, email, and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the registration form submission
  const registerHandle = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!username || !email || !password) {
      return alert('Please fill in all fields.');
    }

    // Prepare data for the registration request
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      // Make a request to the server to check if the username or email already exists
      const response = await fetch("http://localhost:7000/website/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Parse the response JSON
      const responseData = await response.json();

      if (response.ok) {
        // Registration successful
        alert('Registration is successful');
        // Navigate to the login page
        navigate('/login');
      } else {
        // Display error message from the server
        alert(`Error: ${responseData.error}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* Registration form sections */}
      <section className='heading'>
        <h1>Register Form</h1>
      </section>

      <section className='form'>
        {/* Registration form */}
        <form onSubmit={registerHandle}>
          {/* Username input */}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='username'
              value={username}
              placeholder='Enter your name'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>

          
          <p>Already registered? <Link to='/login' style={{ color: '#FF0000' }}>Login Now</Link></p>
        </form>
      </section>
    </>
  );
}

export default Register;
