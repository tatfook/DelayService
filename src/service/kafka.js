'use strict';

const kafka = require('kafka-node');
const config = require('../config');
const LimitedQueue = require('../lib/concurrency');
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

exports.run = () => {
  ConsumerGroup.on('error', err => {
    console.log(err);
  });
  ConsumerGroup.on('message', msg => {
    try {
      if (q.tasks_amount > concurrency) {
        ConsumerGroup.pause();
        pause = !pause;
      }
      q.push(msg);
    } catch (err) {
      console.error(err);
    }
  });
};
