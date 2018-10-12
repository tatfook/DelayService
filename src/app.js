'use strict';

const { run } = require('./service/kafka');
const { observe } = require('./service/observator');
const set_timer = require('./timer/task');

set_timer();
run();
observe();
