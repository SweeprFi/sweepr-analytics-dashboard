const express = require('express');
const router = express.Router();

const { networks } = require("../utils/constants");
const { Provider, Sweepr } = require("sweepr-analytics");

const provider = new Provider();
const sweepr = new Sweepr(provider);

router.get('/sweepr', async (req, res) => {
    try {
        const response = {};
        const resposnses = await Promise.all(networks.map(async (net) => {
            return { [`${net}`]: await sweepr.fetchData(net) };
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

router.get('/sweepr/:network', async (req, res) => {
    try {
        const response = await sweepr.fetchData(req.params.network);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweepr-allowance', async (req, res) => {
    try {
        const { network, owner, spender } = req.query;
        const response = await sweepr.getAllowance(network, owner, spender);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/sweepr-balance', async (req, res) => {
    try {
        const { network, account } = req.query;
        const response = await sweepr.getBalance(network, account);
        res.json({ response });
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
