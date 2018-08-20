'use strict';

const model = require('../model/index');
const es_service = require('../service/es-gateway');
const logger = require('../lib/logger');

const is_page = file => {
  return file.path.endsWith('.md');
};

exports.create_file = async msg => {
  try {
    const params = msg.value;
    const file = await model.file.findOne({ path: params.path });
    if (is_page(file)) {
      const project = await model.project.findOne({ _id: file.project_id });
      await es_service.create_page(file, project);
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.update_file = async msg => {
  try {
    const params = msg.value;
    const file = await model.file.findOne({ path: params.path });
    if (is_page(file)) {
      await es_service.update_page(file);
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.remove_file = async msg => {
  try {
    const params = msg.value;
    if (is_page(params)) {
      await es_service.remove_page(params.path);
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.move_file = async msg => {
  try {
    const params = msg.value;
    const file = await model.file.findOne({ path: params.path });
    if (is_page(file)) {
      const project = await model.project.findOne({ _id: file.project_id });
      file.previous_path = params.previous_path;
      await es_service.move_page(file, project);
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.update_site_visibility = async msg => {
  try {
    const params = msg.value;
    await es_service.update_site_visibility(params.path, params.visibility);
  } catch (err) {
    logger.error(err);
  }
};

exports.remove_site = async msg => {
  try {
    const params = msg.value;
    await es_service.remove_site(params.path);
  } catch (err) {
    logger.error(err);
  }
};

exports.remove_user = async msg => {
  try {
    const params = msg.value;
    await es_service.remove_user(params.username);
  } catch (err) {
    logger.error(err);
  }
};
