$(function () {
    //渲染页面
    render()

    //创建变量存放分类数据
    var cateData

    //封装渲染页面函数
    function render() {
        //获取本地存储数据
        cateData = JSON.parse(localStorage.getItem('sn_cateData'))
        //判断本地是否有存储数据并且存储时间是否超时
        if(cateData && Date.now() - cateData.time > 24*60*60*1000) {
            leftCateList()
            rightCateList(0)
        }else {
            getCateList()
        }
    }

    //封装获取分类数据函数
    function getCateList() {
        $.get('categories',function (result) {
            // console.log(result);
            //判断是否获取数据成功
            if(result.meta.status == 200) {              
                //将分类数据存放到本地存储中兵添加存放时间
                cateData = {'list': result,time: Date.now()}
                localStorage.setItem('sn_cateData',JSON.stringify(cateData))
                // console.log(cateData);
                
                leftCateList()
                rightCateList(0)
            } 
        },'json')
    }

    //封装渲染主体左侧导航栏函数
    function leftCateList() {
        var html = template('leftListTemp',cateData)
        // console.log(cateData);
        $('.left ul').html(html)
        //初始化IScroll
        var myScroll = new IScroll('.left');
        //添加点击时间 
        $('.left').on('tap','li',function () {
            $(this).addClass('active').siblings().removeClass('active')
            //使点击元素置顶
            myScroll.scrollToElement(this)

            //动态渲染二级分类数据
            var index =$(this).index()
            rightCateList(index)
        })
    }

    //封装渲染主体右侧二级分类函数
    function rightCateList(index) {
        var html = template('rightListTemp',cateData.list.data[index])
        console.log(cateData.list.data[index]);
        $('.rightList').html(html)

        var imgCount = ('.rightList img').length
        $('.rightList img').on('load',function () {
            imgCount --
            if(imgCount ==0){
                var myScroll = new IScroll('.right')
            }
        })
    }
})