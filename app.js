'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ExpressReactViews = require('express-react-views');

const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const configDB = require(__dirname + '/config/config.json')['development'];


const Config = require('./modules/config');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/404');
const authorizeUser = require('./middlewares/authorize-user');
const Store = require('express-sequelize-session')(session.Store);

var sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, configDB);
var store = new Store(sequelize);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ //to support URL-encoded bodies or post data
    extended: true
}));
app.use(cookieParser());

app.use(session({
    name: 'sid',
    secret: 'AppSessionSecret',
    store: store,
    resave: false,
    saveUninitialized: true
}));
app.engine('jsx', ExpressReactViews.createEngine());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(authorizeUser());

require('./routes/health')(app);
require('./routes/index')(app);
require('./routes/user')(app, store);

app.use(notFound());
app.use(errorHandler({ showStackTrace: Config.get('app').showStackTrace }));

module.exports = app;