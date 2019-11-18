/**
 * Created by Administrator on 2017/4/2.
 * 这个是所有封装的兼容及动画函数文件
 * @twoyoung
 */
/**
 * 获取页面文本内容兼容性处理
 * @param element
 * @returns {*}
 */
function getText(element) {
    if (typeof element.innerText == "string") {
        return element.innerText;
    }
    else {
        return element.textContent;
    }
}
/**
 * 设置页面文本内容兼容性处理
 * @param element
 * @param str
 */
function setText(element, str) {
    if (typeof element.innerText == "string") {
        element.innerText = str;//设置内容
    }
    else {
        element.text.Content = str;
    }
}
/**
 * 获取下一个兄弟元素（同级）的兼容性处理
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    }
    else {
        var next = element.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容性函数
 * @param element
 * @returns {*}
 */
function getPreviosElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    }
    else {
        var pre = element.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
}
/**
 * 获取内联样式的兼容性写法
 * @param ele
 * @returns {*}
 */
function getStyle(ele) {
    if (ele.currentStyle) {
        return ele.currentStyle;//只有IE识别
    }
    else {
        return getComputedStyle(ele, null);//IE678不识别
    }
}

/**
 * 获取第一个子元素的兼容性函数
 * @param ele
 * @returns {Element}
 */
function getNextChild(ele) {
    if (ele.firstElementChild) {
        return ele.firstElementChild;
    }
    else {
        var next = ele.firstElementChild;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;//继续寻找子元素的兄弟节点，直到为元素节点
        }
    }
    return next;
}
/**
 * 获取最后一个子元素的兼容性函数
 * @param ele
 * @returns {Element}
 */
function getLastChild(ele) {
    if (ele.lastElementChild) {
        return ele.lastElementChild;
    }
    else {
        var next = ele.lastElementChild;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;//继续寻找子节点的兄弟节点，直到为元素节点
        }
    }
    return next;
}
/**
 * 查找类名兼容性处理函数
 * @param ele
 * @param classname
 * @returns {*}
 */
function getClassName(ele, classname) {
    if (ele.getElementsByClassName(classname)) {
        return ele.getElementsByClassName(classname);
    }
    //寻找所有的标签节点，遍历查找是否有我们需要的类名
    else {
        var newarr = [];
        var elements = ele.getElementsByTagName("*");//通配符表示ele下的所有标签
        for (i = 0; i < elements.length; i++) {
            //在所有ele下的所有标签中查找类名
            var filterArr = elements[i].split(" ");
            //用空字符串切割所有标签名
            for (j = 0; j < filterArr.length; j++) {
                if (filterArr[i] == classname) {
                    newarr.push(elements[i]);
                    break;
                }
            }
            return newarr;//所有找的同类名的元素集合
        }
    }
}
/**
 * 替换类名函数
 * @param ele
 * @param newclass
 * @param oldclass
 */
function replaceClassName(ele, newclass, oldclass) {
    var arr = ele.className.split(" ");//用空格切割类名字符串，存储到数组
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == oldclass) {
            arr[i] = newclass;
        }
    }
    ele.className = arr.join(" ");
}
/**
 * 匀速轮播图动画函数
 * @param obj
 * @param target
 * @constructor
 */
function Move(obj, target) {
    clearInterval(obj.time);
    var target;
    //动态获取对象的初始left值
    var leader = obj.offsetLeft;
    obj.time = setInterval(function () {
        var step = 30;
        //让step有正负可以进行左右移动
        step = leader < target ? step : -step;
//            判断移动至倒数第二步时是否还可以继续移动
        if (Math.abs(leader - target) > Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        }
        else {
            obj.style.left = target + "px";//总是忘记加单位，啊啊啊啊啊
            clearInterval(obj.time);
        }
    }, 15)
}

/**
 * 缓动动画函数
 * @param obj
 * @param target
 */
//缓动动画框架封装5.0最终版,可修改多个属性样式，添加可修改不带px的属性（opacity,zIndex）
function animate(obj, json, fn) {
    clearInterval(obj.time);
    obj.time = setInterval(function () {
        var flag = true;//假设每个属性已经到达修改的目的地
        for (var k in json) {
            //透明度单独处理
            if (k == "opacity") {
                //获取指定对象的指定属性值，为字符串
                var leader = getStyle(obj, k) * 100;
                var step = (json[k] * 100 - leader) / 15;
                //向上取整是为了保持缓动最后能到达目标位置
                //向左缓动时，值小于零时向上取整，会一直取到零，所以需要向下取整
                var step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //传入指定属性，设置attr的值，记得加单位
                obj.style[k] = leader / 100;
            } else if (k == "zIndex") {
                obj.style[k] = json[k];//层级直接设置不需要渐变
            } else {
                //获取指定对象的指定属性值，为字符串
                var leader = parseInt(getStyle(obj, k)) || 0;//0为了兼容不带px单位的属性
                var step = (json[k] - leader) / 10;
                //向上取整是为了保持缓动最后能到达目标位置
                //向左缓动时，值小于零时向上取整，会一直取到零，所以需要向下取整
                var step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //传入指定属性，设置attr的值，记得加单位
                obj.style[k] = leader + "px";
            }
            //判断当前属性修改是否到达目的地
            if (leader !== json[k]) {
                flag = false;
            }
        }
        //循环外部判断所有属性修改是否已经 到达目的地，如果为true,则清除定时器循环
        if (flag) {
            clearInterval(obj.time);
            //回调函数的真正调用执行位置
            if (fn) {
                fn();
            }
        }
    }, 15)
}
//    获取计算后样式属性值函数（长,宽,高,left,top）
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
/**
 * 获取计算之后的样式函数兼容性处理
 * @param obj
 * @param attr
 * @returns {*}
 */
function getNewStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    }
    else {
        return obj.currentStyle[attr];
    }
}
/**
 * 获取窗口可视区域的宽高函数
 * @returns {{width: number, width: number}}
 */
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
/**
 * 获取页面被卷去的左侧宽度和顶部高度
 * @returns {{top: number, left: number}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    };
}
/**
 * 获取事件对象的兼容封装
 * @param event
 * @returns {*|Event}
 */
function getEvent(event) {
    return event || window.event;
}
/**
 * 获取鼠标水平坐标的兼容函数封装
 * @param event
 * @returns {number|Number|*}
 */
function getPageX(event) {
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
/**
 * 获取鼠标竖直坐标的兼容函数封装
 * @param event
 * @returns {number|Number|*}
 */
function getPageY(event) {
    return event.pageY || event.clientY + document.documentElement.scrollTop;
}
/**
 * 阻止事件冒泡的兼容函数封装
 * @param event
 */
function stopPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
/**
 * 获取事件对象目标兼容性写法
 * @param event
 * @returns {*|Element|Object}
 */
function getTarget(event) {
    return event.target || event.srcElement;
}
/**
 * event事件对象工具包封装
 * @type {{getEvent: Function, getPageX: Function, getPageY: Function, stopPropagation: Function, getTarget: Function}}
 */
var eventTools = {
    getEvent: function (event) {
        return event || window.event;
    },
    getPageX: function (event) {
        return event.pageX || event.clientX + document.documentElement.scrollLeft;
    },
    getPageY: function (event) {
        return event.pageY || event.clientY + document.documentElement.scrollTop;
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};