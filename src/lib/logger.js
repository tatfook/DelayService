'use strict';

const Logger = require('tracer');

const logger_config = {
  root: './logs',
  format: '{{timestamp}} [{{title}}] ({{file}}:{{line}}) {{message}}',
  level: 'info',
};

module.exports = Logger.dailyfile(logger_config);
