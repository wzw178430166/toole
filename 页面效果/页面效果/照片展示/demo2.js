//图片展示
(function(){
	var main=document.getElementsByClassName('main')[0];
	var img,len;
	var suoshi=true;		
	//添加图片到图片区
	function addIMG(){
		for(var i=0;i<50;i++){
			var random_Img=Math.floor(Math.random()*10);
			var img=document.createElement('img');
			img.src="./pic/"+random_Img+".jpg";
            main.appendChild(img);
		}
        bingEvent();
	}
	addIMG();
	//点击事件
	function bingEvent(){
		img=$('img');
		len=$('img').length;
		
		$('#btn').on('click',function(){
			if(!suoshi){
				return;
			}
			suoshi=false;
			var numm=0;
		for(var i=0;i<len;i++){
			(function(num){
setTimeout(function(){
             montine(img[num],"1s",function(){ //缩小
             	$(this).css({'transform':'scale(0)'});
             },function(){
                montine(this,"1s",function(){
                		$(this).css({'transform':'scale(1)','opacity':0});
                },function(){
                	  numm++;
                      if(numm==len){
                      	numm=null;
                        show();
                     }
                });                              //放大
             
             })
             	},Math.random()*1000);
			}(i))
		
		}
		})
	}
          // 决定一个变换元素看起来是处在三维空间还是平面内，需要该元素的父元素上定义 <’ transform-style ‘> 属性。

          //   perspective ：none |length 默认是none




	//旋转函数
	 function show(){
	 	var suonu=0;
	 	for(var i=0;i<len;i++){
	 		var nuberindex=Math.random()*500;
	 		$(img[i]).css({'transition':'','transform':'rotateY(0deg) translatez(-'+nuberindex+'px)'});//,'opacity':1 隐藏设置 旋转就看到效果了
	 		//console.log($(this).css(transform)) 怎样查看当前元素的Z轴的值  保存在矩形图中，要直接设置内联样式Style才能获取数值。
	 		//其他方法获取不了包括在css，js文件中设置的都获取不了
	 		(function(i){
	 			setTimeout(function(){
                montine(img[i],"2s",function(){
                	$(this).css({'transform':'rotateY(-360deg) translatez(0)','opacity':1});//每个元素围着自己的Y轴旋转360度
                },function(){
                	suonu++
                	if(suonu==len){ //逆向思维，加载完就变为true ，没加载完之前都是false
                		suoshi=true;
                }
                })
	 			},Math.random()*1000)
	 		}(i))
	 	}
	 }
	//回调函数 
	function montine(dom,times,dofun,btfun){  
		var ok=true;                //因为这个是回调函数，所以把锁加在函数里面，重复调用的时候就会发生变化
		$(dom).css("transition",times);
		dofun.call(dom);
		$(dom).on('transitionend',function(){
			if(ok){
				btfun&&btfun.call(dom);
				ok=false;
			}
		})
	}
}())