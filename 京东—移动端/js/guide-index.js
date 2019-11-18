/**
 * Created by Administrator on 2017/5/15.
 */
window.onload = function () {
    var guide = document.querySelector(".guide");
    var guidelist = guide.querySelector("ul:first-of-type");
    var lis = guidelist.querySelectorAll('li');
    var index;
    var distance = guide.offsetHeight - guidelist.offsetHeight;
    var rightscroll = new IScroll('#detail_b', {
        scrollbars: true,
        mouseWheel: true
    });

    //滑动事件
    //计算静止状态最大最小范围
    var maxTop = 0, minTop = distance;
    //计算互动状态下最大最小范围
    var maxheight = maxTop + 100, minheight = minTop + 100;
    //记录手指开始触摸的起始位置
    var startY = 0, endY = 0, distanceY = 0, currentY = 0;
    guidelist.addEventListener("touchstart", function (e) {
        startY = e.targetTouches[0].clientY;
    })

    guidelist.addEventListener("touchmove", function (e) {
        endY = e.targetTouches[0].clientY;
        distanceY = endY - startY;
        if (currentY + distanceY > maxTop || currentY + distanceY < minTop) {
            return;
        }
        guidelist.style.transition = "none";
        guidelist.style.top = (currentY + distanceY) + "px";
    });
    guidelist.addEventListener("touchend", function (e) {
        //每次触摸结束记录当前的偏移位置，用于下次的偏移

        if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            guidelist.style.transition = "top .6s";
            guidelist.style.top = maxTop + "px";
        } else if (currentY + distanceY < minTop) {
            currentY = minTop;
            guidelist.style.transition = "top .6s";
            guidelist.style.top = minTop + "px";
        } else {
            currentY += distanceY;
        }
    })

    //fastclick的固定代码
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }
    //绑定fastclick事件
    guidelist.addEventListener('click', function (e) {
        for (i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
            //为每一个li 自定义索引
            lis[i].index = i;
        }
        var li = e.target.parentNode;
        li.classList.add('active');
        // 单个li的高度
        var liheight = li.offsetHeight;
        index = li.index;
        //console.log(li.index);
        //console.log(-index * liheight);
        //限制点击上移的最小距离，不能小于ul-父盒子的高度
        if (-index * liheight < distance) {
            guidelist.style.top = minTop + "px";
            currentY = minTop;
        } else {
            guidelist.style.transition = "top .6s";
            guidelist.style.top = -index * liheight + "px";
            currentY = -index * liheight;
        }
    });
};


