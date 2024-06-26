require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
var cors = require('cors');

const assetRoutes = require('../../src/routes/asset');
const sweepRoutes = require('../../src/routes/sweep');
const sweeprRoutes = require('../../src/routes/sweepr');
const ammRoutes = require('../../src/routes/amm');
const dealRoutes = require('../../src/routes/deal');
// const forbiddenRoutes = require('../../src/routes/forbidden');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

// Custom routes
app.use('/api/', assetRoutes);
app.use('/api/', sweepRoutes);
app.use('/api/', sweeprRoutes);
app.use('/api/', ammRoutes);
app.use('/api/', dealRoutes);
// app.use('/api/', forbiddenRoutes);

module.exports.handler = serverless(app);
module.exports.APP = app;
