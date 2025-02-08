const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const List = require('../models/List');
const User = require('../models/User');
const router = express.Router();

const upload =  multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter(req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
        return cb(new Error('Invalid file type. Only CSV, XLSX, and XLS are allowed.'));
      }
      cb(null, true);
    },
  });

  router.post('/upload-csv', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
  
    // Get the list of agents
    const agents = await User.find({ role: 'agent' });
    if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });
  
    let entries = [];
  
    // Parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Validate the CSV data (FirstName, Phone, Notes)
        if (!row.FirstName || !row.Phone || !row.Notes) {
          return res.status(400).json({ message: 'CSV file is not in the correct format. Missing fields.' });
        }
        entries.push(row);
      })
      .on('end', async () => {
        // Calculate chunk size based on the number of agents
        const chunkSize = Math.ceil(entries.length / agents.length);
        let index = 0;
  
        // Distribute the items among agents
        for (const agent of agents) {
          const assignedData = entries.splice(0, chunkSize);
          for (const item of assignedData) {
            await List.create({ agentId: agent._id, ...item }); // Save to MongoDB
          }
        }
  
        // Remove the uploaded file from the server
        fs.unlinkSync(filePath);
  
        // Return success response
        res.json({ message: 'List distributed successfully' });
      })
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error processing CSV file' });
      });
  });

router.get('/count/:token', async (req, res) => {
    const token = req.params.token;
    if (!token) return res.status(400).json({ message: 'Token is required' });
    const decodeToken=jwt.decode(token,process.env.JWT_SECRET);

    const newAgent = await  List.find({agentId: decodeToken.id});
    res.json({ count:newAgent.length });
});

module.exports = router;
