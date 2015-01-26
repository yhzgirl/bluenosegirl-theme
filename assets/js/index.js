/**
 * Main JS file for Phantom
 */
var $post = $('.post'), 
	$first = $('.post.first'), 
	$last = $('.post.last'), 
	$fnav = $('.fixed-nav'),
	$postholder = $('.post-holder'),
	$postafter = $('.post-after'),
	$sitehead = $('#site-head');

/*globals jQuery, document */
(function ($) {
    "use strict";
    function srcTo (el) {
    	$('html, body').animate({
			scrollTop: el.offset().top
		}, 1000);
    }
    $(document).ready(function(){
        $(".post-holder").fitVids();
     
        $postholder.each(function (e) {
        	if(e % 2 != 0)
        		$(this).css({
                    'background': '#343434',
                    'color'     : '#fff',
                })
        })

        $postafter.each(function (e) {
        	var bg = $(this).parent().css('background-color')
        	$(this).css('border-top-color', bg)

        	if(e % 2 == 0)
        		$(this).css('left', '6%')

        })
        

        $('.btn.first').click( function () {
        	srcTo ($first)
        })
        $('.btn.last').click( function () {
        	srcTo ($last)
        })
        $('#header-arrow').click(function () {
            srcTo ($first)
        })

        $('.post-title').each(function () {
        	var t = $(this).text(),
        	    index = $(this).parents('.post-holder').index();
        	$fnav.append("<a class='fn-item' item_index='"+index+"'>"+t+"</a>")

        	$('.fn-item').click(function () {
        		var i = $(this).attr('item_index'),
        			s = $(".post[item_index='"+i+"']")

        		$('html, body').animate({
					scrollTop: s.offset().top
				}, 400);

        	})
        })

        $('.post.last').next('.post-after').hide();
        $(window).scroll( function () {
        	var w = $(window).scrollTop(),
        		g = $sitehead.offset().top,
        		h = $sitehead.offset().top + $(this).height()-100;

        	if(w >= g && w<=h) {
        		$('.fixed-nav').fadeOut('fast')
        	} else {
                if($(window).width()>900)
        		  $('.fixed-nav').fadeIn('fast')
        	}

        	$post.each(function () {
        		var f = $(this).offset().top,
        			b = $(this).offset().top + $(this).height(),
        			t = $(this).parent('.post-holder').index(),
        		 	i = $(".fn-item[item_index='"+t+"']"),
        		 	a = $(this).parent('.post-holder').prev('.post-holder').find('.post-after');

        		 $(this).attr('item_index', t);

        		if(w >= f && w<=b) {

        			i.addClass('active');
        			a.fadeOut('slow')
        		} else {
        			i.removeClass('active');
        			a.fadeIn('slow')
        		}
        	})
        });

        $('li').before('<span class="bult icon-asterisk"></span>')
        $('blockquote p').prepend('<span class="quo icon-quote-left"></span>')
            .append('<span class="quo icon-quote-right"></span>')

    });

    $post.each(function () {
        var postText = $(this).html();
        var fa  = [];
        for(var i=0; i < icons.length; i++) {
            fa[i]       = {};
            fa[i].str   = "@"+ icons[i]+ "@";
            fa[i].icon  = icons[i];
            fa[i].int   = postText.search(fa[i].str);

            if(fa[i].int > -1 ) { 
                fa[i].count = postText.match(new RegExp(fa[i].str,"g")).length;
                console.log(fa[i].count)
                for(var j=0; j < fa[i].count; j++) {
                    $(this).html($(this).html().replace(fa[i].str, "<i class='fa "+fa[i].icon+"'></i>"))
                }
            }
        }
    })
    

    
    // Show/hide the top menu on scroll
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.top-toggle-menu').fadeOut(200);
            } else {
                $('.top-toggle-menu').fadeIn(200);
            }
        });

        $("#menu-toggle").click(function() {
          $(this).toggleClass("open");
          $("#top-menu").fadeToggle();
        });

    

    // Show/hide the footer button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
    });

    // Animate scrolling
    $('.go-top').click(function(e) {
        e.preventDefault();
        
        $('html, body').animate({scrollTop: 0}, 500);
    });
    


}(jQuery));


