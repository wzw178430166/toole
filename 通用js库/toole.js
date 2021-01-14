// 头部菜单文字滚动
/*$(function(){
    $('#hearder_boxs').kxbdSuperMarquee({direction: 'up',distance:36,time:6,duration:40,scrollDelay:20,isEqual:true,loop: 0});
});*/

//全局检测数据类型的方法
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');  // 注意正则中间有个空格
}
/* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
//getType([])     // "Array" typeof []是object，因此toString返回
//getType('123')  // "string" typeof 直接返回
//getType(window) // "Window" toString返回
//getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
//getType(undefined)   // "undefined" typeof 直接返回
//getType()            // "undefined" typeof 直接返回
//getType(function(){}) // "function" typeof能判断，因此首字母小写
//getType(/123/g)      //"RegExp" toString返回


//判断浏览器类型
var  Judging_browsers=(function(){
  var Sysst = function(){};
var ua = navigator;
 Sysst.prototype.isie = function(){
  return ua.userAgent.indexOf("Mozilla/5.0") > -1;
   }
 Sysst.prototype.isie8=function(){
  if(ua.userAgent.indexOf("Chrome") > -1){
     return ua.userAgent.indexOf("msie 8.0")=="-1"?false:true;
   }else{
    return ua.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1"?false:true;
   }
   }
 Sysst.prototype.isChrome=function(){
   return ua.userAgent.indexOf("Chrome") > -1;
   }
 Sysst.prototype.isFF=function(){
   return ua.userAgent.indexOf("Firefox")!=-1;
   }
   return Sysst;
}());

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

// 绑定监听事件
function IEFF (obj,types,fns) {
  if(document.all){
  return obj.attachEvent("on"+types,fns);
}else{
  return obj.addEventListener(types,fns,false);
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
  //arr[i].style.border="3px solid #BFEFFF";
  arr[i].style.transform="scale("+(0.90+0.05*Math.pow(-1,num))+")";
 }
 num++;
 },300);
} 

// 兼容opacity透明度的方法 IE FF
function setOpacity(ele, opacity) {  //1-100
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
/*(function(a) {
a.fn.hoverDelay = function(c, f, g, b) {
    var g = g || 100,   //鼠标接触时间
    b = b || 100,       //鼠标离开时间
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
})(jQuery);*/

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

//自定义ajax 用原生js写的方法。
//   // ajax({url:'',type:'get',data:'lid=1',dataType:'json'}).then(res=>{console.log(res)})  只支持json格式的数据， 不传data可以，要传dataType  如果后端传回来的不是json数据强行转会报错，就不要加这个参数了
export function ajax({url,type,data,dataType}){    //对象解构： 解决不确定参数个数的时候使用，传参传对象
return new Promise(function(open,err){
    //1. 创建xhr对象
    var xhr=new XMLHttpRequest();
    //2.绑定监听事件
    xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
          if(dataType!==undefined&&dataType.toLowerCase()==="json"){
                    var res=JSON.parse(xhr.responseText)
                       }
            else{
                var res=xhr.responseText
            }
            open(res);   //请求到数据，缺一段逻辑，使用回调函数（引出了Promise）
        }
    }
    if(type.toLowerCase()=="get"&&data!=undefined){
        url+="?"+data;
    }
    //3.打开连接
    xhr.open(type,url,true);
    if(type.toLowerCase()==="post")
    //增加：设置请求消息头
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //4.发送请求
    if(type.toLowerCase()=="post"&&data!==undefined)
        xhr.send(data);
    else
        xhr.send(null);
})
}

  /*
  (async function(){
    //ES7
    var res=await ajax({
      url:"http://localhost:3000/index/",
      type:"get",
      dataType:"json"
    })
    //ES6
    .then(res=>{
      ... ...
    })
  })();
  */


  

// 字典结构：  查找字符串中出现次数最多的字母，再排序
export function dictionaries1(str){
  var str=str;
  var dict={};
  for(var i=0;i<str.length;i++){
    if(dict[str[i]]===undefined){
      dict[str[i]]=1;
    }else{
      dict[str[i]]+=1
    }
  }
  console.log(dict);
  var max,count=0;
  for(var key in dict){
    if(dict[key]>count){
      max=key;
      count=dict[key];
    }
  }
  //return max,count
  console.log(max,count);
}

//使用字典，不允许出现重复下标  数组去重 请求返回的数组去重 
//原理：对象中(字典中)出现相同的属性和值就会覆盖，只出现一次

export function dictionaries2(arr){
  var arr=arr;
  var dict={};
  for(var i=0;i<arr.length;i++){
    dict[arr[i]]=1;  //1是要替换的‘值’，看要去哪个属性和值
  }
  console.log(dict);  //去重后的对象
  //去重后的数组
  var result=[],i=0; //i是存下标  *****//把对象中的值存在数组中*****对象变数组***
  for(result[i++] in dict); 
  //以前是 for(var key in obj) 把对象遍历存值，遍历完就算了。厉害了： 现在是 result[i++] 空数组每个下标都存对象对应的值
  //console.log(result);
}

