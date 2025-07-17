const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ required to serve static path

dotenv.config();

const siteRoutes = require('./routes/sites');
const eventRoutes = require('./routes/events');
const heatmapRoutes = require('./routes/heatmap');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve tracker.js and other static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/sites', siteRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/heatmap', heatmapRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
});
