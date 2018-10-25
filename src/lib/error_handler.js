'use strict';

const handlers = new Map()
  .set(404, 'not_found')
  .set(400, 'bad_request');

class commit_error_handler {
  static handle_error(err) {
    const handler = handlers.get(err.response.status);
    if (handler) {
      commit_error_handler[handler](err);
    } else {
      throw err;
    }
  }

  static bad_request(err) {
    if (err.response.data.message === 'A file with this name already exists') { return; }
    throw err;
  }
}

module.exports = { commit_error_handler };
