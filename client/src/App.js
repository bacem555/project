import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Register from './pages/Register'; 
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateBlog from './pages/CreateBlog';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreateBlog/>} />
      </Routes>
           </div>
  );
}

export default App;
