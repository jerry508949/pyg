$(function () {
    //实现区域滚动
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

    //计算总价
    function getTotalPrice() {
        var total = 0;
        var allOrderPro = $('.orderList li')
        allOrderPro.each(function (index,value) {
            var price = $(value).data('order').goods_price
            var num = $(value).find('#test').val()
            total += price*num
        })
        $('.orderPrice').text('￥ '+total+'')
    }

    //同步更新订单数据
    function syncCart(allOrderPro) {
        var orderList = {}
        for(var i = 0;i < allOrderPro.length; i++){
            var data = $(allOrderPro[i]).data('order')
            data.amount = $(allOrderPro[i]).find('#test').val()
            //数据传递需要键值对
            orderList[data.goods_id] = data
        }
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            data: {infos: JSON.stringify(orderList)},
            success: function (result) {
                console.log(result);
                
            }
        })
    }

    //发送ajax获取主体数据详情渲染页面
    $.ajax({
        type: 'get',
        url: 'my/cart/all',
        dataType: 'json',
        success: function (result) {
            var objList = JSON.parse(result.data.cart_info)
            var html = template('orderListTemp',{list: objList})
            $('.orderList').html(html)
            //mui中提到数字输入框如果是动态渲染需要初始化
            mui('.mui-numbox').numbox()

            getTotalPrice()
        }
    })

    //单击编辑同步更新
    $('.btn_edit').on('tap',function () {
        $('.layout').toggleClass('eleToggle')
        if($(this).text() == '完成'){
            $(this).text('编辑')
            //实现同步更新
            syncCart($('.orderList li'))
        }else {
            $(this).text('完成')
        }
    })
    //单击加减数量同步总价
    $('.orderList').on('tap','.pro_info .mui-btn',function () {
        getTotalPrice()
    })
    //单击勾选按钮标记商品
    $('.orderList').on('tap','div:nth-of-type(1) input[type=checkbox]',function () {
        $(this).toggleClass('isDel')
        // console.log();
    })

    //单击删除选中
    $('.btn-del').on('tap',function () {
        $('.orderList .isDel').parent().parent().remove()
        syncCart($('.orderList li'))
        getTotalPrice()
    })
})