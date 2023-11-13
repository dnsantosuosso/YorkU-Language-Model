jQuery('.kt-blocks-accordion-header:not(.once-marked)').each(function(){
	jQuery(this).addClass('once-marked').on('click', function(){
		const button = jQuery(this);
		const parent = button.closest('.kt-accordion-pane')[0];
		const body = jQuery('.kt-accordion-panel', parent);
		const isActive = button.hasClass('kt-accordion-panel-active');
		
		if (isActive) {
			button.attr('aria-expanded', 'false');
			body.removeClass('kt-accordion-panel-active');
			body.addClass('kt-accordion-panel-hidden');
		} 
		else {
			button.attr('aria-expanded', 'true');
			body.addClass('kt-accordion-panel-active');
			body.removeClass('kt-accordion-panel-hidden');
		}
		
		button.toggleClass('kt-accordion-panel-active');
		body.slideToggle();
	});
});