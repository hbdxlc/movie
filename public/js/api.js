/**
 * 后台ajax请求
 * 2018/10/7.   HBDXLC
 */
$(function () {
    //管理员添加
    $('.user .register').on('click', function () {
        $.ajax({
            url: '/admin/user/register',
            type: "post",
            dataType: "json",
            data: {
                username: $('.user #username').val(),
                password: $('.user #password').val(),
                repassword: $('.user #repassword').val(),
                userAdmin: $('.user #userAdmin').val(),
                userPower: $('.user #userPower').val(),
                userStop: $('.user #userStop').val(),
                userMail: $('.user #userMail').val(),
                userPhone: $('.user #userPhone').val(),
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            }
        })
    });
    //登录
    $('.section form .btn').on('click', function () {
        $.ajax({
            url: '/admin/user/login',
            type: "post",
            dataType: "json",
            data: {
                username: $('.section #username').val(),
                password: $('.section #password').val()
            },
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data.code == 0) {
                    window.location.reload();
                } else {
                    $('.section .message').html(data.message)
                }
                ;
            }
        })
    });
    //退出
    $('.logout').on('click', function () {
        var status = confirm('您确定要退出吗？');
        if (status) {
            $.ajax({
                url: '/admin/user/logout',
                type: "get",
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (data.code == '0') {
                        window.location.reload();
                    }
                }
            })
        } else {
            return false;
        }
    });
    //保存电影文件
    $('.movie .submit').on('click', function () {
        var formData = new FormData();
        formData.append('movieName', document.myForm.movieName.value);
        formData.append('movieType', document.myForm.movieType.value);
        formData.append('movieImg', document.myForm.movieImg.files[0]);
        formData.append('movieVideo', document.myForm.movieVideo.files[0]);
        formData.append('movieDownload', document.myForm.movieDownload.value);
        formData.append('movieMainPage', document.myForm.movieMainPage.value);
        $.ajax({
            url: '/admin/movieAdd',
            type: 'post',
            data: formData,
            jsonpCallback: 'callback',
            contentType: false, //禁止设置请求类型
            processData: false, //禁止jquery对DAta数据的处理,默认会处理
            //禁止的原因是,FormData已经帮我们做了处理
            success: function (result) {
                console.log(result);
            }
        });

    })
})