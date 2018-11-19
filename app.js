/**
 * 应用程序的启动 入口文件
 * 2018年9月26日    HBDXLC
 */
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var Cookies = require('cookies');
var User=require('./models/user');
//创建app应用
var app = express();

//设置响应头
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//静态文件托管
app.use('/public', express.static(__dirname + '/public'));

//设置模板引擎
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

//取消模板缓存 上线需要删除
swig.setDefaults({cache: false});

//bodyparser设置
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

///设置cookies
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
             User.findById(req.userInfo._id).then(function (userInfo) {
                 req.userInfo.isAdmin = Boolean(userInfo.userAdmin);
                 next();
            })
        } catch (e) {
            next();
        }
    } else {
        next();
    }

});

//根据不同的功能划分不同模板
app.use('/admin', require('./routers/admin'));//管理界面数据
app.use('/api', require('./routers/api'));//用户界面数据
app.use('/', require('./routers/main'));//主线

//数据库连接判断是否启动程序
mongoose.connect('mongodb://localhost:27017/movie_cms', {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        app.listen(8088);
        console.log('数据库连接成功，已经启动端口8088');
    }
})