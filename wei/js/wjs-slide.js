/**
 * Created by Administrator on 2017/5/17.
 */
$(function () {
    //提示工具条初始化代码
    $('[data-toggle="tooltip"]').tooltip();
    //轮播图部分
    var carousel = $(".carousel-inner");
    var items = $(".carousel-inner>.item");
    //console.log(items[1]);

    $(window).on("resize", function (e) {
        var width = $(window).width();
        //console.log(width)创建大图并显示
        if (width >= 768) {
            $(items).each(function (index, value) {
                var item = $(this);
                //console.log(item);
                var imgsrc = item.data('big');
                //console.log(imgsrc);
                item.html($('<a href="javascript:;" class="bigslide"></a>').css({"background": "url(" + imgsrc + ")"}));
            });
        } else if (width < 768) {
            $(items).each(function (index, value) {
                var item = $(this);
                //console.log(item);
                var imgsrc = item.data('small');
                //console.log(imgsrc);
                item.html('<a href="javascript:;" class="smallslide"><img src=' + imgsrc + ' alt=""></a>');
            })
        }
    }).trigger('resize');//给window对象绑定resize事件，让页面一开始就加载焦点图
    //移动端触摸功能
    var startX = 0;
    endX = 0, distance = 0;
    $(items).each(function (index, value) {
        var item = $(this);
        item[0].addEventListener('touchstart', function (e) {
            startX = e.targetTouches[0].clientX;
            console.log(startX);
        });
        item[0].addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            //console.log(endX);
            distance = endX - startX;
            //console.log(distance);
            if (distance > 0) {
                // 调用插件中封装的方法 .carousel('prev');
                carousel.carousel('prev');
            } else if (distance < 0) {
                carousel.carousel('next');
            }
        })
    })
    var ul = $(".tab_parent .nav-tabs");
    var lis = ul.find("li");
    //  定义ul的长度
    var totalwidth = 0;
    lis.each(function (index, value) {
        totalwidth = totalwidth + $(this).outerWidth(true);
        //console.log($(value));
        //console.log($(index));
        //console.log($(this));
        //console.log($(value).outerWidth(true));
        //console.log($(this).outerWidth(true));
    });
    //  设置ul的长度
    ul.css({"width": totalwidth});
    //  绑定触摸滑动插件
    var myScroll = new IScroll(".tab_parent", {
        //设置水平滑动参数，插件默认的是垂直滑动
        scrollX: true,
        scrollY: false
    });
});
