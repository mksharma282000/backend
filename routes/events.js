const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Save a new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get raw events by siteId
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ siteId: req.query.siteId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
