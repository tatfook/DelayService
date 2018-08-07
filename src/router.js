'use strict';

const controllers = require('./controllers/index');

exports.route = msg => {
  const handler = controllers[msg.topic].submit;
  handler(msg);
};
