/**
 * Created by Administrator on 2017/4/17.
 * 这个是平安之旅专区、同人专区及攻略专区的特效JS文件
 * @twoyoung
 */
window.onload = function () {
    /*1.0  轮播图*/
    var slide = document.getElementById("slide");
    var ol = document.getElementById("ol");
    var imgs = slide.children;//所有图片
    var ul = ol.children[0];
    var lis = ul.children;//所有按钮
    var imgw = imgs[0].offsetWidth;
    for (i = 0; i < lis.length; i++) {
        var li = lis[i];
        li.index = i;
        lis[0].className = "current";
        li.onmouseover = function () {
            for (j = 0; j < lis.length; j++) {
                lis[j].className = "";
            }
            this.className = "current";
            console.log(this);
            var target = -this.index * imgw;
            Move(slide, target);
        };

    }

    //下面部分是自动轮播函数部分
    var cur = 0;

    function move1() {
        cur++;
        var page = cur % 2 == 0 ? 1 : 0;//实现奇数时自动点击的效果，就移动对象
        for (j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        lis[page].className = "current";//按钮跟着一起变，这里不能用this，不然指向的是window对象
        var target = -page * imgw;
        Move(slide, target);
    }

    setInterval(move1, 3000);

    /*2.0  上移动画*/
    var bigimg = document.getElementById("bigimg");
    var as = bigimg.getElementsByTagName("a");//所有事件源
    var is;//移动对象
    for (i = 0; i < as.length; i++) {
        as[i].index = i;
        as[i].children[0].style.background = "url(twoyoung-img/index_z_4b6df7a.png) no-repeat " + (-1023 + (-i * 24)) + "px -142px";
        as[i].onmouseover = function () {
            is = as[this.index].children[0];
            animate(is, {"top": -10});
        };
        as[i].onmouseout = function () {
            animate(is, {"top": 5});
        };
    }

    /*3.0  蓝色云朵动画*/
    var taga = document.getElementById("taga");
    var list = document.getElementById("list");//下面所有的ul
    var ais = taga.getElementsByTagName("a");
    var ulw = list.children[0].offsetWidth;
    for (i = 1; i < ais.length; i++) {
        ais[i].index = i;
        var em = document.createElement("em");
        ais[i].appendChild(em);//创建em
        var ems = taga.getElementsByTagName("em");//所有动画对象
        animate(ems[0], {"opacity": 1, "top": 1})
        ais[i].onmouseover = function () {
            var emi;//当前移动对象
            emi = ais[this.index].children[1];
            //排他
            for (j = 0; j < ems.length; j++) {
                animate(ems[j], {"opacity": 0, "top": 10})
            }
            animate(emi, {"opacity": 1, "top": 1});
            var target = -(this.index - 1) * ulw;
            Move(list, target);
        };
    }

    /* 4.0  同人专区动画*/
    // 4.1.0 上部分导航动画
    // li为事件源，它的span和动态创建的em是动画对象
    var bar_r = document.getElementById("bar_r");
    var ult = bar_r.children[0];
    var lit = ult.children;//所有事件源
    var emt = ult.getElementsByTagName("em");
    var spat = ult.getElementsByTagName("span");
    var tempWrap = document.getElementById("tempWrap");//下面跟着匀速切换的对象
    var ulww = tempWrap.children[0].offsetWidth;//单个对象宽度
    //    动态给em添加图片
    for (i = 0; i < emt.length; i++) {
        emt[i].style.background = "url(twoyoung-img/icons_8a667d7.png) no-repeat " + (-11 + (-i * 155)) + "px 0px";
        for (j = 0; j < lit.length - 1; j++) {
            lit[j].index = j;
//            默认第一个有样式
            animate(emt[0], {"top": 25});
            animate(spat[0], {"marginTop": 2});
            lit[0].className = "current";
            lit[j].onmouseover = function () {
//                这里有三层排他，em、span、li
                for (k = 0; k < emt.length; k++) {
                    animate(emt[k], {"top": 76});
                    for (h = 0; h < spat.length; h++) {
                        animate(spat[k], {"marginTop": 20});
                    }
                    for (l = 0; l < lit.length - 1; l++) {
                        lit[l].className = "";
                        //animate(lit[l], {"borderBottom": 2, "height": 96});
                    }
                }
                //设置当前动画
                var emti;
                emti = lit[this.index].firstElementChild.lastElementChild;
                var spant = lit[this.index].firstElementChild.firstElementChild;
                animate(emti, {"top": 25});
                animate(spant, {"marginTop": 2});
                lit[this.index].className = "current";
                //这里有问题，动画函数设置上去的style行内样式无法排他清空
                // 4.2.0 下部分的切换动画
                var target1 = -this.index * ulww;
                Move(tempWrap, target1);
            };
        }
    }

    // 4.3.0 右侧的前往投稿的动画
    var tougao = document.getElementById("tougao");
    tougao.onmouseover = function () {
        animate(tougao, {"right": 0});
    };
    tougao.onmouseout = function () {
        animate(tougao, {"right": 10});
    };
};

/*下面的部分采用jQuery写*/
$(function () {
    /*5.0 图片遮罩，放大特效*/
    $("#tempWrap li").mouseover(function () {
        $(this).children("a").find("i").css({"opacity": 1});
        $(this).children("a").find("img").stop().animate({"opacity": 0.5, "width": 300, "height": 180, "margin": -6});
    });
    $("#tempWrap>ul").mouseout(function () {
        $("#tempWrap i").css({"opacity": 0});
        $("#tempWrap img").stop().animate({"opacity": 1, "width": 280, "height": 160, "margin": 0});
    });


    /*6.0  平安之旅，蓝色云朵动画 + Tab切换*/
    $("#safe>a:eq(1)>em").css({"opacity": 1, "top": -3});
    $("#safe>a").click(function () {
        $("#safe>a>em").css({"opacity": 0, "top": 10})
        $(this).children("em").css({"opacity": 1, "top": -3});
        /*console.log($(this).index());//2,4
         console.log($(".safe_b").index());//1
         console.log($(".zhujue").index());//2*/
        if ($(this).index() == 4) {
            $(".zhujue").show();
            $(".safe_b").hide();
        } else {
            $(".safe_b").show();
            $(".zhujue").hide();
        }
    });

    /*7.0 平安之旅，主角展示Tab切换*/
    //初始化
    $(".rzhujue>div:eq(0)").css({"opacity": 1});
    $(".rzhujue>div:eq(0)>img").css({"opacity": 1, "marginLeft": 0});
    $(".ltab>ul>li:eq(0)").css({"backgroundColor": "#fff", "border": "2px solid #000"});
    $(".ltab>ul>li:eq(0)>em").css({"opacity": 1});
    $(".ltab>ul>li").click(function () {
        // 右侧切换部分
        $(".rzhujue>div").css({"opacity": 0});
        var index = $(this).index();
        $(".rzhujue>div:eq(" + index + ")>img").css({"opacity": 0, "marginLeft": -60});
        $(".rzhujue>div:eq(" + index + ")").css({"opacity": 1});
        $(".rzhujue>div:eq(" + index + ")>img").animate({"opacity": 1, "marginLeft": 0});
        //按钮部分
        $(".ltab>ul>li").css({"backgroundColor": "", "border": "2px solid #fff"});
        $(".ltab>ul>li>em").css({"opacity": 0});
        $(this).css({"backgroundColor": "#fff", "border": "2px solid #000"});
        $(this).children("em").css({"opacity": 1});
    });

    /*8.0  英雄头像图片添加*/

    //8.0.1  头像遮罩特效
    $(".slideul li").mouseover(function () {
        $(".slideul em").css({"opacity": 0});
        $(this).find("em").css({"opacity": 1});
    });
    $(".slideul li").mouseout(function () {
        $(".slideul em").css({"opacity": 0});
    });

    /*9.0  全部式神左右切换部分*/
    //9.0.1 左右切换
    var i = 0;//记录点击次数
    $(".rarr").click(function () {
        i++;
        console.log(i);
        if (i <= 3) {
            $(".slideul").css({"left": -804 * i});
            $(".larr").css({"display": "block"});
        } else {
            $(".rarr").css({"display": "none"});
        }
    });
    $(".larr").click(function () {
        i--;
        console.log(i);
        if (i >= 0) {
            $(".slideul").css({"left": -804 * i});
            $(".rarr").css({"display": "block"});
        } else {
            $(".larr").css({"display": "none"});
        }
    });

    //10.0 搜索简单验证
    $(".btnsearch").click(function () {
        if ($("#searchtext").val() == "") {
            $("#searchtext").val("你输的是什么鬼？");
            $("#searchtext").css({"color": "#D61112"});
        }
    })
    $("#searchtext").keydown(event, function () {
        if (event.keyCode == 13) {
            if ($("#searchtext").val() == "" || /[^\u4e00-\u9fa5]/.test($("#searchtext").val())) {
                $("#searchtext").val("你输的是什么鬼？");
                $("#searchtext").css({"color": "#D61112"});
            }
        }
    })
});//函数加载结束

/*
 取 ID 和 变量名 是一件很痛苦的事情啊，一不小心就重复了，各种小问题啊！
 */
