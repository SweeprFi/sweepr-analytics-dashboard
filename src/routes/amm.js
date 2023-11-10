const express = require('express');
const router = express.Router();
const { Provider, Uniswap } = require('sweepr-analytics');
const { networks, addresses } = require('../utils/constants');

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);

const uniswap = new Uniswap(provider);

router.get('/uniswap/', async (req, res) => {
    try {
        const response = {};
        const resposnses = await Promise.all(networks.map(async (net) => {
            const liquidityHelper = addresses[net].liquidityHelper;
            const uniswapAsset = addresses[net].uniswapAsset;
            const uniswapPool = addresses[net].uniswapPool;
            return { [`${net}`]: await uniswap.fetchData(net, uniswapAsset, liquidityHelper, uniswapPool) };
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

router.get('/uniswap/:network', async (req, res) => {
    try {
        const network = req.params.network;
        const liquidityHelper = addresses[network].liquidityHelper;
        const uniswapAsset = addresses[network].uniswapAsset;
        const uniswapPool = addresses[network].uniswapPool;

        const response = await uniswap.fetchData(network, uniswapAsset, liquidityHelper, uniswapPool);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
