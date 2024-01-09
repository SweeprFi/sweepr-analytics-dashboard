const express = require('express');
const router = express.Router();

router.get('/forbidden', async (req, res) => {
    res.json("App not allowed in the US");
});

module.exports = router;
