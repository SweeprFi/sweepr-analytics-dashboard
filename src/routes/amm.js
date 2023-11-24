const express = require('express');
const router = express.Router();
const { Provider, AMM, Sweep } = require('sweepr-analytics');
const { networks, amms } = require('../utils/constants');

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);

const amm = new AMM(provider);
const sweep = new Sweep(provider);

router.get('/amm/', async (req, res) => {
    try {
        const response = {};
        const allDataPromises = networks.map(async (net) => {
            const ammAddress = amms[net]?.amm;
            const tokenId = amms[net]?.tokenId || 0;
            return { [net]: await amm.fetchData(net, ammAddress, tokenId) };
        });

        const pricesPromises = networks.map(async (net) => {
            const id = amms[net].poolId;
            const token = amms[net].stableCoin;
            return { [net]: await sweep.getPrice(net, id, token) };
        });

        const allDataResults = await Promise.all(allDataPromises);
        const pricesResults = await Promise.all(pricesPromises);

        allDataResults.forEach((result, index) => {
            const net = Object.keys(result)[0];
            response[net] = { ...result[net], ...pricesResults[index][net] };
        });

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/amm/:network', async (req, res) => {
    try {
        const network = req.params.network;

        const ammAddress = amms[network]?.amm;
        const tokenId = amms[network]?.tokenId || 0;
        const id = amms[network].poolId;
        const token = amms[network].stableCoin;
 
        const [priceResult, fetchDataResult] = await Promise.all([
            sweep.getPrice(network, id, token),
            amm.fetchData(network, ammAddress, tokenId)
        ]);

        res.json({ ...priceResult, ...fetchDataResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
