'use strict';

const Koa = require('koa');
const app = new Koa();
const config = require('../config');
const port = config.observator.port;

app.use(async ctx => {
  ctx.body = 'Hello, Delay Service';
});

exports.observe = () => {
  app.listen(port);
};
