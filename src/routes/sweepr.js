const express = require('express');
const router = express.Router();

const { networks } = require("../utils/constants");
const { Provider, Sweepr, Vesting } = require("sweepr-analytics");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
provider.setProvider("polygon", process.env.POLYGON_KEY);
provider.setProvider("bsc", process.env.BSC_KEY);

const sweepr = new Sweepr(provider);
const vesting = new Vesting(provider);

router.get('/sweepr', async (req, res) => {
    try {
        const allDataResults = await Promise.all(networks.map(async (net) => ({
            [net]: await sweepr.fetchData(net)
        })));

        const response = allDataResults.map(result => {
            const net = Object.keys(result)[0];
            return { ...result[net], network: net };
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweepr/:network', async (req, res) => {
    try {
        const response = await sweepr.fetchData(req.params.network);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweepr-allowance', async (req, res) => {
    try {
        const { network, owner, spender } = req.query;
        const response = await sweepr.getAllowance(network, owner, spender);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweepr-balance', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweepr.getBalance(network, account);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweepr-total-supply', async (req, res) => {
    try {
        const { network } = req.query;
        const response = await sweepr.getTotalSupply(network);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//required for Coinmarketcap and Coingecko
router.get('/sweeprtotal', async (req, res) => {
    try {
        const response = await sweepr.getTotalMinted("arbitrum");
        res.json(response.totalMinted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sweeprcirculating', async (req, res) => {
    try {
        const { totalMinted } = await sweepr.getTotalMinted("arbitrum");
        const { locked } = await vesting.lockedAmount("arbitrum", "0x483761F16A7c978df09d1e7E22532e9DbD2Ee8D0");
        res.json(totalMinted-locked);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
