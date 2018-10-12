'use strict';

const logger = require('./logger');

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => { resolve(); }, time);
  });
};

const attempt = async (handler, params, time = 0) => {
  time++;
  await handler(params)
    .catch(async err => {
      if (time >= 3) {
        logger.error(err);
        return;
      }
      await sleep(1000);
      console.log('retry');
      attempt(handler, params, time);
    });
};

module.exports = { sleep, attempt };
