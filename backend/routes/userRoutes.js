const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/sum', (req, res) => {
    const {a,b}=req.body;
    const sum=a+b;
    res.json({sum});
    // testing sum route worked

});
router.get('/health', (req, res) => {
    res.json({status: 'OK'});
    // testing health route worked
    console.log('Health check OK');

});
module.exports = router;