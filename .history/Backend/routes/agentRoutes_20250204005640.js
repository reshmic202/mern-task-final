const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/add-agent', async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new User({ name, email, mobile, password: hashedPassword, role: 'agent' });
    await newAgent.save();
    res.json({ message: 'Agent added successfully' });
});
router.get('/count', async (req, res) => {
    const newAgent = await  User.find({role: 'agent'});
    res.json({ count:newAgent.length });
});

module.exports = router;
