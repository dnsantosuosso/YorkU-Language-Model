(function($){
	$(document).ready(function(){
		handleSwitchBehaviour();
		handleMainNavBehaviour();
		handleActionsGroupDisplay();
	});
	
	function handleSwitchBehaviour()
	{
		$("div.switcher option").on("change", function(){
			$(this).parents("div.switcher:first").trigger("change");
		});
	}
	
	function handleMainNavBehaviour()
	{
		if(window.innerWidth < 1200 && orbisAppSr.uiState.mainNavDisplayed)
		{
			hideMainNav();
		}
		
		$(window).smartresize(function(){
			if(window.innerWidth < 1200 && orbisAppSr.uiState.mainNavDisplayed)
			{
				hideMainNav();
			}
		});
		
		$('.js--btn-toggle-side-menu').click(function(){
			if($(".navigation--mobile").is(".is--visible"))
			{
				hideMainNav();
			}
			else
			{
				showMainNav();
			}
		});
	}
	
	function showMainNav()
	{
		$('.navigation--mobile').addClass("is--visible");
		$('.navigation--mobile').attr('aria-hidden', 'false');
		$('.universal-search').addClass("is--visible");
		$('.main--alt').removeClass("is--fullscreen");
		$('.footer--bottom').addClass('open--navigation');
		
		if(window.innerWidth >= 1200)
		{
			orbisAppSr.handleUiStateChange("mainNavDisplayed", true);
		}
	}
	
	function hideMainNav()
	{
		$('.navigation--mobile').removeClass("is--visible");
		$('.navigation--mobile').attr('aria-hidden', 'true');
		$('.universal-search').removeClass("is--visible");
		$('.main--alt').addClass("is--fullscreen");
		$('.footer--bottom').removeClass('open--navigation');
		orbisAppSr.handleUiStateChange("mainNavDisplayed", false);
	}
	
	function handleActionsGroupDisplay()
	{
		function fixMenuHeight(mainMenu)
		{
			$(mainMenu).toggleClass("top-0", 
				mainMenu.offsetTop < 0 // above viewport 
				|| mainMenu.offsetTop < 1 && mainMenu.clientHeight <= 200 && mainMenu.scrollHeight <= 200 // at viewport border but menu too short for scrollbar
				|| mainMenu.clientHeight < mainMenu.scrollHeight // menu has scrollbar
			);
		}
		
		$(window).smartresize(function(){
			$(".js--interaction-menu.is--visible").each(function(){
				setTimeout(fixMenuHeight, 0, this);
			});
		});
		
		$(document).on("click", ".js--interaction-menu", function(){
			setTimeout(fixMenuHeight, 0, this);
		});
		
		$(document).on("click", ".js--interaction-btn", function(){
			$('.js--interaction-menu').each(function(){ setTimeout(fixMenuHeight, 0, this); });
		});
	}
})(jQuery);

// From Traditional UI:
$(document).ready(function(){
	// Side menu drop-downs
	$('.js--menu__link').click(function(){
		$(this).next().toggleClass('is--expanded');
	});
	
	// Sticky Nav on Scroll
	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
			$('.js--admin-header, .js--admin-nav,  .js--admin-header .logo__holder.left, .js--back-to-top, .universal-search, .settings-menu, .js--doc-nav, .sidebar--non-blocking, .js--resume-buttons, .js--resume-title--alt').addClass('sticky');
			$("body").addClass('is--header-sticky');
		} else {
			$('.js--admin-header, .js--admin-nav,  .js--admin-header .logo__holder.left, .js--back-to-top, .universal-search, .settings-menu, .js--doc-nav, .sidebar--non-blocking, .js--resume-buttons, .js--resume-title--alt').removeClass('sticky');
			$("body").removeClass('is--header-sticky');
		}
		

		if($('footer').length)
		{
			if ($(this).height() + $(this).scrollTop() >= $('footer').offset().top) {
				$("body").addClass('footer--visible');
			}
			else
			{
				$("body").removeClass('footer--visible');
			}
		}
	});
	
	
});

