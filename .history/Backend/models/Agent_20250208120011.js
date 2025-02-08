const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: {type:String, unique: true}
    password: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});
module.exports = mongoose.model('Agent', AgentSchema);
