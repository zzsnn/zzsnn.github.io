$(function () {
    

    //返回顶部按钮
    // 返回顶部显示隐藏
    $(".goBack").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() >= ($(".xiangqing").offset().top - $(".title").height())) {
            $(".goBack").fadeIn();
        }
        else {
            $(".goBack").fadeOut();
        }
    })
    // 返回顶部点击
    $(".goBack").click(function () {
        // 点击返回顶部
        // window.scroll(0,0);

        $('body,html').animate({
            scrollTop: 0
        },
            300);
    })

    // // 轮播图
     var swiper = new Swiper('.swiper-container', {
         // spaceBetween: 0,
         loop: true, // 循环模式选项
         centeredSlides: true,
         autoplay: {
           delay: 2500,
           disableOnInteraction: false,
         },
         pagination: {
           el: '.swiper-pagination',
           clickable: true,
           hideOnClick :true,
          
         },
        
       });

    //   滚动字幕
    // marquee("gundong", "gundong_zimu");
    // function marquee(p, s) {
    //     var scrollWidth = document.getElementById(p).offsetWidth;
    //     var textWidth = document.getElementById(s).offsetWidth;
    //     var i = scrollWidth;
    //     console.log(scrollWidth, textWidth);
    //     function change() {
    //         i--;
    //         if (i < -textWidth) {
    //             i = scrollWidth;
    //         }
    //         document.getElementById(s).style.left = i + "px";
    //         window.requestAnimationFrame(change);
    //     }
    //     window.requestAnimationFrame(change);
    // }

    // 下滑动画

    // $(".xiangqing .tab_list li").eq(0).click(function(){
    //     //下滑的 slideDown()
    //     $(".xiangqing .tab_con").eq(0).slideDown();
       
    // });
    // $(".xiangqing .tab_list li").eq(1).click(function(){
    //     //下滑的 slideDown()
    //     $(".xiangqing .tab_con .item").eq(1).slideDown();
       
    // });
    // $(".xiangqing .tab_list li").eq(2).click(function(){
    //     //下滑的 slideDown()
    //     $(".xiangqing .tab_con .item").eq(2).slideDown();
        
    // });
    // $(".xiangqing .tab_list li").eq(3).click(function(){
    //     //下滑的 slideDown()
    //     $(".xiangqing .tab_con .item").eq(3).slideDown();
        
    // });


    for(var i=0;i<4;i++){
        $(".xiangqing .tab_list li").eq(i).bind("click",{index:i},slideDown);
            //下滑的 slideDown()
    }
    function slideDown(event){
        var i=event.data.index;
        $(".xiangqing .tab_con .item").eq(i).slideDown();
    }
    
            
        

    // 赞赏按钮点击
    $(document).delegate(".shang", 'click', function () {
        Dialog.init('❤️&nbsp关注公众号：科技小D，点下文末广告呗～',2000);
    })



})