$(document).on("click", '.js--interaction-btn, .js--interaction-btn i', function(){
	$('.js--interaction-menu').toggleClass('is--visible');
	orbisAppSr.newTopLayer($('.js--interaction-menu'));
	$('.js--interaction-menu *').removeAttr("tabindex");
	// Make everything besides the menu have negative tabindex
	$('body button, body a, body input, body select').not('.js--interaction-menu *').attr("tabindex", "-1");
});	

$(document).click(function(event) { 
	// Interaction Menu
	if(!$(event.target).closest('.js--interaction-menu, .js--interaction-btn').length) {
		if($('.js--interaction-menu').hasClass("is--visible")) {
			$('.js--interaction-menu').removeClass('is--visible');
			$('.js--interaction-menu, .js--interaction-menu *').attr("tabindex", "-1");
			// Remove the negative tabindex unless specified
			$('body button, body a, body input, body select').not('.js--pilar--menu *, .js--interaction-menu, .js--interaction-menu *, .js--mobile-nav *, .js--header-search, .js--header-search *').removeAttr("tabindex");
		}
	}
});

$(document).ready(function () {
	// Open or Close a menu
	$('.js--btn--pilar').click(function(){
		$(this).next().toggleClass('is--open');
		$(this).toggleClass('is--active');
		// Close any other menu that might be open:
		$('.js--btn--pilar').not(this).next().removeClass('is--open');
		if($(this).next().hasClass('is--open')){
			// Make sure the menu and buttons/links are tabbable
			$(this).next().removeAttr("tabindex");
			$(this).next().find("a, button").removeAttr("tabindex");
			
			// Make everything besides the menu have negative tabindex
			$('body button, body a, body input, body select').not(this).not($(this).next().find("a, button")).attr("tabindex", "-1");
		 
		}
		else{
			
			$(this).next().attr("tabindex", "-1");
			$(this).next().find("a, button").attr("tabindex", "-1");
			
			$('.js--menu--main, .js--menu--main *').attr("tabindex", "-1");
			$('.js--btn--pilar, .js--btn-header-search, .js--btn--recent-menu, .js--btn--account-menu, .js--interaction-btn').removeAttr("tabindex");
			$('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
		}
	});
	// Dedicated Close: this will be generic
	$('.js--btn-close-menu').click(function(){
		$(this).parent().removeClass('is--open');
		$('.js--btn--pilar').removeClass('is--active');
		$(this).attr("tabindex", "-1");
		$(this).parent().find("a").attr("tabindex", "-1");
		// Remove tabindex from everything besides the menu have negative tabindex
		$('.js--btn--pilar, .js--btn-header-search, .js--btn--recent-menu, .js--btn--account-menu, .js--interaction-btn').removeAttr("tabindex");
		$('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
	});
	
	// Open Search in top banner:
	$('.js--btn-header-search').click(function(){
		$('.js--header-search').toggleClass('is--visible');
		$('.js--header-search input').focus();
		$('.js--header-search, .js--header-search *').removeAttr("tabindex");
		$('.js--menu-user').removeClass('is--visible');
		$('.js--menu-recent').removeClass('is--visible');
		
		// Make everything besides the menu have negative tabindex
		$('body button, body a, body input, body select').not('.js--header-search, .js--header-search *').attr("tabindex", "-1");
	});
	//Close Search in top banner:
	$('.js--btn-close-header-search').click(function(){
		$('.js--header-search').removeClass('is--visible');
		$('.js--header-search input').blur();
		$('.js--header-search, .js--header-search *').attr("tabindex", "-1");
		
		// Remove tabindex from everything besides the menu have negative tabindex
		$('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
	});
	
	// Interaction Menu Button
	
	
	
	
	// Drop-down Widget
	$(document).on('click', function(event) {
		if(!$(event.target).closest('.js--drop-down__list, .js--drop-down__btn, .js--floating-drop-down__btn, .js--floating-dropdown__container').length) {
			closeDropdown();
		}
	});
	
	$(document).on('click', '.js--drop-down__list li a', function(){
		$(this).parent().parent().removeClass('is--visible--top is--visible is--visible--right');
	});
	
	//Expand card
	$('.js--btn--expand__card').click(function(){
		$(this).parent().parent().prev().addClass('is--expanded');
	});
	//Collapse card
	$('.js--btn--close__card--fullscreen').click(function(){
		$(this).parent().removeClass('is--expanded');								 
	});
	// Expand Card
	$('.js--btn--expand__card').click(function(){
		$(this).toggleClass('is--expanded');
		$(this).parent().toggleClass('is--expanded');
	});
	// Generic Drop-Down
	$('body').on('click', '.js--drop-down__btn' ,function(){
		// check if dropdown is too close to bottom of viewport or too far right
		var pos = $(this).offset();
		var $next = $(this).next();
		var inActionsGroup = $(this).parents(".js--interaction-menu:first").length > 0;
		
		var isTop = $(this).offset().top + $(this).siblings(".drop-down__list").outerHeight() > $(window).scrollTop() + $(window).height();
		var isRight = pos.left + $(this).siblings('.drop-down__list').outerWidth() > $(window).width(); 
		
		//Close dropdown instead if its already visible
		if($next.hasClass('is--visible--right') || $next.hasClass('is--visible--top') || $next.hasClass('is--visible')){
			closeDropdown();
		}
		else{
			if(inActionsGroup)
			{
				$(this).next().addClass('is--visible');
				$('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top is--visible--right');
			}else if((isRight && isTop) || $(this).parent().hasClass("actions-group--secondary__container")) {
				//temporary fix for secondary actions group
				$(this).next().addClass('is--visible--right');
				$(this).next().addClass('is--visible--top is--visible');
				$('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top is--visible--right');
			}
			else if(isRight && !isTop){
				$(this).next().addClass('is--visible--right is--visible');
				$('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top is--visible--right');
			}
			
			else if(!isRight && isTop){
				$(this).next().addClass('is--visible--top is--visible');
				$('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top is--visible--right');
			}
			else{
				$(this).next().addClass('is--visible');
				$('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top is--visible--right');
			}
		}
	});
		
	$('body').on('click', '.js--floating-drop-down__btn', function () {

		var $dropdown = $(this).data("dropdownContent");

		if (!$dropdown) {
			$dropdown = $(this).siblings(".drop-down__list");
			$dropdown.appendTo("<div class='js--floating-dropdown__container is--spiral--robot'>").parent().appendTo("body");
			$dropdown.addClass("js--is--floating-drop-down");
			$dropdown.parent().css({
				width: "auto",
				position: "absolute",
				overflow: "auto",
				display: "inline-block",
				"max-height": 272,
				"border-radius": 16,
				"z-index": 3000
			});

			if ($(this).hasClass('set-overflow--visible')) {
				$dropdown.parent().addClass('overflow--visible');
			}

			$dropdown.css({
				position: "initial"
			});

			$(this).data("dropdownContent", $dropdown);
			$dropdown.data("dropdownButton", $(this));
			// add if statement for no ps
			$dropdown.parent().perfectScrollbar();
		}

		calculateFloatingDropdownPosition($dropdown);

		$(this).parents().not("html,body").on("scroll", function () {
			closeDropdown();
		});

		function calculateFloatingDropdownPosition($dropdown) {
			var $button = $dropdown.data("dropdownButton");
			var pos = $button.offset();
			var bodyOffset = $("body").css("position") === "relative" ? $("body").offset() : { top: 0, left: 0 };
			pos.bottom = pos.top + $button.outerHeight();
			var dropdownHeight = $dropdown.outerHeight() > 272 ? 272 : $dropdown.outerHeight();
			var dropdownWidth = $dropdown.outerWidth();
			var isTop = pos.top + dropdownHeight + $button.outerHeight() > $(window).scrollTop() + $(window).height();
			var isRight = pos.left + dropdownWidth > $(window).width();
			var isLeft = pos.left < 0;

			var dropdownTop = pos.bottom;
			var dropdownLeft = pos.left;

			var visibleSpaceAbove = pos.top - $(window).scrollTop();
			var visibleSpaceBellow = $(window).height() - (pos.bottom - $(window).scrollTop());

			closeDropdown($dropdown);

			$dropdown.addClass("is--visible").parent().removeClass("display--none");

			if (isRight) {
				dropdownLeft = $(window).width() - dropdownWidth;
			}

			if (isTop) {

				if (!$dropdown.hasClass("js--is--floating-drop-down") || visibleSpaceAbove > visibleSpaceBellow) {
					dropdownTop = pos.top - dropdownHeight;
				}

			}

			if (isLeft) {
				dropdownLeft = 0;
			}

			$dropdown.parent().css({
				top: dropdownTop - bodyOffset.top,
				left: dropdownLeft
			});
		}
	});
		
	//Close Drop-Down
	function closeDropdown($exception){

		$('.js--drop-down__list.is--visible').not($exception).each(function(){
			$(this).removeClass('is--visible');

			if($(this).is(".js--is--floating-drop-down"))
			{
				$(this).parent().addClass("display--none");
				$(this).data("dropdownButton").parents().not("html,body").off("scroll");
			}
		});

		$('.js--drop-down__list.is--visible--top').not($exception).removeClass('is--visible--top');
		$('.js--drop-down__list.is--visible--right').not($exception).removeClass('is--visible--right');
	}
	
	// Expand a button row on small screens:
	$('.js--btn-row__btn--expand').click(function(){
		$(this).parent().toggleClass('is--expanded');
	});
	
	// Open/close Notificaton modal
	$('body').on('click', '.js--btn--close--notification', function(){
		orbisAppSr.hideNotification.apply($(this).parent());
	});
	
	// Open notification example
	$('.js--example-open-notification-modal').click(function(){
		$('.notification').toggleClass('is--visible');
	});
	
	// Close Modal
	$('body').on('click', '.js--close--modal', function(){
		orbisAppSr.hideModal($(this).parents('.js--modal:first'));
	});
	$('body').on('click', '.js--modal',function(e){
		if (e.target !== this)
		return;
		if ($(this).data('uiBackdrop')) {
			orbisAppSr.hideModal($(this));
		}
	});
	
	// Open example modal
	$('.js--open--modal').click(function(){
		orbisAppSr.showModal($(this).next());
	});
	
	//Close bottom bar
	
	$('body').on('click', '.js--close--bottomBar', function(){
		orbisAppSr.hideBottomBar($(this).parents('.js--bottomBar:first'));
	});
	
	// Floating Input / Label
	
	$('.js--floating-input').each(function(){
		if($(this).val())
		{
			$(this).addClass("has--value");
			$(this).siblings("label").addClass("has--value");
		}
	});
	
	$("body").on("focus", '.js--floating-input', function(){
		$(this).prev().addClass('is--focused');
	});
	
	$("body").on("blur change", '.js--floating-input', function(){
		
		var val = $(this).val();
		
		if(val)
		{
			$(this).prev().addClass('has--value');
		}
		else
		{
			$(this).prev().removeClass('has--value');
		}
		
		$(this).prev().removeClass('is--focused');
	});
	
	// Make the focus state of a select box still visible
	$("body").on("focus", '.select', function(){
		$(this).parent().addClass('is--focused');
	});
	$("body").on("blur", '.select', function(){
		$(this).parent().removeClass('is--focused');
	});
	
	// Range Slider Value
	var rangeSlider = function(){
	var slider = $('.input--range'),
			range = $('.input--range input'),
			value = $('.input--range__value');
		
	 slider.each(function(){
		value.each(function(){
			var value = $(this).prev().attr('value');
			$(this).html(value);
		});
		range.on('input', function(){
			$(this).next(value).html(this.value);
		});
	});
	};
	rangeSlider();
	
	// Keyword/Tag Select:
	$('#tokenize').tokenize({
		autosize : "True"
	});

	//if browser doesn't support objectfit then resize images in list-card__img-container accordingly using css
	if( ! Modernizr.objectfit){
		$('.list-card__img-container').each(function(){
			var $container = $(this), imgUrl = $container.find('img').prop('src');
			
			if(imgUrl){
				$container.css('backgroundImage', 'url(' + imgUrl + ')' ).addClass('no--object-fit');
				$container.find('img').addClass('display--none');
			}
		});
	}
});


//	 slider like-effect
	var currentIndex = 0,
	items = $('.card--stat__data .card--stat__data-container'),
	itemAmt = items.length;

function cycleItems() {
	var item = $('.card--stat__data .card--stat__data-container').eq(currentIndex);
	items.fadeOut();
	item.fadeIn();
}

$('.next').click(function() {
	currentIndex += 1;
	if (currentIndex > itemAmt - 1) {
		currentIndex = 0;
	}
	cycleItems();
});

$('.prev').click(function() {
	currentIndex -= 1;
	if (currentIndex < 0) {
		currentIndex = itemAmt - 1;
	}
	cycleItems();
});



$(document).ready(function () {
/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

;( function( $, window, document, undefined )
{
	$( '.file-upload' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( 'label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
			var fileName = '';

			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else if( e.target.value )
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				$label.find( 'span' ).html( fileName );
			else
				$label.html( labelVal );
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});
})( jQuery, window, document );
	
});

//Smartresize:
(function($,sr){
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
			var timeout;

			return function debounced () {
					var obj = this, args = arguments;
					function delayed () {
							if (!execAsap)
									func.apply(obj, args);
							timeout = null;
					};

					if (timeout)
							clearTimeout(timeout);
					else if (execAsap)
							func.apply(obj, args);

					timeout = setTimeout(delayed, threshold || 300);
			};
	}
	// smartresize 
	jQuery.fn[sr] = function(fn){	return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

// Check if browser is resized in order to add/remove negative tabindex
$(document).ready(function () {
	var width = $(window).width();
		if(width >= 769) {
			// add in negative tabindex when search is offscreen
			$('.js--mobile-nav *').attr("tabindex", "-1");
		} 
		else {
			// remove negative tabindex when search is onscreen
			$('.js--mobile-nav *').removeAttr("tabindex");
		}
	$(window).smartresize(function(){
		var width = $(window).width();
		if(width >= 769) {
			// add in negative tabindex when search is offscreen
			$('.js--mobile-nav *').attr("tabindex", "-1");
		} 
		else {
			// remove negative tabindex when search is onscreen
			$('.js--mobile-nav *').removeAttr("tabindex");
		}
	});
});	


// Decide whether menu should overlap or push over the main tag
$(document).ready(function () {
	var width = $(window).width();
		if(width >= 769) {
			// Sticky Nav on Scroll
			$(window).scroll(function() {
				if ($(this).scrollTop() > 300) {
					$('.navigation--mobile').addClass('sticky');
				} else {
					$('.navigation--mobile').removeClass('sticky');
				}
			});
		} 
		else {
			$('.navigation--mobile').removeClass('sticky');
		}
	$(window).smartresize(function(){
		var width = $(window).width();
		if(width >= 769) {
			// Sticky Nav on Scroll
			$(window).scroll(function() {
				if ($(this).scrollTop() > 300) {
					$('.navigation--mobile').addClass('sticky');
				} else {
					$('.navigation--mobile').removeClass('sticky');
				}
			});
		} 
		else {
			$('.navigation--mobile').removeClass('sticky');
		}
	});
	
});

// Tooltips
$(document).ready(function(){
	
	orbisAppSr.handleProtips();
	
	$("body").on("protipready", ".protip", function(event, data){
		var contentId = "tooltipContent" + Math.floor(Math.random() * 100000);
		data.el.source.attr("aria-describedby", contentId);
		data.el.protip.find(".protip-content").attr("id", contentId);
	});
	
	$("body").on("protipshow", ".protip", function(event, data){
		orbisAppSr.newTopLayer(data.el.protip);
		data.el.protip.find(".protip-content").attr("aria-hidden","false");
	});
	
	$("body").on("protiphide", ".protip", function(event, data){
		data.el.protip.find(".protip-content").attr("aria-hidden","true");
	});
});

/* jQuery MaterialRipple Plugin */
/* 2014 Dominik Biedebach */
$.fn.materialripple = function(options) {
	var defaults = {
		rippleClass: 'ripple-wrapper'
	}
	$.extend(defaults, options);

	$('body').on('animationend webkitAnimationEnd oAnimationEnd', '.' + defaults.rippleClass, function () {
		removeRippleElement(this);
});

	var addRippleElement = function(element, e) {
		$(element).append('<span class="added '+defaults.rippleClass+'"></span>');
		newRippleElement = $(element).find('.added');
		newRippleElement.removeClass('added');

		// get Mouse Position
		var mouseX = e.pageX;
		var mouseY = e.pageY;

		// for each ripple element, set sizes
		elementWidth = $(element).outerWidth();
		elementHeight = $(element).outerHeight();
		d = Math.max(elementWidth, elementHeight);
		newRippleElement.css({'width': d, 'height': d});

		var rippleX = e.clientX - $(element).offset().left - d/2 + $(window).scrollLeft();
		var rippleY = e.clientY - $(element).offset().top - d/2 + $(window).scrollTop();

		// Position the Ripple Element
		newRippleElement.css('top', rippleY+'px').css('left', rippleX+'px').addClass('animated');
	}

	var removeRippleElement = function($element) {
		$element.remove();
	}

	// add Ripple-Wrapper to all Elements
	$(this).addClass('has-ripple');

	// Let it ripple on click
	$(this).bind('click', function(e){
		addRippleElement(this, e);
	});
}

$(document).ready(function(){
	$('.btn--ripple').materialripple();
});

// Make content after the hero element flow properly
$(".force-content-down").css({'height':(($(".hero").height())+'px')});

$(window).resize(function(){
	$(".force-content-down").css({'height':(($(".hero").height())+'px')});
});

// Preloader
$(document).ready(function() {	
	$('body').delay(1000).queue(function(){
		$(this).addClass('loaded').clearQueue();
	});
});

// Detect if card is scrollable
$(document).ready(function() {	
	$(".card--vanilla").each(function(){
		var contentHeight =	$(this).find('.card__content-height').height();
		var cardHeight = $(this).height();
		if(contentHeight > cardHeight){
			$(this).find('.is--scrollable').addClass('is--visible');
		} 
	});
});

// Open Filter-temp
$(document).ready(function() {	
	$('.js--btn-open-filters').click(function(){
		$('.sidebar--action').addClass('is--visible');
	});
	$('.js--btn-close-filters').click(function(){
		$('.sidebar--action').removeClass('is--visible');
	});
});

$(document).ready(function(){
	$('.js--btn-close-crd--more').hide();  
	$(document).on("click", '.js--btn-crd--more', function(){
	  $('.public-profile__header .btn--mail-user').addClass('is--hidden');
	  orbisAppSr.newTopLayer($(this).parents('.crd__content').find('.crd--more'));
	  $(this).parents('.crd__content').find('.crd--more').addClass('is--visible');
	  $(this).parents('.crd__content').find('.js--btn-close-crd--more').fadeIn();
	});
	  
	$(document).on("click", '.js--btn-close-crd--more', function(){
	  $(this).fadeOut();
	  $('.public-profile__header .btn--mail-user').removeClass('is--hidden');
	  $(this).parents('.crd--more').removeClass('is--visible');
	  $("body").removeClass("overflow--hidden");
	  
	});
});

$(document).ready(function(){
	  $('.js--btn--landing-menu').click(function(){
		$('.js--landing-nav').toggleClass('is--visible');
	  });
	  $('.js--btn--menu-close').click(function(){
		$('.js--landing-nav').toggleClass('is--visible');
	  });
	});

$(document).ready(function(){
	$('.js--activate--filters').click(function(){
	$('.js--filters').toggleClass('is--visible');
	$('.js--header--filters, .js--main--filters, .js--footer--filters').toggleClass('sidebar--fixed--right--large--is--visible');
	$('.js--search--experiences').toggleClass('is--hidden');
});
	
	
$('.js--saved-filters__btn, .js--active-filters__btn').click(function(){
	$('.sidebar--action__bottom__section.active, .sidebar--action__bottom__section.saved').toggleClass('is--visible');
 });
	
$('.js--btn--saveFilters').click(function(){
	$('#saveFilters').toggleClass('is--visible');
});

});