$(function () {
    //实现主体区域滑动
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
    var total
    //计算总价
    function getTotalPrice() {
        total = 0
        
        //获取所有订单商品
        var allOrderPro = $('.orderList li')
        
        
        // console.log(allOrderPro.data('order'));
        allOrderPro.each(function (index,value) {
            var price = $(value).data('order').goods_price
            var num = $(value).find('#test').val()
            total = total + price*num
            // console.log(num);
            // console.log(price);
            
        })
        
        
        $('.orderPrice').text('￥ '+total+'')
    }

    
    //同步更新订单数据
    function syncCart(allOrderPro) {
        var orderList = {}
        for(var i = 0; i < allOrderPro.length;i++) {
            var data = $(allOrderPro[i]).data('order')
            data.amount = $(allOrderPro[i]).find('#test').val()
            //数据传递需要键值对
            orderList[data.goods_id] = data
            // console.log(data);
            
        }
        console.log($('.orderList li').length);
        
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            data: {infos: JSON.stringify(orderList)},
            success: function (result) {
                console.log(JSON.parse(result.data.cart_info));
                
            }
        })
    }
    

    //发送ajax获取主体数据详情渲染页面
    function init() {
        $.ajax({
            type: 'get',
            url: 'my/cart/all',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var objList = JSON.parse(result.data.cart_info)
                // console.log(objList);
                var html = template('orderListTemp',{list:objList})
                // console.log(html);
                
                $('.orderList').html(html)
                //mui中提到数字输入框如果是动态渲染需要手动初始化
                mui('.mui-numbox').numbox()
                //获取订单总价
                getTotalPrice()
            }
        })
    }
    init()


    //实现单击编辑
    $('.btn_edit').on('tap',function () {
        
        $('.layout').toggleClass('eleToggle')   
        if($(this).text() == '完成') {
            $(this).text('编辑')
            syncCart($('.orderList li'))
        }else {
            $(this).text('完成')
            
        }
    })
    //单击加减数量同步总价
    $('.orderList').on('tap','.pro_info .mui-btn',function () {
        getTotalPrice()
        syncCart($('.orderList li'))
    })

    //单击勾选按钮给当前的商品加标记
    // $('.orderList').on('tap','div:nth-of-type(1) input[type=checkbox]',function () {
    //     $(this).toggleClass('isDel')
    //     // console.log();
    // })

    //单击删除选中  
    $('.btn-del').on('tap',function () {
        // $('.orderList .isDel').parent().parent().remove()
        // syncCart($('.orderList li'))
        // getTotalPrice()
        // init()
        var list = $('.orderList').find("[type='checkbox']").not(':checked').parents('.orderList li')
        console.log(list);
        syncCart(list)
        init()
    })

    //选择地址
    $('.selectAddress').on('tap',function () {
        //创建对象，设置三级联动
        var picker = new mui.PopPicker({
            layer: 3
        })
        //给picker对象天机数据，天机的数据只能是数组，引入的js文件citys.js
        picker.setData(data)
        //显示picker，蚕食是一个回调函数，在回调函数中有一个参数
        picker.show(function (items) {
            console.log(items);
            $('.address_cont .right span').text(items[0].text + "-" + items[1].text + "-" + items[2].text)
            $('.address_cont .right h5').text('我的地址')
        })

    })

    //生成订单
    $('.createOrder').on('tap',function () {
        //设置请求的需要发送的数据
        var order = {
            "order_price": total,
            "consignee_addr": $('.address_cont .right span').text(),
            "goods":[]
        }
        $('.orderList li').each(function (index,value) {
            var singer = {}
            var temp = $(value).data('order')
            singer.goods_id = temp.goods_id
            singer.goods_number = temp.goods_number
            singer.goods_price = temp.goods_price
            order.goods.push(singer)
        })
        console.log(order);
        $.ajax({
            type: 'post',
            url: 'my/orders/create',
            data: order,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                location.href = './orderList.html'
            }
        })
        
    })
    
})