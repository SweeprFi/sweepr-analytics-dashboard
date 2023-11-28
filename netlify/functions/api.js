require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
var cors = require('cors');

const assetRoutes = require('../../src/routes/asset');
const sweepRoutes = require('../../src/routes/sweep');
const sweeprRoutes = require('../../src/routes/sweepr');
const ammRoutes = require('../../src/routes/amm');

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;

// To use the GeoLite2 web service instead of the GeoIP2 web service, set
// the host to geolite.info, e.g.:
// new WebServiceClient('1234', 'licenseKey', {host: 'geolite.info'});
const client = new WebServiceClient('938253', '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', {host: 'geolite.info'});

const geoblocker = (req, res, next) => {
    console.log(req.ip);
    client.country(req.ip).then(response => {
        console.log(response.country.isoCode);
        if(response.country.isoCode === 'US'){
            res.send('Sweep is not available in your country');
        } else {
            next();
        }
    }).catch((error)=>{
        res.json(error);
    });
}

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(geoblocker);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

router.get('/', (req, res) => {
    res.send('Sweep Analytics');
})

// Custom routes
app.use('/api/', assetRoutes);
app.use('/api/', sweepRoutes);
app.use('/api/', sweeprRoutes);
app.use('/api/', ammRoutes);

module.exports.handler = serverless(app);
module.exports.APP = app;