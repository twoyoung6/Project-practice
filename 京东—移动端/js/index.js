/**
 * 首页js
 */
window.onload = function() {
	var jd_search = document.querySelector('.jd_search');
	var banner = document.querySelector('.banner');
	var height = banner.offsetHeight;
	window.onscroll = function() {
		var top = document.body.scrollTop;
		if(top < height) {
			//初始化透明度
			var opacity = 0;
			//			计算透明度
			opacity = top / height;
			jd_search.style.background = 'rgba(223,35,34,' + opacity + ')';
		}
	};

	function timeBack() {
		var spans = document.querySelector('.sk_time').querySelectorAll('span');
		var totaltime = 5;
		var timer = setInterval(function() {
			totaltime--;
			if(totaltime < 0) {
				clearInterval(timer);
				document.querySelector('.sk_time').style.opacity = "0.4";
				return;
			}
			var hours = Math.floor(totaltime / 3600);
			var min = Math.floor(totaltime % 3600 / 60);
			var sec = Math.floor(totaltime % 60);

			spans[0].innerHTML = Math.floor(hours / 10);
			spans[1].innerHTML = Math.floor(hours % 10);
			spans[3].innerHTML = Math.floor(min / 10);
			spans[4].innerHTML = Math.floor(min % 10);
			spans[6].innerHTML = Math.floor(sec / 10);
			spans[7].innerHTML = Math.floor(sec % 10);
		}, 1000);
	}
	timeBack();

	/**
	 * 轮播图
	 */
	var banner = document.querySelector('.banner');
	var ul = banner.querySelector('ul:first-of-type');
	var img1 = banner.querySelector('li:first-of-type');
	var img2 = banner.querySelector('li:last-of-type');
	var slide = document.querySelector('.slide');
	//	在最前面插入最后一张,在最后面追加第一张
	ul.appendChild(img1.cloneNode(true));
	ul.insertBefore(img2.cloneNode(true), ul.firstChild);

	var bannerWidth = banner.offsetWidth;
	var lis = ul.querySelectorAll('li');
	var numb = lis.length;
	//	动态添加li按钮
	var btnul = document.createElement('ul');
	slide.appendChild(btnul);
	for(k = 0; k < numb - 2; k++) {
		var btnli = document.createElement('li');
		btnul.appendChild(btnli);
	}
	// 获取下面所有的li按钮
	var btns = slide.querySelectorAll('li');
	//	设置ul宽度
	ul.style.width = numb * bannerWidth + 'px';
	slide.querySelector('li:first-of-type').className = 'active';
	//	设置单个li的宽度
	for(i = 0; i < numb; i++) {
		lis[i].style.width = bannerWidth + 'px';
	}
	var index = 1,
		autoTime;
	//	设置初始的偏移
	ul.style.left = -bannerWidth + 'px';
	//	视口改变事件，触发动态生成轮播图的上面的样式
	window.onresize = function() {
		//		视口变化，实时获取banner宽度
		bannerWidth = banner.offsetWidth;
		//	重新设置ul宽度
		ul.style.width = numb * bannerWidth + 'px';
		//	重新设置单个li的宽度
		for(i = 0; i < numb; i++) {
			lis[i].style.width = bannerWidth + 'px';
		}
		//	重新设置初始的偏移，需要乘上当前索引值，这样不会在每次视口改变后而都从第一张开始轮播
		ul.style.left = -index * bannerWidth + 'px';
	};
	//	自动轮播
	//		按钮切换函数封装
	var mark = function(index) {
		for(j = 0; j < btns.length; j++) {
			btns[j].className = '';
		}
		if(index == numb - 1 || index == 0) {
			index = 1;
		}
		btns[index - 1].className = "active";
	}
	var autoPlay = function() {
		clearInterval(autoTime);
		autoTime = setInterval(function() {
			index++;
			ul.style.transition = 'left .5s ease-in-out';
			ul.style.left = (-index * bannerWidth) + 'px';
			// 下面的按钮跟着切换
			mark(index);
			//		判断是否到最后一张
			//		由于过渡属性的执行时间很短, 还没执行就被下面判断中的置为none,所以要加个延时定时器解决
			setTimeout(function() {
				if(index == numb - 1) {
					index = 1;
					ul.style.transition = 'none';
					ul.style.left = (-index * bannerWidth) + 'px';
					mark(index);
				};
			}, 500);
		}, 2000);
	};
	autoPlay();
	//	手指滑动焦点图
	var startX, moveX, distance, isEnd = true;
	//	touch事件的触发的前提：触摸的元素必须有具体的宽高值,在这里是清除了ul的浮动
	ul.addEventListener("touchstart", function(e) {
		//		获取触摸到屏幕时第一个手指对象的初始坐标
		startX = e.targetTouches[0].clientX;
	});
	//	手指滑动拖拽图片
	ul.addEventListener("touchmove", function(e) {
		if(isEnd) {
			//		暂停定时器,不然手指滑不动
			clearInterval(autoTime);
			//		去掉过渡效果
			ul.style.transition = 'none';
			//		获取手指移动的坐标
			moveX = e.targetTouches[0].clientX;
			distance = moveX - startX;
			ul.style.left = (-index * bannerWidth + distance) + 'px';
		}
	});
	//	手指滑动离开时,对于滑动的距离进行判断
	ul.addEventListener('touchend', function(e) {
		isEnd = false;
		// 		判断滑动距离是否大于100，有负有正
		if(Math.abs(distance) > 100) {
			//			判断弹性方向
			if(distance > 0) {
				//	弹到上一张
				index--;
			} else {
				//	弹到下一张
				index++;
			}
			ul.style.transition = 'left .5s ease-in-out';
			ul.style.left = -index * bannerWidth + 'px';
			mark(index);
		}
		//		确认用户真的滑动了,而不是点击了一下
		else if(distance > 0) {
			ul.style.transition = 'left .5s ease-in-out';
			ul.style.left = -index * bannerWidth + 'px';
			mark(index);
		}
		//	将所有上次move产生的滑动数据重置为0，不然下次拖拽的起始数据仍然是第一次滑动的distance；
		distance = 0;
		moveX = 0;
		startX = 0;
		// 		手指离开屏幕,重新启动自动轮播
		autoPlay();
	});
	//	手指滑动焦点图至最后和最前面一张时,等偏移过渡结束，需要对整个ul做下瞬间切换
	//	用到webkitTransitionEnd事件,监听过渡效果执行结束的事件
	ul.addEventListener('webkitTransitionEnd', function() {
		if(index == 0) {
			//			瞬间切换至倒数第二张图
			index = numb - 2;
			//			只在滑动到第一张和最后一张图时才触发过渡监听事件,所以偏移动作加载在判断中更节约性能
			ul.style.transition = 'none';
			ul.style.left = -index * bannerWidth + 'px';
		}
		//		瞬间跳转至第二张
		else if(index == numb - 1) {
			index = 1;
			ul.style.transition = 'none';
			ul.style.left = -index * bannerWidth + 'px';
		}
		mark(index);
		setTimeout(function() {
			isEnd = true;
			clearInterval(autoTime);
			autoPlay();
		}, 1000)
	});
};