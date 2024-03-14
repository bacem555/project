// userControllers.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
   const savedUser=await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'email not found' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'password not found' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id,email, expiresIn: 3600 }); // 1 hour expiration time
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const logout = (req,res) => {
  res.cookie('token', '').json('account deleted');
};
const auth = (req, res) => {
  res.send(req.user);
};
/////get all user
const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    allUsers
      ? res.status(201).json(allUsers)
      : res.status(401).json({ msg: "getAll error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//edit user to bloking
const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true }
    );
    res.status(204).send(updateUser);
  } catch (error) {
    res.status(504).json({ msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  auth,
  updateUser,
  getAllUser,
};
