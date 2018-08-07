'use strict';

const queue = require('async/queue');

class LimitedQueue {
  constructor(worker, concurrency, drain, error_handler) {
    const worker_wrapper = this.wrap_worker;
    this._tasks = {};
    this._worker = worker;
    this.tasks_amount = 0;
    this.drain = drain;
    this.error_handler = error_handler;
    const _this = this;
    this._q = queue(worker_wrapper.bind(_this)(), concurrency);
  }

  shift(tasks) {
    const task = tasks.shift();
    if (task) { this.tasks_amount--; }
    return task;
  }

  push(task) {
    this.tasks_amount++;
    if (this._tasks[task.key]) {
      this._tasks[task.key].push(task);
    } else {
      this._tasks[task.key] = [ task ];
      this._q.push([ this._tasks[task.key] ]);
    }
  }

  wrap_worker() {
    return (tasks, next) => {
      setImmediate(() => {
        let task;
        while (tasks.length > 0) {
          try {
            task = this.shift(tasks);
            this._worker(task);
            this.after_each();
          } catch (err) {
            this.handle_error(err);
          }
        }
        this._tasks[task.key] = undefined;
        next();
      });
    };
  }

  handle_error(err) {
    if (this.error_handler instanceof Function) {
      this.error_handler(err);
      return;
    }
    console.error(err);
  }

  after_each() {
    if (this.drain instanceof Function) { this.drain(); }
  }
}

module.exports = LimitedQueue;
