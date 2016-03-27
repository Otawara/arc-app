'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arcDB = require('../config-db').arcDB;

const MessageSchema = new Schema({
    author: String,
    content: String,
    time: Date
});

module.exports = arcDB.model('Message', MessageSchema);
