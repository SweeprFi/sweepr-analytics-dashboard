const express = require('express');
const router = express.Router();
const { Provider, AMM } = require('sweepr-analytics');
const { networks, amms } = require('../utils/constants');

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);

const amm = new AMM(provider);

router.get('/amm/', async (req, res) => {
    try {
        const response = {};
        const resposnses = await Promise.all(networks.map(async (net) => {
            const ammAddress = amms[net].amm;
            const tokenId = amms[net].tokenId;
            return { [`${net}`]: await amm.fetchData(net, ammAddress, tokenId) };
        }));

        resposnses.forEach(resp => {
            const net = Object.keys(resp)[0];
            response[net] = resp[net];
        });

        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/amm/:network', async (req, res) => {
    try {
        const network = req.params.network;
        const ammAddress = amms[network].amm;
        const tokenId = amms[network].tokenId;

        const response = await amm.fetchData(network, ammAddress, tokenId);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
