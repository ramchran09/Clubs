const User = require('../models/user');

// CREATE USER
exports.createUser = async (req, res) => {
  try {

    if (!req.body.name || !req.body.email|| !req.body.age) {
      return res.status(400).json({success:false, message: 'Name, email, and age are required' });
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
    console.log('User created:', user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//                            
// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
      
  }
};