'use strict';

const controllers = require('./controller/index');

exports.route = msg => {
  const handler = controllers[msg.topic].submit;
  handler(msg);
};
