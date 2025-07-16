const express = require('express');
const Site = require('../models/Site');
const router = express.Router();

router.post('/', async (req, res) => {
    const site = new Site(req.body);
    await site.save();
    res.json(site);
});

router.get('/', async (req, res) => {
    const sites = await Site.find();
    res.json(sites);
});

module.exports = router;
