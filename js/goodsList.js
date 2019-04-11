$(function () {
    //单击搜索实现侧滑效果
    $('.mui-icon-search').on('tap', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');

    })

    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    //识别当前页面的cid
    function getCid(url) {
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


    // 设置下拉参数
    var data = {
        cid: getCid(location.search).cid,
        pagenum: 1,
        pagesize: 5
    }
    // console.log(data);
    //渲染主体页面
    function renderMainData(callback, obj) {
     
        $.ajax({
            type: 'get',
            url: 'goods/search',
            data: $.extend(data, obj),
            dataType: 'json',
            success: function (result) {
                callback(result)
                
            }
        })
    }

    //下拉刷新和上拉加载
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    function () {
                        data.pagenum = 1
                        renderMainData(function (result) {
                            // console.log(result);
                            var html = template('goodsListTemp', result.data)
                            // console.log(html);
                            $('.goodsList').html(html)
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            // 为了防止切换分类的时候，无法再上拉，所以在每次刷新的时候将上拉加载重新启用
                            mui('#refreshContainer').pullRefresh().refresh(true)
                        })
                    }
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    function () {
                        data.pagenum++
                        console.log(data.pageNum);

                        renderMainData(function (result) {
                            console.log(result.data);

                            if (result.data.goods.length > 0) {
                                var html = template('goodsListTemp', result.data)
                                $('.goodsList').append(html)
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            } else {
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            }
                        })
                    }
            }
        }
    });

    // 点击搜索框匹配搜索商品
    $('.query_btn').on('tap',function () {
        var obj = {}
        obj.query = $('.query_txt').val()
        // console.log(obj);
        renderMainData(function (result) {
            var html = template('searchListTemp',result.data)
            $('.searchList').html(html)
        },obj)
    })
    $('.query_txt').on('focus',function () {
        $(this).val('')
    })
    
})