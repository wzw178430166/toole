jQuery(document).ready(function(){
  function doStep(){
    // Next Button
    $('a.next-step').click(function(event){
      event.preventDefault();  //当点击提交按钮时阻止对表单的提交 
      // Part 1
      if($('.alpha').hasClass("in")) {      //alpha 框架1 个人信息
        $('.alpha').removeClass("in");
      }
      $('.alpha').addClass("out");
      // Part 2
      if($('.beta').hasClass("out")) {        // .beta 框架2 社交信息
        $('.beta').removeClass("out");
      }
      $('.beta').addClass("in");
    });
    
    // Previous Button
    $('a.prev-step').click(function(event){   //按 上一步就显示框架1 隐藏框架2  步骤如下
      event.preventDefault(); 
      $('.alpha').removeClass("out").addClass("in");    //class 不能起冲突
      $('.beta').removeClass("in").addClass("out"); 
    });
    
    // Submit & Complete
    $('.submit').click(function(event){
      event.preventDefault();
      // Part 1
      if($('.beta').hasClass("in")) {
        $('.beta').removeClass("in");
      }
      $('.beta').addClass("out");
      // Part 2
      if($('.charlie').hasClass("out")) {
        $('.charlie').removeClass("out");
      }
      $('.charlie').addClass("in");
    });
    //  确认按钮
    $('.bnt').click(function(){                 //in 是显示30    out 是隐藏0
      $('.charlie').removeClass("in");     
    })
  }
  // Active Functions
  doStep();
});
/*代码编辑整理:www.jq22.com */