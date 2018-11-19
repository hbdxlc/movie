/**
 * 电影数据表结构
 * 2018年10月10日 HBDXLC
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    movieName: String,//电影名称
    movieType:String,//电影分类
    movieImg: String,//显示图片
    movieVideo: String,//电影路径
    movieDownload: String,//下载路径
    movieTime: {
        type:String,
        default:Date.now()
    },//上传时间
    movieNumSuppose:Number,//点赞数
    movieNumDownload:Number,//下载次数
    movieMainPage:Boolean//是否推荐到主页
})