import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/userContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Use the correct function name from the context
    navigate('/login'); // Navigate to the login/register page
  };

  const handleLogoClick = () => {
    // Navigate to /home only if the user is authenticated
    if (isAuthenticated) {
      navigate('/home');
    }
  };

  return (
    <header>
      <div className='logo' onClick={handleLogoClick}>
        <Link to='/'>BLOGUI</Link>
      </div>
      
      {isAuthenticated ? (
        <>
        <nav className='nav-center'>
        <Link to='/home'>Home</Link>
        <Link to='/create'>Create blog</Link>
      <Link to='/contact'>Contact</Link>
      <div className='search-container'>

        <input type='text' className='search-input' placeholder='Search' />
      </div>
    
         </nav>
        <div className='nav-right'>
          <Link to='/profile'>My profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
        </>
      ) : (
        <div className='nav-right'>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
