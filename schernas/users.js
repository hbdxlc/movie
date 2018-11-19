/**
 * 用户数据表结构
 * 2018年9月26日 HBDXLC
 */
var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({
    username: String,//用户名
    password: String,//密码
    userMail:String,//邮箱
    userPhone:String,//电话
    userAdmin:{
        type:String,
        default:false
    },//是否为管理员
    userPower:{
        type:Number,
        default:1
    },//用户权限
    userStop:{
        type:Boolean,
        default:false
    }//是否被封停
})