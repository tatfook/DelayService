'use strict';

const model = require('../model/index');
const es_service = require('../service/es-gateway');
const logger = require('../lib/logger');

exports.create_file = async msg => {
  try {
    const params = msg.value;
    const file = await model.file.findOne({ path: params.path });
    if (file.path.endsWith('.md')) {
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
    if (file.path.endsWith('.md')) {
      await es_service.update_page(file);
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.remove_file = async msg => {
  try {
    const params = msg.value;
    if (params.path.endsWith('.md')) {
      await es_service.remove_page(params.path);
    }
  } catch (err) {
    logger.error(err);
  }
};
