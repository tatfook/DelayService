'use strict';

const { ConsumerGroup } = require('./services/kafka');
// const { mainRouter } = require('./routes/main-routes');
// const { errorRouter } = require('./routes/error-routes');

// const env = process.env.NODE_ENV || 'development'

ConsumerGroup.on('error', err => {
  console.log(err);
});
ConsumerGroup.on('message', message => {
  console.log(message);
});

module.exports = ConsumerGroup;
