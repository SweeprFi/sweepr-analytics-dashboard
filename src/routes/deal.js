const express = require('express');
const router = express.Router();
const { Provider, DealNFT } = require('sweepr-analytics');

const provider = new Provider();
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
// provider.setProvider("mainnet", process.env.MAINNET_KEY);
// provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
// provider.setProvider("polygon", process.env.POLYGON_KEY);
// provider.setProvider("bsc", process.env.BSC_KEY);

const deal = new DealNFT(provider);
const NETWORK = "arbitrum";

router.get('/deal/:address', async (req, res) => {
    try {
        const response = {};
        const dealAddress = req.params.address;
        const { nextId } = await deal.getNextId(NETWORK, dealAddress);

        const promises = [];
        for (let index = 0; index < nextId; index++) {
            promises.push(deal.getClaimedData(NETWORK, dealAddress, index));
        }
        const data = await Promise.all(promises);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
