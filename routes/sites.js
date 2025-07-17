const express = require("express");
const Site = require("../models/Site");
const router = express.Router();

// Add new site
router.post("/", async (req, res) => {
  const site = new Site(req.body);
  await site.save();
  res.json(site);
});

// Get all sites
router.get('/:siteId', async (req, res) => {
  try {
    const site = await Site.findById(req.params.siteId);
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Normalize domain and fetch site by domain
router.get("/domain/:domain", async (req, res) => {
  try {
    let domain = req.params.domain;

    // 🔧 Normalize the domain (strip protocol, port, etc.)
    domain = domain.replace(/^https?:\/\//, "").split(":")[0]; // remove http/https and port
    domain = domain.replace(/^www\./, ""); // remove www

    const site = await Site.findOne({ url: domain }); // ✅ fix this line

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
