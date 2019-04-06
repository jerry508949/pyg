$(function () {
    //mui中默认情况下会阻止click的单击事件
    //解决方法是 重新为所有a元素绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    //把url提取出来
    const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    //添加拦截器，可以让每个ajax请求都经过这个函数处理
    //beforeSeng,每次发送ajax请求都不许经过的处理函数
    // XMLHttpRequest
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // 在函数内拼接好url
        // console.log(obj);
        obj.url = baseURL + obj.url
    }




})