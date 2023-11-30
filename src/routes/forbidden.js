const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req);
    res.json("Sweepr Analytics");
});

router.get('/forbidden', async (req, res) => {
    res.json("App not allowed in the US");
});

module.exports = router;
