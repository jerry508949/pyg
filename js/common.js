$(function () {
    //mui中默认情况下会阻止click的单击事件
    //解决方法是 重新为所有a元素绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    //把url提取出来
    const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    // const baseURL = 'http://140.143.222.79:8899/api/public/v1/'
    //添加拦截器，可以让每个ajax请求都经过这个函数处理
    //beforeSeng,每次发送ajax请求都不许经过的处理函数
    // XMLHttpRequest
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // 在函数内拼接好url
        // console.log(obj);
        obj.url = baseURL + obj.url
        //判断路径是否私有路径
        // if(obj.url.indexOf('/my/') !==-1){
        //     xhr.setRequestHeader('Authorization',sessionStorage.getItem('sn_token'))
        // }
        if(obj.url.indexOf('/my/') !==-1){
            xhr.setRequestHeader('Authorization',sessionStorage.getItem('sn_token'))
        }
    }

    //动态扩展zepto中的成员
    $.extend($,{
         getCid: function(url) {
            //创建一个空对象存放cid
            var obj = {}
            url = url.substring(1)
            var arr = url.split('&')
            for (let i = 0; i < arr.length; i++) {
                var temp = arr[i].split('=')
                obj[temp[0]] = temp[1]
            }
            return obj
        }
    })
})