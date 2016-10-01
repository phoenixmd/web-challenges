'use strict';

module.exports = router => {

  router.get('/health', (req, res) => {
    return res.json({
      now: new Date()
    });
  });

};