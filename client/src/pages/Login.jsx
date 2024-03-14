import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext} from '../context/userContext';


function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandle = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:7000/website/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Login successful
        login(); // Update user authentication state
        // Navigate to the page with Navbar
        navigate('/home');
      } else {
        // Display error message from the server
        console.error('Login failed. Server response:', responseData);
        setErrorMessage(`Error: ${responseData.error}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred. Please try again.');
      
    }
  };

  return (
    <>
      <section className='heading'>
        <h1>Login Form</h1>
      </section>

      <section className='form'>
        <form onSubmit={loginHandle}>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
         <p>if you are not registered? <Link to='/register' style={{ color: '#0000FF' }}>Register Now</Link></p>
        
     </form>
      </section>
    </>
  );
}

export default Login;
