const express = require('express');
const Site = require('../models/Site');
const router = express.Router();

// Add new site
router.post('/', async (req, res) => {
    const site = new Site(req.body);
    await site.save();
    res.json(site);
});

// Get all sites
router.get('/', async (req, res) => {
    const sites = await Site.find();
    res.json(sites);
});

// 🔥 GET site by domain (needed by tracker.js)
router.get('/domain/:domain', async (req, res) => {
    try {
        const site = await Site.findOne({ domain: req.params.domain });
        if (!site) return res.status(404).json({ message: 'Site not found' });
        res.json(site);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
