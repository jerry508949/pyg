$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        // scrollY: true, //是否竖向滚动
        // scrollX: false, //是否横向滚动
        // startX: 0, //初始化时滚动至x
        // startY: 0, //初始化时滚动至y
        indicators: false //是否显示滚动条
        // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        // bounce: true //是否启用回弹
    });

    // console.log($.getCid(location.search));
    // console.log(location.search);
    //发送ajax获取商品详情数据

    //存放点击购物车发送的请求参数
    var info = {}

    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getCid(location.search),
        dataType: 'json',
        success: function (result) {


            //获取商品请求参数
            // info.cat_id = result.data.cat_id
            // info.goods_id = result.data.goods_id
            // info.goods_name = result.data.goods_name
            // info.goods_number = result.data.goods_number
            // info.goods_price = result.data.goods_price
            // info.goods_small_logo = result.data.goods_small_logo
            // info.goods_weight = result.data.goods_weight
            info = result.data
        
            // console.log(result.data);
            var html = template('goodDetailTemp', result.data)
            // // console.log(html);
            // console.log("主体-参数".slice("主体-参数".lastIndexOf('-')*-1));
            // console.log("how are you today?".lastIndexOf('are'));

            $('.sn_main .mui-scroll').html(html)
            //实现自动轮播
            mui('.mui-slider').slider({
                interval: 2000
            });

        }
    })
    
    $('.btn_addCart').on('tap', function () {
        //判断token是否存在
        var myToken = sessionStorage.getItem('sn_token')
        //将当前url存放到本地中
        sessionStorage.setItem('redirectUrl',location.href)
        if(!myToken) {
            location.href = './login.html?redirectURL=' + escape(location.href)
        }else {
            //如果存在则发送ajax
            $.ajax({
                type: 'post',
                url: 'my/cart/sync',
                data: info,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    // 判断token是否无效或者过期
                    if(result.meta.status == 401) {
                        location.href = './login.html?redirectURL=' + escape(location.href)
                    }else {
                        console.log(result);
                        
                        console.log('ok');
                    }
                }
            })
        }
        
    })
})