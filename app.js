'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const Config = require('./modules/config');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/404');

const app = express();

app.use(bodyParser.json());

require('./routes/health')(app);

app.use(notFound());
app.use(errorHandler({ showStackTrace: Config.get('app').showStackTrace }));

module.exports = app;