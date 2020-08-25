/**
* Template Name: Personal - v2.2.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
    "use strict";
  
    // Nav Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var hash = this.hash;
        var target = $(hash);
        if (target.length) {
          e.preventDefault();
  
          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }
  
          if (hash == '#header') {
            $('#header').removeClass('header-top');
            $("section").removeClass('section-show');
            return;
          }
  
          if (!$('#header').hasClass('header-top')) {
            $('#header').addClass('header-top');
            setTimeout(function() {
              $("section").removeClass('section-show');
              $(hash).addClass('section-show');
            }, 350);
          } else {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }
  
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
  
          return false;
  
        }
      }
    });
  
    // Activate/show sections on load with hash links
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        $('#header').addClass('header-top');
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
        setTimeout(function() {
          $("section").removeClass('section-show');
          $(initial_nav).addClass('section-show');
        }, 350);
      }
    }
  
    // Mobile Navigation
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="iconfont icon-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });
  
      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
  
    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  
    // Skills section
    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, {
      offset: '80%'
    });
  
    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        900: {
          items: 3
        }
      }
    });
  
    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  
  })(jQuery);
  
  
  // 淡入
  var iUp = (function () {
      var t = 0,
          d = 150,
          clean = function () {
              t = 0;
          },
          up = function (e) {
              setTimeout(function () {
                  $(e).addClass("up")
              }, t);
              t += d;
          },
          down = function (e) {
              $(e).removeClass("up");
          },
          toggle = function (e) {
              setTimeout(function () {
                  $(e).toggleClass("up")
              }, t);
              t += d;
          };
      return {
          clean: clean,
          up: up,
          down: down,
          toggle: toggle
      }
  })();
  $(document).ready(function () {
      // var url = 'https://query.yahooapis.com/v1/public/yql' + 
      // '?q=' + encodeURIComponent('select * from json where url=@url') +
      // '&url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8') +
      // '&format=json&callback=?';
  
      /**
       * 获取Bing壁纸
       * 原先 YQL 已经无法提供服务了
       * 改用 JsonBird：https://bird.ioliu.cn/
       * 
       */
      var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
      var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
      var index = sessionStorage.getItem("index");
      var $header = $('#header');
      if(imgUrls == null){
          imgUrls = new Array();
          index = 0;		
          $.get(url,function (result) {
              images = result.images;
              for (let i = 0; i < images.length; i++) {
                  const item = images[i];
                  imgUrls.push(item.url);
              }
              var imgUrl = imgUrls[index];
              var url = "https://www.bing.com"+imgUrl;
              $header.css("background", "url('"+url+"') center center no-repeat #666");
              $header.css("background-size", "cover");
              sessionStorage.setItem("imgUrls",JSON.stringify(imgUrls));
              sessionStorage.setItem("index",index);
              });
      }else{
          if(index == 7)
              index = 0;
          else
              index++;
          var imgUrl = imgUrls[index];
          var url = "https://www.bing.com"+imgUrl;
          $header.css("background", "url('"+url+"') center center no-repeat #666");
          $header.css("background-size", "cover");
          sessionStorage.setItem("index",index);
      }
      
      $(".iUp").each(function (i, e) {
          iUp.up(e);
      });
  });


/* ----存活时间---- */
function siteTime(){
  window.setTimeout("siteTime()", 1000);
  var seconds = 1000;
  var minutes = seconds * 60;
  var hours = minutes * 60;
  var days = hours * 24;
  var years = days * 365;
  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var todayDate = today.getDate();
  var todayHour = today.getHours();
  var todayMinute = today.getMinutes();
  var todaySecond = today.getSeconds();
  /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳) 
  year - 作为date对象的年份,为4位年份值
  month - 0-11之间的整数,做为date对象的月份
  day - 1-31之间的整数,做为date对象的天数
  hours - 0(午夜24点)-23之间的整数,做为date对象的小时数
  minutes - 0-59之间的整数,做为date对象的分钟数
  seconds - 0-59之间的整数,做为date对象的秒数
  microseconds - 0-999之间的整数,做为date对象的毫秒数 */
  var t1 = Date.UTC(2020,01,03,00,00,00);
  var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
  var diff = t2-t1;
  var diffYears = Math.floor(diff/years);
  var diffDays = Math.floor((diff/days)-diffYears*365);
  var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
  var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
  var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
  document.getElementById("sitetime").innerHTML=""+(diffYears*365+diffDays)+" 天 "+diffHours+" 小时 "+diffMinutes+" 分钟 "+diffSeconds+" 秒"
  }
  siteTime()
  /* ----存活时间---- */