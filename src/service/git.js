'use strict';

const Axios = require('axios');
const assert = require('assert');
const GIT_CONFIG = require('../config').git;

const client = Axios.create({
  baseURL: `${GIT_CONFIG.url}/api/v4`,
  headers: { 'private-token': GIT_CONFIG.admin_token },
  timeout: 30 * 1000,
});


class Git {
  serialize_commit(commit) {
    assert(commit.actions);
    return {
      branch: commit.branch || 'master',
      commit_message: commit.commit_message,
      actions: commit.actions,
      author_name: commit.author_name,
    };
  }

  commit(project_id, commit) {
    const serialized_commit = this.serialize_commit(commit);
    return client
      .post(`/projects/${project_id}/repository/commits`, serialized_commit);
  }
}

module.exports = new Git();
