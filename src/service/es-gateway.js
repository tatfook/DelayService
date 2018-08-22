'use strict';

const Axios = require('axios');
const config = require('../config');
const ES_GATEWAY_CONFIG = config.es_gateway;
const GIT_GATEWAY_CONFIG = config.git_gateway;
const KEEPWORK_CONFIG = config.keepwork;

const default_portrait = KEEPWORK_CONFIG.default_portrait;

const client = Axios.create({
  baseURL: ES_GATEWAY_CONFIG.url,
  headers: { Authorization: ES_GATEWAY_CONFIG.admin_token },
  timeout: 30 * 1000,
});


class ESGateway {
  static get_page_url(file) {
    let url = `/${file.path}`;
    url = url.replace('.md', '');
    return url;
  }

  static get_page_id(file) {
    const url = this.get_page_url(file);
    return encodeURIComponent(url);
  }

  static serialize_new_page(file, project) {
    const source_url = `${GIT_GATEWAY_CONFIG.url}/files/${encodeURIComponent(file.path)}`;
    const url = this.get_page_url(file);
    return {
      visibility: project.visibility,
      content: file.content || '',
      source_url,
      url,
    };
  }

  static create_page(file, project) {
    const serialized_page = this.serialize_new_page(file, project);
    return client.post('/pages', serialized_page);
  }

  static update_page(file) {
    const id = this.get_page_id(file);
    return client.put(`/pages/${id}`, {
      content: file.content,
      tags: file.tags || [],
    });
  }

  static remove_page(path) {
    const id = this.get_page_id({ path });
    return client.delete(`/pages/${id}`);
  }

  static move_page(file, project) {
    return Promise.all([
      this.remove_page(file.previous_path),
      this.create_page(file, project),
    ]);
  }

  static get_site_url(path) {
    return `/${path}`;
  }

  static get_site_id(path) {
    const url = this.get_site_url(path);
    return encodeURIComponent(url);
  }

  static serialize_new_site(site) {
    return {
      username: site.username,
      sitename: site.sitename,
      displayName: site.displayName || site.sitename,
      logoUrl: site.extra.logoUrl,
      desc: site.description,
    };
  }

  static create_site(site) {
    const serilized_site = this.serialize_new_site(site);
    return client.post('/sites', serilized_site);
  }

  static update_site_visibility(path, visibility) {
    const id = this.get_site_id(path);
    return client.put(`/sites/${id}/visibility`, { visibility });
  }

  static remove_site(path) {
    const id = this.get_site_id(path);
    return client.delete(`/sites/${id}`);
  }

  static serialize_new_user(user) {
    user.portrait = user.portrait || default_portrait;
    const serilized_user = {
      username: user.username,
      displayName: user.nickname || user.username,
      portrait: `${KEEPWORK_CONFIG.base_url}${user.portrait}`,
      location: user.location,
    };
    return serilized_user;
  }

  static create_user(user) {
    const serilized_user = this.serialize_new_user(user);
    return client.post('/users', serilized_user);
  }

  static remove_user(username) {
    return client.delete(`/users/${username}`);
  }
}

module.exports = ESGateway;
