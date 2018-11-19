/**
 *用户数据modul
 * 2018年9月26日  HBDXLC
 */
var mongoose = require('mongoose');
var usersSchema = require('../schernas/users');

module.exports = mongoose.model('User', usersSchema);