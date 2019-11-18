/**
 * Created by Administrator on 2017/5/2.
 */
$(function () {
    /**
     * 切换图片
     */
    var $smallul = $("#smallul"),
        $bigimg = $("#bigimg"),
        $arrow = $("#arrow"),
        $smallArea = $("#smallArea"),
        $bigArea = $("#bigArea"),
        index = 0;
    $bigimg.find("img:eq(0)").show().siblings("img").hide();
    $smallul.find("li:eq(0)").addClass("hover");
    $smallul.find("li").mouseover(function () {
        index = $(this).index();
        $(this).addClass("hover").siblings("li").removeClass("hover");
        $bigimg.find("img:eq(" + index + ")").show().siblings("img").hide();
    });

    /**
     * 放大镜效果
     */
    $bigimg.mousemove(function (e) {
        $smallArea.show();
        $bigArea.show();
        $bigArea.find("img:eq(" + index + ")").show();
//                鼠标在盒子中的坐标
        var siY = e.pageY - $bigimg.find("img:eq(" + index + ")").offset().top;
        var siX = e.pageX - $bigimg.find("img:eq(" + index + ")").offset().left;
//                遮罩的坐标
        var saY = siY - $smallArea.height() / 2;
        var saX = siX - $smallArea.width() / 2;
        var sizeY = $bigimg.find("img").height() - $smallArea.height();
        var sizeX = $bigimg.find("img").width() - $smallArea.width();
//                限定遮罩的移动范围
        if (saY < 0) {
            saY = 0;
        }
        if (saY > sizeY) {
            saY = sizeY;
        }
        if (saX < 0) {
            saX = 0;
        }
        if (saX > sizeX) {
            saX = sizeX;
        }
//                让遮罩跟着鼠标移动
        $smallArea.css({"left": saX, "top": saY});

//            让大图跟着移动显示
        var rate = sizeY / ($bigArea.find("img").height() - $bigArea.height());//相对距离比率
        var biY = -saY / rate;
        var biX = -saX / rate;
        $bigArea.find("img").css({"top": biY, "left": biX});
    }).mouseout(function () {
        $smallArea.hide();
        $bigArea.hide();
        $bigArea.find("img").hide();
    });

    /**
     *  倒三角旋转
     */
    var $triangle1 = $("#triangle1"),
        $triangle2 = $("#triangle2"),
        $triangle3 = $("#triangle3"),
        $triangle4 = $("#triangle4"),
        $nowhy = $("#nowhy"),
        $prolong = $("#prolong"),
        $screen = $("#screen"),
        $map = $("#map");
    $triangle1.mouseover(function () {
        $(this).find("i").css({"transform": "rotateX(180deg)"});
        $map.show();
        $map.find("li").click(function () {
            var value1 = $(this).find("span").text();
            var value2 = $(this).find("em").text();
            $triangle1.find("dd").text(value1 + " " + value2);
            $(this).find("input").prop("checked", true);
            $(this).siblings("li").find("input").prop("checked", false);
            $map.hide();
            $(this).find("i").css({"transform": "rotateX(0deg)"});
            $(this).parent().parent().parent().css({"borderColor": "#C81623"});
        });
    }).mouseout(function () {
        $(this).find("i").css({"transform": "rotateX(0deg)"});
        $map.hide();
    });
    $triangle2.mouseover(function () {
        $(this).find("i").css({"transform": "rotateX(180deg)"});
        $nowhy.show();
        $nowhy.find("li").click(function () {
            var value1 = $(this).find("span").text();
            var value2 = $(this).find("em").text();
            $triangle2.find("dd").text(value1 + " " + value2);
            $(this).find("input").prop("checked", true);
            $(this).siblings("li").find("input").prop("checked", false);
            $nowhy.hide();
            $(this).find("i").css({"transform": "rotateX(0deg)"});
            $(this).parent().parent().parent().css({"borderColor": "#C81623"});
        });
    }).mouseout(function () {
        $(this).find("i").css({"transform": "rotateX(0deg)"});
        $nowhy.hide();
    });
    $triangle3.mouseover(function () {
        $(this).find("i").css({"transform": "rotateX(180deg)"});
        $prolong.show();
        $prolong.find("li").click(function () {
            var value1 = $(this).find("span").text();
            var value2 = $(this).find("em").text();
            $triangle3.find("dd").text(value1 + " " + value2);
            $(this).find("input").prop("checked", true);
            $(this).siblings("li").find("input").prop("checked", false);
            $prolong.hide();
            $(this).find("i").css({"transform": "rotateX(0deg)"});
            $(this).parent().parent().parent().css({"borderColor": "#C81623"});
        });
    }).mouseout(function () {
        $(this).find("i").css({"transform": "rotateX(0deg)"});
        $prolong.hide();
    });
    $triangle4.mouseover(function () {
        $(this).find("i").css({"transform": "rotateX(180deg)"});
        $screen.show();
        $screen.find("li").click(function () {
            var value1 = $(this).find("span").text();
            var value2 = $(this).find("em").text();
            $triangle4.find("dd").text(value1 + " " + value2);
            $(this).find("input").prop("checked", true);
            $(this).siblings("li").find("input").prop("checked", false);
            $screen.hide();
            $(this).find("i").css({"transform": "rotateX(0deg)"});
            $(this).parent().parent().parent().css({"borderColor": "#C81623"});
        });
    }).mouseout(function () {
        $(this).find("i").css({"transform": "rotateX(0deg)"});
        $screen.hide();
    });

    /**
     * 选中添加边框
     */
    $cover = $("#cover"),
        $stage = $("#stage");
    $cover.find("a").click(function () {
        $(this).toggleClass("hover").siblings("a").removeClass("hover");
    });
    $stage.find("a").click(function () {
        $(this).toggleClass("hover").siblings("a").removeClass("hover");
    });

    /**
     * 购买多件计数
     */
    var $plus = $("#plus"),
        $numb = $("#numb"),
        $sub = $("#sub"),
        numb = 1;
    console.dir($plus);
    $plus.click(function () {
        $sub.css({"backgroundColor": "#ededed"});
        if (numb < 6) {
            numb = parseInt($numb.prop("value")) + 1;
            $numb.prop("value", numb);
        } else {
            $plus.css({"disabled": "disabled", "backgroundColor": "#fff"});
        }
    });
    $sub.click(function () {
        $plus.css({"backgroundColor": "#ededed"});
        if (numb > 1) {
            numb = parseInt($numb.prop("value")) - 1;
            $numb.prop("value", numb);
        } else {
            $sub.css({"disabled": "disabled", "backgroundColor": "#fff"});
        }
    });
    /**
     * msg提示
     */
    $("#security-msg").mouseover(function () {
        $("#msg1").show();
    }).mouseout(function () {
        $("#msg1").hide();
    });
    $("#stage-msg").mouseover(function () {
        $("#msg2").show();
    }).mouseout(function () {
        $("#msg2").hide();
    });
});