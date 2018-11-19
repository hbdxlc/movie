/**
 * 电影项目 后台路由模块
 * 2018年9月26日 HBDXLC.
 */

var express = require('express');
var router = express.Router();
var User=require('../models/user');
var Movie=require('../models/movie');

//判断是否登录
router.use(function (req, res, next) {
    if(req.cookies.get('userInfo')==undefined){
        res.render('login',{
            title:'登录'
        })
        return;
    }
    next();
})
//判断是否是管理员
router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理员才可以进入管理后台');
        return;
    }
    next();
});
//进入首页
router.get('/',function (req, res) {
    res.render('index',{
        title:'后台管理系统',
        username:req.userInfo.username
    })
});
//进入用户管理
router.get('/user',function (req, res) {
    User.find().then(function (users) {
        res.render('user',{
            title:'用户管理',
            users:users,
            username:req.userInfo.username
        })
    })

});
//进入电影管理list
router.get('/movieList',function (req, res) {
    Movie.find().then(function (movie) {
        res.render('movie',{
            title:'电影管理',
            movie:movie,
            username:req.userInfo.username
        })
    })

});

module.exports = router;