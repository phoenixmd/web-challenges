'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ExpressReactViews = require('express-react-views');

const Config = require('./modules/config');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/404');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Promise = require('bluebird')
require('./modules/Errors/index');
const Sequelize = require('sequelize');
Sequelize.tango_db_con = new Sequelize(Config.get('app').db.database, Config.get('app').db.username, Config.get('app').db.password, {
    host: Config.get('app').db.host,
    port: Config.get('app').db.port
});
const sequelize = new Sequelize(Config.get('app').db.database, Config.get('app').db.username, Config.get('app').db.password, {
    host: Config.get('app').db.host,
    port: Config.get('app').db.port
});
const sessionStore = new SequelizeStore({
    db: sequelize
});
sessionStore.sync();
const app = express();
app.use(bodyParser.json());
app.engine('jsx', ExpressReactViews.createEngine());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(cookieParser())
app.use(session({
    secret: 'zcasdfkjhasufhsrfnweafr2394u1239qu12rwqfnas;fnadoif',
    store: sessionStore
}));

app.init = ()=> {
 return  Promise.all([require('./db/init-schemas'), sessionStore.sync()])
        .then(()=> {
            require('./routes/health')(app);
            require('./routes/index')(app);
            require('./routes/users')(app);
            app.use(notFound());
            app.use(errorHandler({showStackTrace: Config.get('app').showStackTrace}));

        });
}
module.exports = app;