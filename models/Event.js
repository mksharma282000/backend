const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    type: String,
    x: Number,
    y: Number,
    screen: {
        width: Number,
        height: Number
    },
    sessionId: String,
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Event', EventSchema);
