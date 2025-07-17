const express = require('express');
const Event = require('../models/Event');
const mongoose = require('mongoose');
const router = express.Router();

// Get binned heatmap data for a site
router.get('/:siteId', async (req, res) => {
  try {
    const bins = await Event.aggregate([
      {
        $match: {
          siteId: mongoose.Types.ObjectId(req.params.siteId),
          type: 'click',
        },
      },
      {
        $project: {
          binX: { $floor: { $divide: ['$x', 100] } },
          binY: { $floor: { $divide: ['$y', 100] } },
        },
      },
      {
        $group: {
          _id: { binX: '$binX', binY: '$binY' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(bins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
