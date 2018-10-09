'use strict';

const model = require('../model/index');
const git_service = require('../service/git');
// const logger = require('../lib/logger');

exports.submit = async msg => {
  try {
    const commit = await model.commit.findOne({ _id: msg.value });
    await git_service.commit(commit.id, commit);
    await commit.remove();
  } catch (err) {
    console.error(err.response.data);
    throw err;
  }
};
