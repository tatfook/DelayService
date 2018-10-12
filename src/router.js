'use strict';

const controllers = require('./controller/index');
const handlers_config = require('./config').handlers;
const { attempt } = require('./lib/util');

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
