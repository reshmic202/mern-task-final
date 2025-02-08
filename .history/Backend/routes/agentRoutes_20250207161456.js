const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/add-agent', async (req, res) => {
    const { name, email, mobile, password, token } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const decodedId =jwt.decode(token,process.env.JWT_SECRET);
    const newAgent = new Agent({ name, email, mobile, password: hashedPassword, agentId: });
    await newAgent.save();
    res.status(201).json({ message: 'Agent added successfully' });
});
router.get('/count/:id', async (req, res) => {
    const agentId = req.params.id;
    const decodedId =jwt.decode(agentId,process.env.JWT_SECRET);
    const newAgent = await  Agent.find({agentId: decodedId.id});
    res.json({ count:newAgent.length });
});
router.get('/:id', async (req, res) => {
    const agentId = req.params.id;
    const decodedId =jwt.decode(agentId,process.env.JWT_SECRET);
    const newAgent = await  Agent.find({agentId: decodedId.id});
    res.json({ newAgent });
});

module.exports = router;
