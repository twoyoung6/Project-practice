/**
 * Created by Administrator on 2017/4/7.
 */
window.onload = function () {
    var inp = document.getElementById("inp");
    var isOk = true;
    var isClick = false;
    inp.onfocus = function () {
        if (this.value == "�ֻ�" && isOk == true) {
            this.value = "";
        }
    }
    inp.onblur = function () {
        if (this.value == "") {
            this.value = "�ֻ�";
            isOk = true;
        }
//        ��ʧȥ����,�Ƴ����д�������������
        if (isClick) {
            var div = document.getElementById("pop");
            if (div) {
                box.removeChild(div);
            }
        }
    }
    inp.onkeyup = function () {
        if (this.value == "�ֻ�") {
            isOk = false;
        }
    }
    var box = document.getElementById("box");
    var datas = ["С���ֻ�", "��Ϊ�ֻ�", "note�ֻ�", "��Ϊ�ֻ�", "ƻ�������ֻ�"];
    inp.onkeyup = function () {
        //����Ĵ�������д�ڷ�������֮��
        var newDatas = [];
        for (i = 0; i < datas.length; i++) {
            var data = datas[i];
            var index = data.indexOf(this.value);
            if (index != -1) {
                newDatas.push(data);
            }
        }
        //����Ѿ������˺��ӣ�ɾ����֮ǰ�ĺ���
        var div = document.getElementById("pop");
        if (div) {
            box.removeChild(div);
        }
        //��������Ϊ���򲻴�������
        if (this.value == "") {
            return;
        }
        //���û��ƥ�����ݲ���������
        if (newDatas.length == 0) {
            return;
        }
        //��������
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
//            ���ѡ�������������е�ѡ��,�Ͱ�ѡ�е��������������򣬲�������к���
            var lis = div.getElementsByTagName("li");
            for (i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    isClick = false;
//                �����ѡ�е�li���ݴ���������value,ʵ�ֲ���
                    inp.value = this.innerHTML;//δʵ��
                    box.removeChild(div);
                }
            }
        }
    };

}
