const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const siteRoutes = require('./routes/sites');
const eventRoutes = require('./routes/events');
const heatmapRoutes = require('./routes/heatmap');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sites', siteRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/heatmap', heatmapRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
});
