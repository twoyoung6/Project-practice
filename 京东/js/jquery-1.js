/**
 * Created by Administrator on 2017/4/7.
 */
window.onload = function () {
    var inp = document.getElementById("inp");
    var isOk = true;
    var isClick = false;
    inp.onfocus = function () {
        if (this.value == "手环" && isOk == true) {
            this.value = "";
        }
    }
    inp.onblur = function () {
        if (this.value == "") {
            this.value = "手环";
            isOk = true;
        }
//        当失去焦点,移除所有创建的下拉盒子
        if (isClick) {
            var div = document.getElementById("pop");
            if (div) {
                box.removeChild(div);
            }
        }
    }
    inp.onkeyup = function () {
        if (this.value == "手环") {
            isOk = false;
        }
    }
    var box = document.getElementById("box");
    var datas = ["小米手环", "华为手环", "note手环", "华为手机", "苹果智能手机"];
    inp.onkeyup = function () {
        //数组的创建必须写在方法函数之内
        var newDatas = [];
        for (i = 0; i < datas.length; i++) {
            var data = datas[i];
            var index = data.indexOf(this.value);
            if (index != -1) {
                newDatas.push(data);
            }
        }
        //如果已经创建了盒子，删除掉之前的盒子
        var div = document.getElementById("pop");
        if (div) {
            box.removeChild(div);
        }
        //如果输入框为空则不创建盒子
        if (this.value == "") {
            return;
        }
        //如果没有匹配数据不创建盒子
        if (newDatas.length == 0) {
            return;
        }
        //创建盒子
        var div = document.createElement("div");
        box.appendChild(div);
        div.id = "pop";
        var ul = document.createElement("ul");
        div.appendChild(ul);
        for (i = 0; i < newDatas.length; i++) {
            var newdata = newDatas[i];
            var li = document.createElement("li");
            li.innerHTML = newdata;
            ul.appendChild(li);
//            如果选中了下拉盒子中的选项,就把选中的内容输入搜索框，并清除所有盒子
            var lis = div.getElementsByTagName("li");
            for (i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    isClick = false;
//                将点击选中的li内容传给输入框的value,实现不了
                    inp.value = this.innerHTML;//未实现
                    box.removeChild(div);
                }
            }
        }
    };

}
