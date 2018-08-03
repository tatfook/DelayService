'use strict';

const kafka = require('kafka-node');
const KafkaConfig = require('../config').kafka;

const options = KafkaConfig.options;
const topics = KafkaConfig.topics;
exports.ConsumerGroup = new kafka.ConsumerGroup(options, topics);
