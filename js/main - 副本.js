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


/* ----淡入---- */
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
    //var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
    /*var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
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
    }*/
    
    $(".iUp").each(function (i, e) {
        iUp.up(e);
    });
});
/* ----淡入---- */


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
siteTime();
/* ----存活时间---- */


/* ----鼠标移动特效，上升气泡---- */
function Star(id, x, y){
this.id = id;
this.x = x;
this.y = y;
this.r = Math.floor(Math.random()*2)+1;
var alpha = (Math.floor(Math.random()*10)+1)/10/2;
this.color = "rgba(255,255,255,"+alpha+")";
};

Star.prototype.draw = function() {
ctx.fillStyle = this.color;
ctx.shadowBlur = this.r * 2;
ctx.beginPath();
ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
ctx.closePath();
ctx.fill();
};

Star.prototype.move = function() {
this.y -= .5;
if (this.y <= -10) this.y = HEIGHT + 10;
this.draw();
};

Star.prototype.die = function() {
  stars[this.id] = null;
  delete stars[this.id];
};


function Dot(id, x, y, r) {
this.id = id;
this.x = x;
this.y = y;
this.r = Math.floor(Math.random()*5)+1;
this.maxLinks = 2;
this.speed = .5;
this.a = .5;
this.aReduction = .005;
this.color = "rgba(255,255,255,"+this.a+")";
this.linkColor = "rgba(255,255,255,"+this.a/4+")";
this.dir = Math.floor(Math.random()*140)+200;
};

Dot.prototype.draw = function() {
ctx.fillStyle = this.color;
ctx.shadowBlur = this.r * 2;
ctx.beginPath();
ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
ctx.closePath();
ctx.fill();
};

Dot.prototype.link = function() {
if (this.id == 0) return;
var previousDot1 = getPreviousDot(this.id, 1);
var previousDot2 = getPreviousDot(this.id, 2);
var previousDot3 = getPreviousDot(this.id, 3);
if (!previousDot1) return;
ctx.strokeStyle = this.linkColor;
ctx.moveTo(previousDot1.x, previousDot1.y);
ctx.beginPath();
ctx.lineTo(this.x, this.y);
if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
ctx.stroke();
ctx.closePath();
};

function getPreviousDot(id, stepback) {
if (id == 0 || id - stepback < 0) return false;
if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
else return false;
};

Dot.prototype.move = function() {
this.a -= this.aReduction;
if (this.a <= 0) {
  this.die();
  return
};

this.color = "rgba(255,255,255,"+this.a+")";
this.linkColor = "rgba(255,255,255,"+this.a/4+")";
this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

this.draw();
this.link();
};

Dot.prototype.die = function() {
  dots[this.id] = null;
  delete dots[this.id];
};


var canvas  = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
WIDTH,
HEIGHT,
mouseMoving = false,
mouseMoveChecker,
mouseX,
mouseY,
stars = [],
initStarsPopulation = 80,
dots = [],
dotsMinDist = 2,
maxDistFromCursor = 50;

setCanvasSize();
init();

function setCanvasSize() {
WIDTH = document.documentElement.clientWidth,
  HEIGHT = document.documentElement.clientHeight;                      

canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
};

function init() {
ctx.strokeStyle = "white";
ctx.shadowColor = "white";
for (var i = 0; i < initStarsPopulation; i++) {
  stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
};
ctx.shadowBlur = 0;
animate();
};

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (var i in stars) {
    stars[i].move();
  }
  for (var i in dots) {
    dots[i].move();
  }
  drawIfMouseMoving();
  requestAnimationFrame(animate);
};

window.onmousemove = function(e){
mouseMoving = true;
mouseX = e.clientX;
mouseY = e.clientY;
clearInterval(mouseMoveChecker);
mouseMoveChecker = setTimeout(function() {
  mouseMoving = false;
}, 100);
};


function drawIfMouseMoving(){
if (!mouseMoving) return;

if (dots.length == 0) {
  dots[0] = new Dot(0, mouseX, mouseY);
  dots[0].draw();
  return;
};

var previousDot = getPreviousDot(dots.length, 1);
var prevX = previousDot.x; 
var prevY = previousDot.y; 

var diffX = Math.abs(prevX - mouseX);
var diffY = Math.abs(prevY - mouseY);

if (diffX < dotsMinDist || diffY < dotsMinDist) return;

var xVariation = Math.random() > .5 ? -1 : 1;
xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
var yVariation = Math.random() > .5 ? -1 : 1;
yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
dots[dots.length-1].draw();
dots[dots.length-1].link();
};
//setInterval(drawIfMouseMoving, 17);

function degToRad(deg) {
return deg * (Math.PI / 180);
}
/* ----鼠标移动特效，上升气泡---- */