//冒泡排序
export function bubbling(arr){
var array = arr;
//var temp = 0;
for (var i = 0; i <array.length; i++){
for (var j = 0; j <array.length - i; j++){
if (array[j] > array[j + 1]){
   var temp=array[j + 1];
 //  temp = array[j + 1];
   array[j + 1] = array[j];
   array[j]=temp;
                     }
           }
        }
        return array;
     }

     //防止input输入框输入法弹出时，将fixed定位按钮顶起
     function fixeds(){
     var winHeight = $(window).height();
var $bottom = $dom.find('#bottom');
$(window).on('resize', function(){
var thisHeight=$(this).height();
if(winHeight - thisHeight >50){
//窗口发生改变(大),故此时键盘弹出
//当软键盘弹出，在这里面操作
$bottom.hide();
}else{
//窗口发生改变(小),故此时键盘收起
//当软键盘收起，在此处操作
$bottom.show();
}
});
}

Date.prototype.toLocaleString = function() { //毫秒转日期 2019/8/14 23:59
return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
}

export function getClientHeight() {   //浏览器视口的高度 设备高度
var clientHeight = 0;
if (document.body.clientHeight && document.documentElement.clientHeight) {
var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
} else {
var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
}
return clientHeight;
}

export function getScrollTop() {  // 浏览器垂直滚动位置  滚动条距离顶部，body溢出的部分
var scrollTop = 0;
if (document.documentElement && document.documentElement.scrollTop) {
scrollTop = document.documentElement.scrollTop;
} else if (document.body) {
scrollTop = document.body.scrollTop;
}
return scrollTop;
}

//封装Promise方法请求 //多个请求造成回调地狱 所有使用这个封装的方法

      /*  getCount(type){ //type是请求中的prams传过去的值。
             return new Promise( //中没有return，只能靠开门解决之前的open
                 function(resolve,reject){
                  
                      this.axios.get(
                 "/product_list",{
                     params:{type} //本来的c参数换成函数的参数type,一样参数和属性的就写一个就可以了
                 }
             ).then(res=>{
                 resolve(res.data.count); //总数累加
                 //开门（传参） 在下面的 count接着总数累加
          //Promise中没有return 使用resolve抛出
                // total+=res.data.count;
             });
                 }
             )
         },
          
           //三个请求并行，但等所有请求都执行完，才汇总总数  执行部分
Promise.all([  //这个效率最高，并行用这个，一起执行不会等
getCount("a"), //return getCount("a")的new Promised（）对象
getCount("b"),
getCount("c")
])
.then(result=>{ //会在所有new Promise请求完之后执行
//把 每个new promise的返回结果都放在result数组中。
total= result.reduce((prev,elem)=>prev+elem); //总和
console.log(total);
}
)
       //微信小程序 支持es7 
   (async function(){
       var result= await Promise.all([
       getCount("a"), 
       getCount("b"),
       getCount("c")
       ]);
       total= result.reduce((prev,elem)=>prev+elem); //总和
   console.log(total);
   })
     
         */

         /*
           //防抖：  只要不是最后一次触发，就不执行异步请求 可以配合绑定scroll和清空事件使用 window.onscroll=null
   var timer; //undefined
   window.onscroll=function(){
       //如果当前timer不是空，说明前面有一个等待的请求，还未发送。就停止前面的等待
       if(timer!==undefined){
           clearTimeout(timer);
       }
       //再重新开始下一轮等待
       timer=setTimeout(function(){
           //当200ms内，未发生滚动时，才发送正式的ajax请求
           console.log("发送ajax请求，加载更多数据...");
       },200);
   }
   */

   /*
     节流：
         <!--第一次发送请求后，只要响应没回来，就不能发送下一个请求-->
 <button id="btn">加载更多</button>
   <script>
//节流：第一次发送请求后，只要响应没回来，就不能发送下一个请求
// 点击按钮连续发送，可以这样做
var canClick=true; //开关变量

btn.onclick=function(){
if(canClick){ //可以单击
    canClick=false; //先关不开关
   console.log("发送ajax请求，加载跟多");
   setTimeout(function(){
       console.log('加载完成'); //第一次请求完成了
       canClick=true;  //请求的函数结尾，重新打开开关，允许下次点击
   },3000) //比如这个请求3秒后回来，这是假设的，可以更改
}
}
    */ 





    
 // ajax({url:'',type:'get',data:'lid=1',dataType:'json'}).then(res=>{console.log(res)})  


ajax({url:'/?m=circle&c=news&a=getDatas',type:'get',dataType:'json',data:'page=1',}).then(res=>{
  console.log(res);
})
