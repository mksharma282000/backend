const mongoose = require('mongoose');
const SiteSchema = new mongoose.Schema({
    url: String,
    name: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Site', SiteSchema);
