const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
     agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        
});
module.exports = mongoose.model('Agent', AgentSchema);
