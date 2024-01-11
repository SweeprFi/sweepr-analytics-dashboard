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

        const allDataResults = await Promise.all(
            minters.map(async (minter) => ({
                [minter]: await asset.fetchData(network, minter)
            }))
        );

        const response = allDataResults.reduce((acc, result) => {
            const minter = Object.keys(result)[0];
            acc[minter] = { ...result[minter] };
            return acc;
        }, {});

        res.json({ [network]: response });
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
        const allDataPromises = allMinters.map(async (item) => {
            const [network, { minters }] = Object.entries(item)[0];
            return processMinters(network, minters);
        });

        const response = await Promise.all(allDataPromises);
        const responseParsed = processResponse(response);
        res.json({ response: responseParsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function processMinters(network, minters) {
    const promises = minters.map(async(minter) => await asset.fetchData(network, minter));
    return { ...await Promise.all(promises), network };
}

function processResponse(resp) {
    var data = []
    resp.forEach(network => {
        Object.keys(network).forEach(key => {
            if(key !== "network") {
                const newElement = {...network[key], network: network["network"]};
                data.push(newElement)
            }
        })
    });

    return data;
}

module.exports = router;
