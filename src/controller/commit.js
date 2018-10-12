'use strict';

const model = require('../model/index');
const git_service = require('../service/git');
const { attempt } = require('../lib/util');

const consume_one = async commit => {
  await git_service.commit(commit.id, commit);
  await commit.remove();
};

const consume_all = async () => {
  const cursor = model.commit.find({}).cursor();
  for (let commit = await cursor.next(); commit != null; commit = await cursor.next()) {
    await attempt(consume_one, commit);
  }
};

const submit = async msg => {
  try {
    const commit = await model.commit.findOne({ _id: msg.value });
    await consume_one(commit);
  } catch (err) {
    console.error(err.response.data);
    throw err;
  }
};

module.exports = { consume_one, consume_all, submit };
