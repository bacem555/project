// userRoutes.js

const express = require('express');
const { registerUser, loginUser, logout, auth, getAllUser, updateUser } = require('../controllers/userControllers');
// const verifyAuth = require('../middlewares/verifyAuth');
const router = express.Router();


// Register a new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);
// logout
router.post('/logout', logout);
router.get('/auth',auth)
router.get("/getAllUser", getAllUser);
///// update user
router.put("/updateUser/:_id", updateUser);



module.exports = router;
