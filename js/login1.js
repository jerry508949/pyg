$(function () {
    // 验证用户登录信息
    $('.mui-btn-primary').on('tap',function () {
        var obj = {
            username :'',
            password :''
        }
        obj.username = $('.username').val()
        obj.password = $('.password').val()
        if(!/^1[3-9]\d{9}$/.test(obj.username)) {
            mui.toast('账号不存在')
            return false;
        }if(obj.password.length<6){
            mui.toast('密码小于6位无效')
            return false;
        }
        //验证用户账号密码是否注册过
        $.ajax({
            type: 'post',
            url: 'login',
            data: obj,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.meta.status == 200) {
                    sessionStorage.setItem('sn_token',result.data.token)
                    var redirectURL = $.getCid(location.search).redirectURL
                    // console.log(redirectURL);
                    //判断是否url是否有传递redirectURL
                    if(redirectURL) {
                        //如果有则返回,没有则返回主页
                        location.href = unescape(redirectURL)
                    }else {
                        location.href = './index.html'
                    }
                }else {
                    mui.toast(result.meta.msg)
                }
            }
        })
    })
})