!(function($) {
    "use strict";
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
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none" title="NaviGation"><i class="iconfont icon-menu"></i></button>');
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
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });
    $('.skills-content').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });
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
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
})(jQuery);
var iUp = (function() {
    var t = 0,
        d = 150,
        clean = function() {
            t = 0;
        },
        up = function(e) {
            setTimeout(function() {
                $(e).addClass("up")
            }, t);
            t += d;
        },
        down = function(e) {
            $(e).removeClass("up");
        },
        toggle = function(e) {
            setTimeout(function() {
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
$(document).ready(function() {
    $(".iUp").each(function(i, e) {
        iUp.up(e);
    });
});

function siteTime() {
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
    var t1 = Date.UTC(2020, 01, 03, 00, 00, 00);
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
    var diff = t2 - t1;
    var diffYears = Math.floor(diff / years);
    var diffDays = Math.floor((diff / days) - diffYears * 365);
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    document.getElementById("sitetime").innerHTML = "" + (diffYears * 365 + diffDays) + " 天 " + diffHours + " 小时 " + diffMinutes + " 分钟 " + diffSeconds + " 秒"
}
siteTime();
var zIndex = 1000;
var jqueryAlert = function(opts) {
    var browser_class = navigator.userAgent;
    var browser_class_name1 = browser_class.match("Mobile");
    var browser_class_name2 = browser_class.match("mobile");
    var location_url = window.location.href;
    if (browser_class_name1 != null || browser_class_name2 != null) {
        if (location_url.match("wap") == null) {
            window.location.href = "https://zzsn.vercel.app/";
        }
    } else {
        if (location_url.match("3g") != null || location_url.match("wap") != null) {
            window.location.href = "https://zzsn.vercel.app/";
        }
    }
    var opt = {
        'style': 'wap',
        'title': '',
        'content': '',
        'contentTextAlign': 'center',
        'width': 'auto',
        'height': 'auto',
        'minWidth': '0',
        "className": '',
        'position': 'fixed',
        'animateType': 'scale',
        'modal': false,
        'isModalClose': false,
        'bodyScroll': false,
        'closeTime': 3000,
        "buttons": {},
    };
    var option = $.extend({}, opt, opts);
    var dialog = {};
    dialog.time = 450;
    dialog.init = function() {
        dialog.framework();
    };
    var isHaveTouch = "ontouchend" in document ? true : false;
    if (isHaveTouch) {
        dialog.event = 'touchstart';
    } else {
        dialog.event = 'click';
    };
    var $modal = $("<div class='alert-modal'>");
    var $container = $("<div class='alert-container animated'>");
    var $title = $("<div class='alert-title'>" + option.title + "</div>");
    var $content = $("<div class='alert-content'>");
    var $buttonBox = $("<div class='alert-btn-box'>");
    var $closeBtn = $("<div class='alert-btn-close'>×</div>");
    if (option.content[0].nodeType == 1) {
        var $newContent = option.content.clone();
        $content.append($newContent)
    } else {
        $content.html(option.content);
    };
    dialog.framework = function() {
        dialog.buttons = [];
        for (var key in option.buttons) {
            dialog.buttons.push(key);
        };
        dialog.buttonsLength = dialog.buttons.length;
        $container.append($title).append($content);
        if (option.style == 'pc') {
            $container.append($closeBtn).addClass('pcAlert');
        };
        if (option.modal || option.modal == 'true') {
            $('body').append($modal);
            option.bodyScroll && $('body').css('overflow', 'hidden');
        };
        $('body').append($container);
        $content.css({
            'text-align': option.contentTextAlign
        });
        if (parseInt(option.minWidth) > parseInt($container.css('width'))) {
            option.width = option.minWidth;
        };
        $modal.css('position', option.position);
        $modal.css('z-index', zIndex);
        ++zIndex;
        if (option.position == 'fixed') {
            $container.css({
                'position': option.position,
                'left': '50%',
                'top': '50%',
                'z-index': zIndex,
            })
        };
        if (option.position == 'absolute') {
            $container.css({
                'position': option.position,
                'left': $(window).width() / 2,
                'top': $(window).height() / 2 + $(window).scrollTop(),
                'z-index': zIndex,
            })
        };
        $container.css('width', option.width);
        $container.css('height', option.height);
        if (option.width == 'auto') {
            $container.css('width', $container[0].clientWidth + 10);
        };
        if (parseInt($(window).height()) <= parseInt($container.css('height'))) {
            $container.css('height', $(window).height());
        };
        (!!option.className) && $container.addClass(option.className);
        for (var key in option.buttons) {
            var $button = $("<p class='alert-btn-p'>" + key + "</p>");
            if (option.style != 'pc') {
                $button.css({
                    'width': Math.floor(($container[0].clientWidth) / dialog.buttonsLength),
                })
            };
            $button.bind(dialog.event, option.buttons[key]);
            $buttonBox.append($button);
        };
        if (dialog.buttonsLength > 0) {
            $container.append($buttonBox);
            $content.css('padding-bottom', '46px');
        };
        if (option.title != '') {
            $content.css('padding-top', '42px');
        };
        if (dialog.buttonsLength <= 0 && option.title == '') {
            $container.addClass('alert-container-black');
        };
        $container.css({
            'margin-left': -parseInt($container.css('width')) / 2,
            'margin-top': -parseInt($container.css('height')) / 2,
        });
        if (option.animateType == 'scale') {
            $container.addClass('bounceIn');
        };
        if (option.animateType == 'linear') {
            $container.addClass('linearTop');
        };
        isSelfClose();
    };

    function isSelfClose() {
        if (dialog.buttonsLength <= 0 && option.style != 'pc') {
            setTimeout(function() {
                $container.fadeOut(300);
                $modal.fadeOut(300);
                option.bodyScroll && $('body').css('overflow', 'auto');
            }, option.closeTime)
        }
    };
    dialog.toggleAnimate = function() {
        if (option.animateType == 'scale') {
            return $container.removeClass('bounceIn').addClass('bounceOut');
        } else if (option.animateType == 'linear') {
            return $container.removeClass('linearTop').addClass('linearBottom');
        } else {
            return $container;
        }
    };
    dialog.close = function() {
        dialog.toggleAnimate().fadeOut(dialog.time);
        $modal.fadeOut(dialog.time);
        option.bodyScroll && $('body').css('overflow', 'auto');
    };
    option.style == 'pc' && $closeBtn.bind(dialog.event, dialog.close);
    option.isModalClose && $modal.bind(dialog.event, dialog.close);
    dialog.destroy = function() {
        dialog.toggleAnimate().fadeOut(dialog.time);
        setTimeout(function() {
            $container.remove();
            $modal.remove();
            option.bodyScroll && $('body').css('overflow', 'auto');
        }, dialog.time)
    };
    dialog.show = function() {
        $modal.css('z-index', zIndex);
        ++zIndex;
        $container.css({
            'z-index': zIndex,
        });
        if (option.animateType == 'scale') {
            $container.fadeIn().removeClass('bounceOut').addClass('bounceIn');
        } else if (option.animateType == 'linear') {
            $container.fadeIn().removeClass('linearBottom').addClass('linearTop');
        } else {
            $container.fadeIn()
        };
        if (option.position == 'absolute') {
            $container.css({
                'top': $(window).height() / 2 + $(window).scrollTop(),
            })
        };
        $modal.fadeIn();
        option.bodyScroll && option.modal && $('body').css('overflow', 'hidden');
        isSelfClose();
    };
    dialog.init();
    return dialog;
};

function Star(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")";
}
Star.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
};
Star.prototype.move = function() {
    this.y -= .15;
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
    this.r = Math.floor(Math.random() * 5) + 1;
    this.maxLinks = 2;
    this.speed = .5;
    this.a = .5;
    this.aReduction = .005;
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    this.dir = Math.floor(Math.random() * 140) + 200;
}
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
}
Dot.prototype.move = function() {
    this.a -= this.aReduction;
    if (this.a <= 0) {
        this.die();
        return
    }
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed, this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;
    this.draw();
    this.link();
};
Dot.prototype.die = function() {
    dots[this.id] = null;
    delete dots[this.id];
};
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH, HEIGHT, mouseMoving = false,
    mouseMoveChecker, mouseX, mouseY, stars = [],
    initStarsPopulation = 80,
    dots = [],
    dotsMinDist = 2,
    maxDistFromCursor = 50;
setCanvasSize();
init();

function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth, HEIGHT = document.documentElement.clientHeight;
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
}

function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
    }
    ctx.shadowBlur = 0;
    animate();
}

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
}
window.onmousemove = function(e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function() {
        mouseMoving = false;
    }, 100);
};

function drawIfMouseMoving() {
    if (!mouseMoving) return;
    if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
    }
    var previousDot = getPreviousDot(dots.length, 1);
    var prevX = previousDot.x;
    var prevY = previousDot.y;
    var diffX = Math.abs(prevX - mouseX);
    var diffY = Math.abs(prevY - mouseY);
    if (diffX < dotsMinDist || diffY < dotsMinDist) return;
    var xVariation = Math.random() > .5 ? -1 : 1;
    xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    var yVariation = Math.random() > .5 ? -1 : 1;
    yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
    dots[dots.length - 1].draw();
    dots[dots.length - 1].link();
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
};