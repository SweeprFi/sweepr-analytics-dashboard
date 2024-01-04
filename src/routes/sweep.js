const express = require('express');
const router = express.Router();

const { networks, amms } = require("../utils/constants");
const { Provider, Sweep } = require("sweepr-analytics");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
provider.setProvider("polygon", process.env.POLYGON_KEY);
provider.setProvider("bsc", process.env.BSC_KEY);

const sweep = new Sweep(provider);

router.get('/sweep', async (req, res) => {
    try {
        const response = {};
        const allDataPromises = networks.map(async (net) => ({
            [net]: await sweep.fetchData(net)
        }));
        const allDataResults = await Promise.all(allDataPromises);

        allDataResults.forEach(result => {
            const net = Object.keys(result)[0];
            response[net] = { ...result[net] };
        });

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep/:network', async (req, res) => {
    try {
        const network = req.params.network;
        const response = await sweep.fetchData(network)

        res.json({ ...response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-allowance', async (req, res) => {
    try {
        const { network, owner, spender } = req.query;
        const response = await sweep.getAllowance(network, owner, spender);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-balance', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweep.getBalance(network, account);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-minters', async (req, res) => {
    try {
        const { network } = req.query;
        const response = await sweep.getMinters(network);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-minter', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweep.getMinter(network, account);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-valid-minter', async (req, res) => {
    try {
        const { network, minter } = req.query;
        const response = await sweep.validMinter(network, minter);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-total-supply', async (req, res) => {
    try {
        const { network } = req.query;
        const response = await sweep.getTotalSupply(network);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweep-prices', async (req, res) => {
    try {
        const { network } = req.query;
        const [ammPrice, twaPrice, targetPrice] = await Promise.all([
            sweep.getPrice(network),
            sweep.getTWAPrice(network),
            sweep.getTargetPrice(network)
        ]);

        res.json({ ...ammPrice, ...twaPrice, ...targetPrice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
