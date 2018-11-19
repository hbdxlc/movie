/**
 * 电影项目 后台管理业务逻辑模块
 * 2018年9月26日 HBDXLC.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');
var Movie=require('../models/movie');
//统一返回
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
});
//md5加密
function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
//注册
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var userMail = req.body.userMail;
    var userPhone = req.body.userPhone;
    var userAdmin = req.body.userAdmin;
    var userPower = req.body.userPower;
    var userStop = req.body.userStop;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if (password != repassword) {
        responseData.code = 1;
        responseData.message = '输入的两次密码不一致';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            responseData.code = 1;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return
        }
        var user = new User({
            username: username,
            password: cryptPwd(password),
            userMail: userMail,
            userPhone: userPhone,
            userAdmin: userAdmin,
            userPower: userPower,
            userStop: userStop
        });
        return user.save();
    }).then(function (newUserInfo) {
        responseData.message = '注册成功';
        res.json(responseData);
    })
});
//登录
router.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username,
        password: cryptPwd(password)
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.code = 1;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        };
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }))
        res.json(responseData);
        return;
    })
});
//退出
router.get('/user/logout', function (req, res) {
    req.cookies.set("userInfo", null);
    responseData.message = '退出成功';
    res.json(responseData);
    return;
});
//电影添加Add
router.post('/movieAdd', function (req, res) {
    var movieName=req.body.movieName;
    var movieType=req.body.movieType;
    var movieImg=req.body.movieImg;
    var movieVideo=req.body.movieVideo;
    var movieDownload=req.body.movieDownload;
    var movieMainPage=req.body.movieMainPage;
    console.log(req.body);
})
module.exports = router;