const express = require('express');
const router = express.Router();
const { Sweep, Asset, Provider } = require("sweepr-analytics");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
provider.setProvider("polygon", process.env.POLYGON_KEY);
provider.setProvider("bsc", process.env.BSC_KEY);

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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
