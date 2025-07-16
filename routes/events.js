const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.json({ success: true });
});

module.exports = router;
