'use strict';

const controllers = require('../controller/index');
const config = require('../config');

module.exports = () => {
  setImmediate(controllers.commit.consume_all);
  setInterval(controllers.commit.consume_all, config.timer.interval);
};
