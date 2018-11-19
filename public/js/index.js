/**
 * Created by Administrator on 2018/10/7.
 */
$(function () {
    //设置模板left高度
    $(window).ready(function () {
        viwe()
    })
    $(window).resize(function () {
        viwe()
    })
    function viwe() {
        var viweH = $(window).height();
        $('.index_box nav').height(viweH)
    }
})