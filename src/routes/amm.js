const express = require('express');
const router = express.Router();
const { Provider, AMM, Sweep, MarketMaker } = require('sweepr-analytics');
const { networks, amms } = require('../utils/constants');

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
provider.setProvider("polygon", process.env.POLYGON_KEY);
provider.setProvider("bsc", process.env.BSC_KEY);

const amm = new AMM(provider);
const sweep = new Sweep(provider);
const market = new MarketMaker(provider);

router.get('/amm/', async (req, res) => {
    try {
        const response = {};
        const { grow } = req.query;
        const allDataPromises = networks.map(async (net) => {
            const ammAddress = amms[net]?.amm;
            if(!ammAddress) return { [net]: {} };

            const marketAddress = amms[net]?.market;
            let tokenId = [0];
            if(marketAddress) {
                tokenId = await market.getPositions(net, marketAddress, !!grow);
            }

            return { [net]: await amm.fetchData(net, ammAddress, tokenId) };
        });

        const pricesPromises = networks.map(async (net) => {
            return { [net]: await sweep.getPrice(net) };
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
        const marketAddress = amms[network]?.market;
        const { grow } = req.query;
        let tokenId = [0];
        if(!ammAddress) return { [net]: {} };

        if(marketAddress) {
            tokenId = await market.getPositions(network, marketAddress, !!grow);
        }
 
        const [priceResult, fetchDataResult] = await Promise.all([
            sweep.getPrice(network),
            amm.fetchData(network, ammAddress, tokenId)
        ]);

        res.json({ ...priceResult, ...fetchDataResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
