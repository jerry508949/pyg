$(function () {
    //实现区域滑动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    })
    //存放商品的参数
    var infos = {}

    //发送ajax请求渲染商品详情页面
    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getCid(location.search),
        dataType: 'json',
        success: function (result) {
            info = result.data
            var html = template('goodDetailTemp',result.data)
            $('.sn_main .mui-scroll').html(html)
            // console.log(html);
            

        }
    })
    
    //加入购物车
    $('.btn_addCart').on('tap',function () {
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            data: info,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.meta.status == 401){
                    //拼接url方便用户登录后原路返回详情页面
                    location.href = './login.html?redirectURL=' + escape(location.href)
                }else {
                    console.log('添加成功');
                }
            }
        })
    })
})