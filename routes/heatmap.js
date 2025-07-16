const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/:siteId', async (req, res) => {
    const bins = await Event.aggregate([
        { $match: { siteId: require('mongoose').Types.ObjectId(req.params.siteId), type: 'click' } },
        { $project: {
            binX: { $floor: { $divide: ["$x", 100] } },
            binY: { $floor: { $divide: ["$y", 100] } }
        }},
        { $group: {
            _id: { binX: "$binX", binY: "$binY" },
            count: { $sum: 1 }
        }}
    ]);
    res.json(bins);
});

module.exports = router;
