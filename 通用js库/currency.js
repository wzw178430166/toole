function getQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}
function goo(url,param){
	var param = arguments[1]?arguments[1]:{};
	if (url) {
		if (param) {//辅助参数 object类型 {}
			if (param.is_auth&&!Cookies.get('user_id')) {
				url = '/member/login.html?&forward='+encodeURIComponent(url);
			}
		}
		if ('replace' == param.type) {
			window.location.replace(url)
		} else {
			window.location.href = url;
		}
	} else {
		return false;
	}
}
function goback(){
	var referrer = window.document.referrer;
	if (-1 != referrer.indexOf('login')) {
		var url = '';
		if (Cookies.get('role_id')) {
			var role_id = parseInt(Cookies.get('role_id'));
			switch(role_id){
				case 5:
					url = '/core_bs/';
					break;
				case 13:
					url = '/core_jm/';
					break;
			}
		} else {
			url = referrer;//默认前往
		}
		goo(url,{type: "replace"});
	} else {
		window.history.back();
	}

}
//判断是否页面出现滚动条
function isScrollY() {
	return document.documentElement.offsetHeight > document.documentElement.clientHeight;
}
//获取当前日期时间
function getCurrentDateTime(param){
	var result = '';
	var param = arguments[0]?arguments[0]:{};
	var defaultFormat = {
		year: "yyyy",
		month: "yyyy-MM",
		date: "yyyy-MM-dd",
		time: "HH:mm:ss",
		datetime: "yyyy-MM-dd HH:mm:ss",
	};
	var weeks = ['周日','周一','周二','周三','周四','周五','周六'];
	/*var weeks = [
		{'name':'周日'},
		{'name':'周一'},
		{'name':'周二'},
		{'name':'周三'},
		{'name':'周四'},
		{'name':'周五'},
		{'name':'周六'},
	];*/

	var date = param.timestamp?new Date(param.timestamp):new Date();
	var year = date.getFullYear();
	var month = (9>date.getMonth()?'0':'') + (date.getMonth() + 1);
	var day = (10>date.getDate()?'0':'') + date.getDate();
	var hour = (10>date.getHours()?'0':'') + date.getHours();
	var minute = (10>date.getMinutes()?'0':'') + date.getMinutes();
	var second = (10>date.getSeconds()?'0':'') + date.getSeconds();
	var systemdate = {
		"yyyy|y": year,
		"MM|M": month,
		"dd|d": day,
		"HH|H": hour,
		"mm|m": minute,
		"ss|s": second,
	};
	var week = date.getDay();
	var type = param&&param.type?param.type:'datetime';
	if ('week' == type) {
		result = weeks[week];
	} else {
		var format = param&&param.format?param.format:defaultFormat[type];
		for(var k in systemdate){
			var info = systemdate[k];
			if (new RegExp("(" + k + ")").test(format)) {
				//console.log(k + '===' + RegExp.$1 + '====' + RegExp.$1.length);
				//format = format.replace( RegExp.$1, (RegExp.$1.length == 1) ? (info) : (("00" + info).substr(("" + info).length)));
            	format = format.replace( RegExp.$1, info);
        	}
        }
        result = format;
	}
	return result;
}
//获取定位
function _location(param){
	var param = arguments[0]?arguments[0]:{};
	var _lng = _lat = 0;
	var address = '';
	if (navigator.geolocation){
		$('#address').val('正在定位中...');
		navigator.geolocation.getCurrentPosition(function(position){
			//GPS坐标
			var x = position.coords.longitude;
			var y = position.coords.latitude;
			_lng = x;
			_lat = y;
			$('#lng').val(x);
			$('#lat').val(y);
			var ggPoint = new BMap.Point(x,y);
			//坐标转换完之后的回调函数
			translateCallback = function (data){
				if(data.status === 0) {
					var point = data.points[0];
					var geoc = new BMap.Geocoder();
					geoc.getLocation(point, function(rs){
						var addComp = rs.addressComponents;
						//alert(JSON.stringify(addComp));
						address = addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;
						$('#address').val(address);
						if (param.success) param.success({"lng":_lng,"lat":_lat,"province":addComp.province,"city":addComp.city,"district":addComp.district,"street":addComp.street,"address":address});
						//alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					});
				}
			}

			setTimeout(function(){
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(ggPoint);
				convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1000);
		},function(error){
			switch(error.code) {
				case error.PERMISSION_DENIED:
					console.log("定位失败,用户拒绝请求地理定位");
					break;
				case error.POSITION_UNAVAILABLE:
					console.log("定位失败,位置信息是不可用");
					break;
				case error.TIMEOUT:
					console.log("定位失败,请求获取用户位置超时");
					break;
				case error.UNKNOWN_ERROR:
					console.log("定位失败,定位系统失效");
					break;
			}
			$('#address').val('');
			if (param.error) param.error({"status":"FAIL","erro":error.code});
		});
	}else{
		console.log("浏览器不支持地理定位。");
		$('#address').val('');
		if (param.error) param.error({"status":"FAIL","erro":"浏览器不支持地理定位"});
	}
}
function doLocation(param){
	var param = arguments[0]?arguments[0]:{};
	if (param) {
		var url = '/?m=user&c=doing&a=doLocation';
		$.ajax({
			url: url,
			type: "POST",
			dataType: "JSON",
			data: param.info,
			success: function(data){
				if (param.success) param.success(data);
			},
			error: function(erro){
				//alert(JSON.stringify(erro));
			}
		});
	}
}
//地区解析
function geocoder(param){
	var url = '/?m=area&c=data&a=geocoder&ajax=1';
	$.ajax({
		url: url,
		type: "POST",
		dataType: "JSON",
		data: param.data,
		success:function(data){
			var datas = data.data.datas;
			//alert(JSON.stringify(datas));
			for(var i in datas){
				var info = datas[i];
				$('#location_'+i).val(info.code);
			}
			if (param.success) param.success(datas);
		}
	});
}
function isWechat(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}
//动画
function animated(param){
	$('#'+param.selector).addClass('animated '+param.animated);
	var timeout = 0<param.timeout?param.timeout:400;
	setTimeout(function(){
		$('#'+param.selector).removeClass(param.animated);
	}, timeout);
}
//cover
function showCover(param){
	$('#'+param.selector).show();
	if (param.animates) {
		for(var i in param.animates){
			var info = param.animates[i];
			animated({selector:info.selector,animated:info.animated});
		}
	}
}

function hideCover(param){
	if (param.animates) {
		for(var i in param.animates){
			var info = param.animates[i];
			animated({selector:info.selector,animated:info.animated});
		}
	}
	var timeout = 0<param.timeout?param.timeout:400;
	setTimeout(function(){
		$('#'+param.selector).hide();
	},timeout);
}
/*图片加载错误*/
function imgError(obj,param) {
	var img = new Image();
	if (param) {
		if (param.image) img.src = param.image;
	} else {
		img.src = '/statics/images/member/nophoto.gif';
	}
	obj.onerror = null;
	img.onload = function () {
		obj.src = img.src;
		obj.onload = null;
	};
}
/*图片固定容器适应*/
function resizeImg(param){
	var bigWidth = $(param.selector).width();
	var bigHeight = $(param.selector).height();
	var model = param.model?param.model:'auto';
	$(param.selector).each(function(){
		var _this = $(this).find("img");
		//_this.onreadystatechange  =  function(){
			var imgWidth = _this.width();
			var imgHeight = _this.height();
			//console.log(imgWidth+'***'+imgHeight);
			if (0 == imgWidth || 0 == imgHeight) return;
			var w,h,mt,ml;
			var scale;
			if(imgWidth>bigWidth || imgHeight>bigHeight){
				var scaleW = imgWidth/bigWidth;
				var scaleH = imgHeight/bigHeight;
				if(scaleW>scaleH){
					switch(model){
						case 'auto':
							scale = scaleW;
							break;
						case 'fill':
							scale = scaleH;
							break;
					}
				}else{
					switch(model){
						case 'auto':
							scale = scaleH;
							break;
						case 'fill':
							scale = scaleW;
							break;
					}
				}
			}else{
				scale=1;
			}
			w = imgWidth/scale;
			h = imgHeight/scale;
			mt = (bigHeight-(imgHeight/scale))/2;
			ml = (bigWidth-(imgWidth/scale))/2;
			_this.css({
				"width":w,
				"height":h,
				"marginTop":mt+'px',
				"marginLeft":ml+'px'
			});
		//}
	});
}
//页面滚动底部
function myscroll(param){
	var loaded = parseInt($('#'+param.selector).attr('data-loaded'));
	if(0==loaded){
		//变量scrollTop是滚动条滚动时，距离顶部的距离
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		//var scrollTop = document.getElementById('J_content').scrollTop;
		//变量windowHeight是可视区的高度
		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		//var windowHeight = document.getElementById('J_content').clientHeight;
		//变量scrollHeight是滚动条的总高度
		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
		//var scrollHeight = document.getElementById('datas').scrollHeight;
		//console.log(scrollTop+'**'+windowHeight+'**'+scrollHeight);return;
		if(scrollTop+windowHeight>=scrollHeight){
			loaded=1;
			$('#'+param.selector).attr('data-loaded',1);
			var page = parseInt($('#'+param.selector).attr('data-page'));
			page++;
			$('#'+param.selector).attr('data-page',page)
			window.setTimeout(function(){
				if (param.success) {
					param.success();
				} else {
					getData();
				}
			},300);
		}
	}
}
//地区模块
function areaConfig(){
	var config = [
		{},
		{"name":"省","key":"province"},
		{"name":"市","key":"city"},
		{"name":"区","key":"district"},
		{"name":"街道","key":"street"},
		{"name":"社区","key":"community"}
	];
	return config;
}
function initArea(){
	var config = areaConfig();
	areaSwitch();//绑定地区切换事件
	var level = 0;
	var location_district = $('#location_district').val();
	if (location_district) {
		level = 3;
	} else {
		level = 1;
		getArea({parent_id:1});
	}
	$('.cover-content-head ul li').hide();
	$('.cover-content-head ul li').eq((level-1)).show();
	$('.area-data-item').hide();
	$('.area-'+level).show();
	$('.cover-content-head ul li').each(function(i){
		var index = parseInt(i) + 1;
		$(this).text(config[index].name);
	});
	$('#area').val('');
	showCover({selector:"coverArea",animates:[{selector:"cover_area_bg",animated:"fadeInt"},{selector:"cover_area_content",animated:"slideInUp"}]});
}
function getArea(param){
	var parent_id = 0<param.parent_id?param.parent_id:1;
	var url = '/?m=area&c=data&a=getNode&ajax=1&parent_id='+parent_id;
	$.ajax({
		url: url,
		type: "GET",
		dataType: "JSON",
		success:function(data){
			$('#loadingToast').fadeOut(100);
			if (1 == data.status) {
				var datas = data.data.datas;
				var html = '';
				var level = datas[0].level;
				for(var i in datas){
					var info = datas[i];
					html += '<li data-code="'+info.code+'">'+info.name+'</li>';
				}
				//alert(JSON.stringify(datas[0]));
				$('.area-'+level+' ul').html(html);
				areaSelectOperate({"selector":level});
			}
		}
	});
}

function areaSwitch(){
	$('.cover-content-head ul li').unbind('click');
	var item1 = $('.cover-content-head ul li');
	item1.each(function(i){
		$(item1[i]).on('click',function(){
			$(item1).removeClass('active');
			$(this).addClass('active');
			var level = i + 1;
			$('.area-data-item').hide();
			$('.area-'+level).show();
		});
	});
}
function areaSelectOperate(param){
	var config = areaConfig();
	var item1 = $('.area-'+param.selector+' ul li');
	item1.each(function(i){
		$(item1[i]).on('click',function(){
			var code = $(this).attr('data-code');
			var level = parseInt($(this).parent().parent().attr('data-level'));
			$('#'+config[level].key).val(code);
			var selectArea = $('#area').val();
			selectArea += $(this).text();
			//selectArea = selectArea.substr(0,selectArea.length - 1);
			$('#area').val(selectArea);
			if (5==level) {
				$('#select_area_result').text(selectArea);
				hideCover({selector:"coverArea",animates:[{selector:"cover_area_bg",animated:"fadeOut"},{selector:"cover_area_content",animated:"slideOutDown"}]});
			} else {
				var $loadingToast = $('#loadingToast');
				$loadingToast.fadeIn(100);
				getArea({"parent_id":code});
				var level2 = level-1;
				$('.cover-content-head ul li').eq(level).show();
				$('.cover-content-head ul li').removeClass('active');
				$('.cover-content-head ul li').eq(level).addClass('active');
				$('.cover-content-head ul li').eq(level2).text($(this).text());
				$('.area-data-item').hide();
				$('.area-'+(level+1)).show();
			}
		});
	});
}
function weuiLoad(param){
	var param = arguments[0]?arguments[0]:{};
	var selector = param.selector?param.selector:'loadingToast';
	if (0 == param.status) {
		$('#'+selector).fadeOut(200);
	} else {
		if (param.msg) $('#'+selector+' .weui-toast__content').text(param.msg);
		$('#'+selector).fadeIn(200);
		var timeout = param.timeout?param.timeout:2000;
		setTimeout(function(){
			$('#'+selector).fadeOut(200);
			//clearTimeout(index);
		},timeout);
	}

}
function weuiSuccess(param){
	var param = arguments[0]?arguments[0]:{};
	var selector = param.selector?param.selector:'toast';
	if (param.msg) $('#'+selector+' .weui-toast__content').text(param.msg);
	$('#'+selector).fadeIn(200);
	var timeout = param.timeout?param.timeout:2000;
	setTimeout(function(){
		$('#'+selector).fadeOut(200);
		//clearTimeout(index);
	},timeout);
}
function weuiError(param){
	var param = arguments[0]?arguments[0]:{};
	var selector = param.selector?param.selector:'topTips';
	if (param.msg) $('#'+selector).text(param.msg);
	$('#'+selector).fadeIn(200);
	var timeout = param.timeout?param.timeout:2000;
	setTimeout(function(){
		$('#'+selector).fadeOut(200);
		//clearTimeout(index);
	},timeout);
}
function weuiPicker(param){
	var param = arguments[0]?arguments[0]:{};
	weui.picker(param.data, {
		defaultValue: param.defaultValue,
		onChange: function (result) {
			//console.log(result);
		},
		onConfirm: function (result) {
			//if (param.success) param.success();
			if (param.confirm) param.confirm(result[0]);
		},
		title: param.title
	});
}