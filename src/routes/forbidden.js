const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req);
    res.json("Sweepr Analytics");
});

router.get('/forbidden', async (req, res) => {
    res.json("app not allowed in the us");
});

module.exports = router;
