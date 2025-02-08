const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const List = require('../models/List');
const User = require('../models/User');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only CSV, XLSX, or XLS files are allowed'), false);
        }
        cb(null, true);
    }
});

router.post('/upload-csv/:token', upload.single('file'), async (req, res) => {
    // console.log(req.params.token);
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

         const agentId = req.params.token;
            const decodedId =jwt.decode(agentId,process.env.JWT_SECRET);
            console.log(decodedId);

        const agents = await Agent.find({ adminId:decodedId.id}).limit(5);

        // if (agents.length < 5) return res.status(400).json({ message: 'At least 5 agents are required' });rs

        const filePath = req.file.path;
        let entries = [];

        if (req.file.mimetype === 'text/csv') {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row) => {
                    if (!row.FirstName || !row.Phone || !row.Notes) {
                        return res.status(400).json({ message: 'Invalid CSV format. Required columns: FirstName, Phone, Notes' });
                    }
                    entries.push(row);
                })
                .on('end', () => distributeTasks(entries, agents, res,decode));
        } else {
            const workbook = xlsx.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            entries = xlsx.utils.sheet_to_json(sheet);

            if (!entries.every(row => row.FirstName && row.Phone && row.Notes)) {
                return res.status(400).json({ message: 'Invalid Excel format. Required columns: FirstName, Phone, Notes' });
            }

            distributeTasks(entries, agents, res);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

async function distributeTasks(entries, agents, res,adminId) {
    try {
        const chunkSize = Math.floor(entries.length / 5);
        let remainder = entries.length % 5;
        let index = 0;

        for (const agent of agents) {
            const assignedTasks = entries.splice(0, chunkSize + (remainder > 0 ? 1 : 0));
            remainder--;

            console.log(assignedTasks)
            for (const item of assignedTasks) {
                console.log(item)
                await List.create({ agentId: agent._id, firstname:item.FirstName,phone:item.Phone,notes:item.Notes,adminId:adminId});
            }
        }

        res.json({ message: 'List distributed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error distributing tasks', error: error.message });
    }
}

router.get('/count/:token', async (req, res) => {
    const agentId = req.params.token;
            const decodedId =jwt.decode(agentId,process.env.JWT_SECRET);
            console.log(decodedId);
    const newAgent = await  List.find({adminId: decodedId.id});
    res.json({ count:newAgent.length });
});

router.get('/list-of-current-agent/:id', async (req, res) => {
    const id=req.params.id;
    console.log(id)
    const newAgent = await  List.find({
        agentId:id
    }).populate("agentId");
    console.log(newAgent)
    res.json({ count:newAgent });
});

module.exports = router;
