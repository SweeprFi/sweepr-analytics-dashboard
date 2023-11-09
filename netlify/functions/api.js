require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const assetRoutes = require('../../src/routes/asset');
const sweepRoutes = require('../../src/routes/sweep');
// const sweeprRoutes = require('./src/routes/sweepr');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

router.get('/', (req, res) => {
    res.send('Sweep Analytics');
})

app.use('/api', router);

// Custom routes
app.use('/api/', assetRoutes);
app.use('/api/', sweepRoutes);
// app.use(sweeprRoutes);

module.exports.handler = serverless(app);
module.exports.APP = app;