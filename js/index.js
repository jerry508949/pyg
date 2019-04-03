$(function () {
    banner()
    itemList()
})

//生成轮播图
function banner() {
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
        dataType: 'json',
        success: function (result) {
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
    })
}

//生成主体产品栏
function itemList() {
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/home/goodslist',
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            var html = template('snitem',result)
            console.log(html);
            $('.sn_itemList .sn_item').html(html)
        }
    })
}