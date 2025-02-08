const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Agent = require('../models/Agent');
const router = express.Router();

router.post('/add-agent', async (req, res) => {
    const { name, email, mobile, password, agentId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, mobile, password: hashedPassword, agentId });
    await newAgent.save();
    res.status(201).json({ message: 'Agent added successfully' });
});
router.get('/count/:Id', async (req, res) => {
    const newAgent = await  User.find({role: 'agent'});
    res.json({ count:newAgent.length });
});
router.get('/', async (req, res) => {
    const newAgent = await  User.find({role: 'agent'});
    res.json({ newAgent });
});

module.exports = router;
