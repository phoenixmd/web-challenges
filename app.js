'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ExpressReactViews = require('express-react-views');

const Config = require('./modules/config');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/404');

const app = express();

app.use(bodyParser.json());
app.engine('jsx', ExpressReactViews.createEngine());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

require('./routes/health')(app);
require('./routes/index')(app);
require('./routes/users')(app);

app.use(notFound());
app.use(errorHandler({ showStackTrace: Config.get('app').showStackTrace }));

module.exports = app;