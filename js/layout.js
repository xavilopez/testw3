var Layout = function () {
    'use strict';



/* ========================================================================
       Clients filter
 ========================================================================== */
$(".btnClients").on('click', function(){
  var btnstring = '.' + $(this).text().toLowerCase().replace(/\s/g, '');
  $(".client-tile").hide();
  $(btnstring).show();
});


/* ========================================================================
   Fullscreen burger menu
 ========================================================================== */
$(".menu-trigger, .mobilenav").click(function () {
  $(".mobilenav").fadeToggle(500);
});
$(".menu-trigger, .mobilenav").click(function () {
  $(".top-menu").toggleClass("top-animate");
  $(".mid-menu").toggleClass("mid-animate");
  $(".bottom-menu").toggleClass("bottom-animate");
});

/* ========================================================================
   On click menu item animate to the section
 ========================================================================== */
$(".mobilenav li, .back-to-top").on('click', function() {
  var target = $(this).data('rel');
  var $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 900, 'swing');
});

    // handle on page scroll
    var handleHeaderOnScroll = function() {
         if ($(window).scrollTop() > 1300) {
            $('body').addClass('page-on-scroll');
            $('.menui').addClass('orangemenu');
        } else {
            $('body').removeClass('page-on-scroll');
            $('.menui').removeClass('orangemenu');
        }
    }

    // handle carousel
    var handleCarousel = function() {
        var $item = $('.carousel .item');
        var $wHeight = $(window).height();
        $item.eq(0).addClass('active');
        $item.height($wHeight);
        $item.addClass('full-screen');

        /*$('.carousel img').each(function() {
            var $src = $(this).attr('src');
            var $color = $(this).attr('data-color');
            $(this).parent().css({
                'background-image' : 'url(' + $src + ')',
                'background-color' : $color
            });
            //$(this).remove();
        });*/

        $(window).on('resize', function (){
            $wHeight = $(window).height();
            $item.height($wHeight);
        });
    }

    // handle group element heights
    var handleHeight = function() {
       $('[data-auto-height]').each(function() {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if(parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
       });
    }

    return {
        init: function () {
            handleHeaderOnScroll(); // initial setup for fixed header
            handleCarousel(); // initial setup for carousel
            handleHeight(); // initial setup for group element height

            // handle minimized header on page scroll
            $(window).scroll(function() {
                handleHeaderOnScroll();
            });
        }
    };
}();

$(document).ready(function() {
    Layout.init();
});
