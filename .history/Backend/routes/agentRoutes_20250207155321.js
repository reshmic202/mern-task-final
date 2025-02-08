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
router.get('/count/:id', async (req, res) => {
    const agentId = req.params.id;
    const decodedId =
    const newAgent = await  Agent.find({agentId});
    res.json({ count:newAgent.length });
});
router.get('/:id', async (req, res) => {
    const agentId = req.params.id;
    const newAgent = await  Agent.find({agentId});
    res.json({ newAgent });
});

module.exports = router;
