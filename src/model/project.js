'use strict';

const mongoose = require('mongoose');
const dbConfig = require('../config').mongoDB;

mongoose.connect(dbConfig.url, dbConfig.options);

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  _id: Number,
  visibility: { type: String, default: 'public' },
  name: String,
  site_id: Number,
  sitename: String,
  path: { type: String, unique: true },
  git_path: String,
  account_id: Number,
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
