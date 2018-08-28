'use strict';

const { run } = require('./service/kafka');
const { observe } = require('./service/observator');

run();
observe();
