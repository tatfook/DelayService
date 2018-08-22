'use strict';

const Axios = require('axios');
const config = require('../config');
const KEEPWORK_CONFIG = config.keepwork;

const client = Axios.create({
  baseURL: KEEPWORK_CONFIG.url,
  headers: { Authorization: KEEPWORK_CONFIG.admin_token },
  timeout: 30 * 1000,
});

class KeepWorkService {
  static get_user_by_id(id) {
    return client.get(`/admins/users/${id}`);
  }

  static get_site_by_id(id) {
    return client.get(`/admins/sites/${id}`);
  }
}

module.exports = KeepWorkService;
