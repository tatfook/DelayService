'use strict';

const mongoose = require('mongoose');
const dbConfig = require('../config').mongoDB;

mongoose.connect(dbConfig.url, dbConfig.options);

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: String,
  path: { type: String, unique: true },
  content: String,
  type: { type: String, default: 'blob' },
  project_id: Number,
  account_id: Number,
}, { timestamps: true });

module.exports = mongoose.model('File', FileSchema);
