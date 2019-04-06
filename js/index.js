$(function () {
    banner()
    itemList()

    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });
})

//生成轮播图
function banner() {
    $.ajax({
        type: 'get',
        url: 'home/swiperdata',
        dataType: 'json',
        success: function (result) {
            //数据相应成功才生成结构 节省系统资源
            if(result.meta.status == 200) {
                // console.log(result);
            var html = template('sn_bannnerSlider',result)
            // console.log(html);
            $('.mui-slider .mui-slider-loop').html(html)
            var indicatorTemp = template('sn_bannerIndicator',result)
            // console.log(indicatorTemp);
            
            $('.mui-slider .mui-slider-indicator').html(indicatorTemp)
            mui('.mui-slider').slider({
                interval: 2000
            })
            }
        }
    })
}

//生成主体产品栏
function itemList() {
    $.ajax({
        type: 'get',
        url: 'home/goodslist',
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            var html = template('snitem',result)
            // console.log(html);
            $('.sn_itemList .sn_item').html(html)
        }
    })
}