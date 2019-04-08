$(function () {
    $('.mui-btn-primary').on('tap', function () {
        //获取用户登录信息
        var obj = {
            username: "",
            password: ""
        }
        obj.username = $('.username').val()
        obj.password = $('.password').val()

        //验证登录信息
        if (!/^1[3-9]\d{9}$/.test(obj.username)) {
            mui.toast('账号不正确请重新输入账号')
            return false;
        }
        if (obj.password.length < 6) {
            mui.toast('请输入大于6位数的密码')
            return false;
        }
        // console.log(obj.password.length);
        $.ajax({
            type: 'post',
            url: 'login',
            data: obj,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                //判断是否登录成功
                if(result.meta.status == 200) {
                    //如果登录成功，就把当前token存储到本地
                    sessionStorage.setItem('sn_token',result.data.token)
                    var redirectURL = $.getCid(location.search).redirectURL
                    // console.log(sessionStorage.getItem('redirectUrl'));
                    
                    // console.log(redirectURL);
                    if(redirectURL) {
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