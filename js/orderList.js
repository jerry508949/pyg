$(function () {
   $.ajax({
       type: 'get',
       url: 'my/orders/all',
       dataType: 'json',
       success: function (result) {
        //    console.log(result);
        var html = template('orderDetailsTemp',result)
        console.log(html);
        $('.orderDetails').html(html)
       }
   })
})