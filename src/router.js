'use strict';

const controllers = require('./controller/index');
const logger = require('./lib/logger');
const handlers_config = require('./config').handlers;

async function attempt(handler, msg, time = 0) {
  time++;
  await handler(msg)
    .catch(err => {
      console.log('===========================');
      if (time >= 3) {
        logger.error(err);
        return;
      }
      console.log('retry');
      attempt(handler, msg, time);
    });
}

exports.route = msg => {
  try {
    msg.value = JSON.parse(msg.value);
  } catch (err) {
    msg.value = msg.value;
  }

  const topic = msg.topic;
  const action = msg.value.action;
  const handler = controllers[handlers_config[topic]][ action || 'submit'];
  attempt(handler, msg);
};
