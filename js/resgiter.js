$(function () {
    //获取验证码
    var resgiterNum
    $('#getResgiter').on('tap',function () {
        //验证手机号码
        if(!/^1[3-9]\d{9}$/.test($('[name=mobile]').val())) {
            mui.toast('手机号码输入错误')
            return false;
        }
        console.log($('[name=mobile]').val());
        
        //获取验证码
        $.ajax({
            type: 'post',
            url: 'users/get_reg_code',
            data: {mobile: $('[name=mobile]').val()},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.meta.status == 200) {
                    $('[name=code]').val(result.data)
                    resgiterNum = result.data
                    console.log(resgiterNum);
                    
                }
            }
        })
    })
    
    $('.btn-register').on('tap',function () {
        if(!/^1[3-9]\d{9}$/.test($('[name=mobile]').val())) {
            mui.toast('手机号码输入错误')
            return false;
        }
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test($('[name=email]').val())) {
            mui.toast('邮箱输入错误')
            return false;
        }  
        if(!/^\d{11}$/.test($('[name=pwd]').val())) {
            mui.toast('密码不能小于6位')
        }
        if(!/^1[3-9]\d{9}$/.test($('[name=mobile]').val())) {
            mui.toast('手机号码输入错误')
            return false;
        };
        
        if($('[name=code]').val() !== resgiterNum) {
            mui.toast('验证码输入错误')
            return false;
        }
        if($('[name=pwd]').val() !== $('[name=againpassword]').val()) {
            mui.toast('密码两次输入不一样 ')
            return false;
        }
        console.log($('.mui-input-group').serialize());
        
        $.ajax({
            type: 'post',
            url: 'users/reg',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.meta.status == 200) {
                    mui.toast('恭喜！注册成功')
                    setTimeout(() => {
                        location.href = 'login.html'
                    }, 2000);
                }else {
                    mui.toast(result.meta.msg)
                }
            }
        })
    })
    
})