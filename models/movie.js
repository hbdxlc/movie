/**
 *电影数据modul
 * 2018年10月10日  HBDXLC
 */
var mongoose = require('mongoose');
var moviesSchema = require('../schernas/movies');

module.exports = mongoose.model('Movie', moviesSchema);