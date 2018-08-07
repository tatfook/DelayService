'use strict';

const kafka = require('kafka-node');
const config = require('../config');
const LimitedQueue = require('../lib/concurrency');
const logger = require('../lib/logger');
const { route } = require('../router');

const KafkaConfig = config.kafka;
const options = KafkaConfig.options;
const topics = KafkaConfig.topics;
const ConsumerGroup = new kafka.ConsumerGroup(options, topics);

const concurrency = config.concurrency;
const q = new LimitedQueue(route, concurrency);

let pause = false;

q.drain = () => {
  if (q.tasks_amount < concurrency && pause) {
    pause = !pause;
    ConsumerGroup.resume();
  }
};

q.error_handler = err => {
  logger.error(err);
};

exports.run = () => {
  ConsumerGroup.on('error', err => {
    logger.error(err);
  });

  ConsumerGroup.on('message', msg => {
    console.info(msg);
    try {
      if (q.tasks_amount > concurrency) {
        ConsumerGroup.pause();
        pause = !pause;
      }
      q.push(msg);
    } catch (err) {
      logger.error(err);
    }
  });
};
