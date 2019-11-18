/**
 * Created by Administrator on 2017/4/2.
 * ��������з�װ�ļ��ݼ����������ļ�
 * @twoyoung
 */
/**
 * ��ȡҳ���ı����ݼ����Դ���
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
 * ����ҳ���ı����ݼ����Դ���
 * @param element
 * @param str
 */
function setText(element, str) {
    if (typeof element.innerText == "string") {
        element.innerText = str;//��������
    }
    else {
        element.text.Content = str;
    }
}
/**
 * ��ȡ��һ���ֵ�Ԫ�أ�ͬ�����ļ����Դ���
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
 * ��ȡ��һ���ֵ�Ԫ�صļ����Ժ���
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
 * ��ȡ������ʽ�ļ�����д��
 * @param ele
 * @returns {*}
 */
function getStyle(ele) {
    if (ele.currentStyle) {
        return ele.currentStyle;//ֻ��IEʶ��
    }
    else {
        return getComputedStyle(ele, null);//IE678��ʶ��
    }
}

/**
 * ��ȡ��һ����Ԫ�صļ����Ժ���
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
            next = next.nextSibling;//����Ѱ����Ԫ�ص��ֵܽڵ㣬ֱ��ΪԪ�ؽڵ�
        }
    }
    return next;
}
/**
 * ��ȡ���һ����Ԫ�صļ����Ժ���
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
            next = next.nextSibling;//����Ѱ���ӽڵ���ֵܽڵ㣬ֱ��ΪԪ�ؽڵ�
        }
    }
    return next;
}
/**
 * �������������Դ�����
 * @param ele
 * @param classname
 * @returns {*}
 */
function getClassName(ele, classname) {
    if (ele.getElementsByClassName(classname)) {
        return ele.getElementsByClassName(classname);
    }
    //Ѱ�����еı�ǩ�ڵ㣬���������Ƿ���������Ҫ������
    else {
        var newarr = [];
        var elements = ele.getElementsByTagName("*");//ͨ�����ʾele�µ����б�ǩ
        for (i = 0; i < elements.length; i++) {
            //������ele�µ����б�ǩ�в�������
            var filterArr = elements[i].split(" ");
            //�ÿ��ַ����и����б�ǩ��
            for (j = 0; j < filterArr.length; j++) {
                if (filterArr[i] == classname) {
                    newarr.push(elements[i]);
                    break;
                }
            }
            return newarr;//�����ҵ�ͬ������Ԫ�ؼ���
        }
    }
}
/**
 * �滻��������
 * @param ele
 * @param newclass
 * @param oldclass
 */
function replaceClassName(ele, newclass, oldclass) {
    var arr = ele.className.split(" ");//�ÿո��и������ַ������洢������
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == oldclass) {
            arr[i] = newclass;
        }
    }
    ele.className = arr.join(" ");
}
/**
 * �����ֲ�ͼ��������
 * @param obj
 * @param target
 * @constructor
 */
function Move(obj, target) {
    clearInterval(obj.time);
    var target;
    //��̬��ȡ����ĳ�ʼleftֵ
    var leader = obj.offsetLeft;
    obj.time = setInterval(function () {
        var step = 30;
        //��step���������Խ��������ƶ�
        step = leader < target ? step : -step;
//            �ж��ƶ��������ڶ���ʱ�Ƿ񻹿��Լ����ƶ�
        if (Math.abs(leader - target) > Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        }
        else {
            obj.style.left = target + "px";//�������Ǽӵ�λ������������
            clearInterval(obj.time);
        }
    }, 15)
}

/**
 * ������������
 * @param obj
 * @param target
 */
//����������ܷ�װ5.0���հ�,���޸Ķ��������ʽ����ӿ��޸Ĳ���px�����ԣ�opacity,zIndex��
function animate(obj, json, fn) {
    clearInterval(obj.time);
    obj.time = setInterval(function () {
        var flag = true;//����ÿ�������Ѿ������޸ĵ�Ŀ�ĵ�
        for (var k in json) {
            //͸���ȵ�������
            if (k == "opacity") {
                //��ȡָ�������ָ������ֵ��Ϊ�ַ���
                var leader = getStyle(obj, k) * 100;
                var step = (json[k] * 100 - leader) / 15;
                //����ȡ����Ϊ�˱��ֻ�������ܵ���Ŀ��λ��
                //���󻺶�ʱ��ֵС����ʱ����ȡ������һֱȡ���㣬������Ҫ����ȡ��
                var step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //����ָ�����ԣ�����attr��ֵ���ǵüӵ�λ
                obj.style[k] = leader / 100;
            } else if (k == "zIndex") {
                obj.style[k] = json[k];//�㼶ֱ�����ò���Ҫ����
            } else {
                //��ȡָ�������ָ������ֵ��Ϊ�ַ���
                var leader = parseInt(getStyle(obj, k)) || 0;//0Ϊ�˼��ݲ���px��λ������
                var step = (json[k] - leader) / 10;
                //����ȡ����Ϊ�˱��ֻ�������ܵ���Ŀ��λ��
                //���󻺶�ʱ��ֵС����ʱ����ȡ������һֱȡ���㣬������Ҫ����ȡ��
                var step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //����ָ�����ԣ�����attr��ֵ���ǵüӵ�λ
                obj.style[k] = leader + "px";
            }
            //�жϵ�ǰ�����޸��Ƿ񵽴�Ŀ�ĵ�
            if (leader !== json[k]) {
                flag = false;
            }
        }
        //ѭ���ⲿ�ж����������޸��Ƿ��Ѿ� ����Ŀ�ĵأ����Ϊtrue,�������ʱ��ѭ��
        if (flag) {
            clearInterval(obj.time);
            //�ص���������������ִ��λ��
            if (fn) {
                fn();
            }
        }
    }, 15)
}
//    ��ȡ�������ʽ����ֵ��������,��,��,left,top��
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
/**
 * ��ȡ����֮�����ʽ���������Դ���
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
 * ��ȡ���ڿ�������Ŀ�ߺ���
 * @returns {{width: number, width: number}}
 */
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
/**
 * ��ȡҳ�汻��ȥ������ȺͶ����߶�
 * @returns {{top: number, left: number}}
 */
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    };
}
/**
 * ��ȡ�¼�����ļ��ݷ�װ
 * @param event
 * @returns {*|Event}
 */
function getEvent(event) {
    return event || window.event;
}
/**
 * ��ȡ���ˮƽ����ļ��ݺ�����װ
 * @param event
 * @returns {number|Number|*}
 */
function getPageX(event) {
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
/**
 * ��ȡ�����ֱ����ļ��ݺ�����װ
 * @param event
 * @returns {number|Number|*}
 */
function getPageY(event) {
    return event.pageY || event.clientY + document.documentElement.scrollTop;
}
/**
 * ��ֹ�¼�ð�ݵļ��ݺ�����װ
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
 * ��ȡ�¼�����Ŀ�������д��
 * @param event
 * @returns {*|Element|Object}
 */
function getTarget(event) {
    return event.target || event.srcElement;
}
/**
 * event�¼����󹤾߰���װ
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