const express = require("express");
const Site = require("../models/Site");
const router = express.Router();

// ✅ Get all sites
router.get('/', async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new site
router.post("/", async (req, res) => {
  const site = new Site(req.body);
  await site.save();
  res.json(site);
});

// Get site by ID
router.get('/:siteId', async (req, res) => {
  try {
    const site = await Site.findById(req.params.siteId);
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get site by domain
router.get("/domain/:domain", async (req, res) => {
  try {
    let domain = req.params.domain;

    // Normalize the domain
    domain = domain.replace(/^https?:\/\//, "").split(":")[0];
    domain = domain.replace(/^www\./, "");

    const site = await Site.findOne({ url: domain });

    if (!site) {
      return res
        .status(404)
        .json({ message: "Site not found for domain: " + domain });
    }

    res.json({ siteId: site._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
