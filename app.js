require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const assetRoutes = require('./src/routes/asset');
const sweepRoutes = require('./src/routes/sweep');
// const sweeprRoutes = require('./src/routes/sweepr');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

// Custom routes
app.use(assetRoutes);
app.use(sweepRoutes);
// app.use(sweeprRoutes);
