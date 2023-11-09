const express = require('express');
const router = express.Router();

const { networks } = require("../utils/constants");
const { Provider, Sweep } = require("sweepr-analytics");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);

const sweep = new Sweep(provider);

router.get('/sweep', async (req, res) => {
    try {
        const response = {};
        const resposnses = await Promise.all(networks.map(async (net) => {
            return { [`${net}`]: await sweep.fetchData(net) };
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

router.get('/sweep/:network', async (req, res) => {
    try {
        const response = await sweep.fetchData(req.params.network);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweep-allowance', async (req, res) => {
    try {
        const { network, owner, spender } = req.query;
        const response = await sweep.getAllowance(network, owner, spender);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweep-balance', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweep.getBalance(network, account);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweep-minters', async (req, res) => {
    try {
        const { network } = req.query;
        const response = await sweep.getMinters(network);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweep-minter', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweep.getMinter(network, account);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweep-valid-minter', async (req, res) => {
    try {
        const { network, minter } = req.query;
        const response = await sweep.validMinter(network, minter);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
