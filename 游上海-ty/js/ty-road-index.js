/**
 * Created by Administrator on 2017/5/24.
 */
/**
 * 地铁路线滑动
 */
$(function () {
    var ul = $(".passroad>ul");
    var lis = ul.find("li");
    var total = 0;
    lis.each(function (index, value) {
        total = total + $(this).outerWidth(true);
        console.log("width" + $(this).width());
        console.log("innerWidth" + $(this).innerWidth());
        console.log("outerWidth"+$(this).outerWidth(true));
    })
    ul.css({"width": total});
    var myScroll = new IScroll(".passroad", {
        scrollX: true,
        scrollY: false
    });
});