const express = require('express');
const router = express.Router();
const { Sweep, Asset, Provider } = require("sweepr-analytics");
const { networks } = require("../utils/constants");

const provider = new Provider();
provider.setProvider("mainnet", process.env.MAINNET_KEY);
provider.setProvider("arbitrum", process.env.ARBITRUM_KEY);
provider.setProvider("optimism", process.env.OPTIMISTIC_KEY);
provider.setProvider("polygon", process.env.POLYGON_KEY);
provider.setProvider("bsc", process.env.BSC_KEY);

const sweep = new Sweep(provider);
const asset = new Asset(provider);

router.get('/asset', async (req, res) => {
    try {
        const { network, address } = req.query;

        const isValid = await sweep.validMinter(network, address);
        if (!isValid) throw new Error("Invalid asset");

        const response = await asset.fetchData(network, address);

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/assets/:network', async (req, res) => {
    try {
        const { network } = req.params;
        const { minters } = await sweep.getMinters(network);
        const promises = [];

        minters.forEach((minter) => {
            promises.push(fetchDataForMinter(network, minter));
        });

        const data = await Promise.all(promises);
        res.json({ response: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/assets', async (req, res) => {
    try {
        const allMintersPromises = networks.map(async (network) => ({
            [network]: await sweep.getMinters(network)
        }));

        const allMinters = await Promise.all(allMintersPromises);

        const promises = [];
        allMinters.forEach((item) => {
            const [network, { minters }] = Object.entries(item)[0];
            minters.forEach((minter) => {
                promises.push(fetchDataForMinter(network, minter));
            });
        });

        const data = await Promise.all(promises);
        res.json({ response: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------------------------
async function fetchDataForMinter(network, minter) {
    const assetData = await asset.fetchData(network, minter);
    return { ...assetData, network, asset: minter };
}

module.exports = router;
