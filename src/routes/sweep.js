const express = require('express');
const router = express.Router();

const { networks, amms } = require("../utils/constants");
const { Provider, Sweep } = require("sweepr-analytics");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);

const sweep = new Sweep(provider);

router.get('/sweep', async (req, res) => {
    try {
        const response = {};
        const allDataPromises = networks.map(async (net) => ({
            [net]: await sweep.fetchData(net)
        }));

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

router.get('/sweep/:network', async (req, res) => {
    try {
        const network = req.params.network;
        const id = amms[network]?.poolId;
        const token = amms[network]?.stableCoin;

        const [response, price] = await Promise.all([
            sweep.fetchData(network),
            sweep.getPrice(network, id, token)
        ]);

        res.json({ ...response, ...price });
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

module.exports = router;
