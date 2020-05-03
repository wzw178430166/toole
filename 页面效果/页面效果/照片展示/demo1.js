// JavaScript Document
//展示图片
(function(){
	var btn=$('#btn');
	var main=$('.main');
	var img,len;
	var flag=true;
	//添加图片
	function creatimg(){
		for(var i=0;i<50;i++){
				var suiji=Math.floor(Math.random()*10);
			var imgs="<img src=./pic/"+suiji+".jpg>";
			//main.innerHTML=imgs;   这个不生效 插入不了到页面中
			main.append(imgs);
			}
			//添加事件
			init();  //在这个方法里面绑定事件 onclick
		}
		creatimg();
		//添加过渡效果
		function init(){
			img=$('img');
			len=$('img').length;
			btn.on('click',function(){
				if(!flag){
				return;
			}
				var lengs=0;
				flag=false;
         for(var i=0;i<len;i++){
         	(function(num){
             setTimeout(function(){
                //回调函数
                mounthe(img[num],"1s",function(){
                	$(this).css('transform','scale(0)')  //缩小
                },function(){
                	mounthe(this,"2s",function(){
                		$(this).css({'transform':'scale(1)','opacity': 0});  //放大
                	},function(){
                		lengs++;
                		if(lengs==len){
                			show();
                		}
                	});
                		
                });
             },Math.random()*1000);

         	}(i))
         }
         });
		}
		//设置每张图片的Y Z轴 并且旋转
		function show(){
			var iddNum=0;
			for(var i=0;i<len;i++){
				//设置好基本操作                     translateZ(-' + Math.random() * 500 + 'px)'
				$(img[i]).css({'transition':'','transform':'rotateY(0deg) translateZ(-'+Math.random()*500+'px)'});
				(function(i){
					setTimeout(function(){//这里2s是旋转所需的时间？
						mounthe(img[i],"2s",function(){
							$(this).css({
								'opacity':1,
								'transform':'rotateY(-360deg) translateZ(0)',
							})
						},function(){
							iddNum++;

							if(iddNum==len){
								flag=true;
							}
						}) 
						//img[i].css({'opacity': '1','transform':'translateY(-180deg)'});
					},Math.random()*1000);
				}(i))
			}

		}
		  //封装运动函数   设置this的指向 指向两个函数，这两个函数需要分别做不同的操作 
		function mounthe(dom,times,fdfun,btfun){         //这个是回调函数，所以会回调多次，就是执行多次
			var foolrs=true;
             $(dom).css("transition",times);    // 因为这里为每个dom添加了过渡，所以下面就可以用transitinend事件判断是否过渡完。
             //$(dom).css("");
             //上面两个过渡效果都完成后就触达最后一个效果 （回调函数）
             fdfun.call(dom);
             //当所有图片运动完之后将锁打开
             $(dom).on('transitionend',function(){
             	   if(foolrs){  // 上面的事件是过渡完之后，然后再判断，加锁
               btfun&&btfun.call(dom);
               foolrs=false;
               }
             });
         
		}
	}())