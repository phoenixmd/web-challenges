'use strict';

const Config = require('../modules/config');

module.exports = router => {
  router.get(['/','/login'], (req, res) => {
    res.locals.title = Config.get('app').name;
    return res.render('index');
  });
};