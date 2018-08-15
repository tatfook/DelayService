'use strict';

const controllers = require('./controller/index');

exports.route = msg => {
  const topic = msg.topic;
  let handler;
  if (topic === 'commit') {
    handler = controllers.commit.submit;
  } else {
    msg.value = JSON.parse(msg.value);
    handler = controllers[msg.topic][msg.value.action];
  }
  handler(msg);
};
