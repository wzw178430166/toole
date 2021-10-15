//判断浏览器类型
    var  Judging_browsers=(function(){
	    var Sysst = function(){};
		var ua = navigator;
	   Sysst.prototype.isie = function(){
		  return ua.userAgent.indexOf("Mozilla/5.0") > -1;
		   }
	   Sysst.prototype.isie8=function(){
		   return ua.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1"?false:true;
		   }
	   Sysst.prototype.isChrome=function(){
		   return ua.userAgent.indexOf("Chrome") > -1;
		   }
	   Sysst.prototype.isFF=function(){
		   return ua.userAgent.indexOf("Firefox")!=-1;
		   }
		   return Sysst;
	  }());
     //var tests=new Judging_browsers();
	  
//同时执行函数，加载完之后执行函数
function addloadEvent(func){
  var oldonload=window.onload;
  if(typeof window.onload !="function"){
    window.onload=func;
  }else{
    window.onload=function(){
      if(oldonload){
        oldonload();
      }
      func();
    }
  }
}
// getElementsByClassName 兼容IE8或以下浏览器方法
function   getElementsByClassName(classname){
if(document.getElementsByClassName){
  return document.getElementsByClassName(classname)
}else{
   var tag = document.getElementsByTagName("*");
   var arr=[];
   for(var i=0;i<tag.length;i++){
    if(tag[i].className==classname){
      arr.push(tag[i]);
}
}
   return arr;
}
}

//滚动条滚动距离 兼容所有浏览器方法
  function getScrollOffset(){
	  if(window.pageXOffset){
		  return{
			  x:window.pageXOffset,     //IE9以上高版本
			  y:window.pageYOffset
			  }
		  }else{
			  return{
				  x:document.body.scrollLeft+document.documentElement.scrollLeft,   //IE8或以下  
				  y:document.body.scrollTop+document.documentElement.scrollTop  //其中一个属性可用另外一个就为0，所以相加
				  }
			  }
	  }
	  
	 //浏览器可视化宽高兼容方法
	 function getViewportOffset(){
		 if(window.innerWidth){
			 return{
				 w:window.innerWidth,       //这个是IE或其他浏览器高版本方法
				 h:window.innerHeight
				 }
			 }else{
				 if(document.compatMode==="BackCompat"){   //因为浏览器有两种模式 所以再判断
					 return{
						 w:document.body.clientWidth,      //这个是怪异模式
						 h:document.body.clientHeight
						 }
					 }else{
						 return{
							 w:document.documentElement.clientWidth,    //这个是标准模式
							 h:document.documentElement.clientHeight
							 }
						 }
				 }
		 }
		 
		  // 星星闪烁    传一个数组里面是对象 （传一个集合）   
   function shanshan(arr){
    var num=0;
    times=setInterval(function(){
     for(var i=0;i<arr.length;i++){
      arr[i].style.border="3px solid #BFEFFF";
      arr[i].style.transform="scale("+(0.90+0.05*Math.pow(-1,num))+")";
     }
     num++;
     },300);
   } 

  // 兼容opacity透明度的方法 IE FF
function setOpacity(ele, opacity) {
    if (ele.style.opacity != undefined) {
        ///兼容FF和GG和新版本IE
        ele.style.opacity = opacity / 100;

    } else {
        ///兼容老版本ie
        ele.style.filter = "alpha(opacity=" + opacity + ")";
    }
}

   //  淡入  就是画面由暗变亮，最后完全显示。  
   function fadein(ele, opacity, speed) {
    if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
        var timer = null;
        timer = setInterval(function() {
            if (v < opacity) {
                v += avg;
                setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, 500);
    }
}

// 淡出   就是画面由亮变暗，最后完全消失。
function fadeout(ele, opacity, speed) {
    if (ele) {
        var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
        v < 1 && (v = v * 100);
        var count = speed / 1000;
        var avg = (100 - opacity) / count;
        var timer = null;
        timer = setInterval(function() {
            if (v - avg > opacity) {
                v -= avg;
                setOpacity(ele, v);
            } else {
                clearInterval(timer);
            }
        }, 500);
    }
}
//获得下一个兄弟节点
     function nextnode (obj) {
      var nexts=obj.nextSibling;
    while (nexts.nodeType==3) {
      nexts=nexts.nextSibling;
    }
    return nexts;
   }

 //hover 延时加载
   (function(a) {
    a.fn.hoverDelay = function(c, f, g, b) {
        var g = g || 200,   //鼠标接触时间
        b = b || 200,       //鼠标离开时间
        f = f || c;
        var e = [],
        d = [];
        return this.each(function(h) {
            a(this).mouseenter(function() {
                var i = this;
                clearTimeout(d[h]);
                e[h] = setTimeout(function() {
                    c.apply(i)
                },
                g)
            }).mouseleave(function() {
                var i = this;
                clearTimeout(e[h]);
                d[h] = setTimeout(function() {
                    f.apply(i)
                },
                b)
            })
        })
    }
})(jQuery);

//  原生js 获取元素所有子节点
   function getchilds(obj){
                 var childs=obj.childNodes;
                var arr=[];
                         for(var i=0; i<childs.length;i++){
          if(childs[i].nodeType==3 && /^\s+$/.test(childs[i].nodeValue)){
                       continue;
                                  }else{
                           arr.push(childs[i])
                  }
                         }
                         return arr;
                 }


/***************************** 防抖方法  简化后的分割线 ******************************/
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) // 简化写法
    }
}
// 然后是旧代码
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop,1000) // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置
