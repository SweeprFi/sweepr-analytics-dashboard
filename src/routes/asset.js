const express = require('express');
const router = express.Router();
const { Sweep, Asset, Provider } = require("sweepr-analytics");

const provider = new Provider();
const sweep = new Sweep(provider);
const asset = new Asset(provider);

router.get('/asset', async (req, res) => {
    try {
        const { network, address } = req.query;

        const isValid = await sweep.validMinter(network, address);
        if (!isValid) throw new Error("Invalid asset");

        const response = await asset.fetchData(network, address);

        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
