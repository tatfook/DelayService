'use strict';

const logger = require('./logger');

const handlers = new Map()
  .set(404, 'not_found')
  .set(400, 'bad_request');


const ignorable_error_messages = [
  'A file with this name already exists',
  '404 Project Not Found',
];

class commit_error_handler {
  static handle_error(err) {
    err.response.data = err.response.data || {};
    logger.error(err);
    if (ignorable_error_messages.includes(err.response.data.message)) { return; }
    const handler = handlers.get(err.response.status);
    if (handler) {
      commit_error_handler[handler](err);
    } else {
      throw err;
    }
  }

  static bad_request(err) {
    throw err;
  }
}

module.exports = { commit_error_handler };
