const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstname: String,
    phone: String,
    notes: String
});
module.exports = mongoose.model('List', ListSchema);
