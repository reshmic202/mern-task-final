const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const List = require('../models/List');
const User = require('../models/User');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const agents = await User.find({ role: 'agent' });
    if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

    let entries = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => entries.push(row))
        .on('end', async () => {
            const chunkSize = Math.ceil(entries.length / agents.length);
            let index = 0;

            for (const agent of agents) {
                const assignedData = entries.splice(0, chunkSize);
                for (const item of assignedData) {
                    await List.create({ agentId: agent._id, ...item });
                }
            }
            res.json({ message: 'List distributed successfully' });
        });
});

router.get('/count/:token', async (req, res) => {
    const token = req.params.token;
    if (!token) return res.status(400).json({ message: 'Token is required' });
    const decodeToken=jwt.decode(token,process.env.JWT_SECRET);
    const newAgent = await  List.find({agentId: decodeToken.id});
    res.json({ newAgent.length });
});

module.exports = router;
