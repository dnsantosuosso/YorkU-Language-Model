Drupal.behaviors.carousel_macro = {
	attach: function(context, settings){
		jQuery('.carousel.macro.wrapper').once('carousel-macro').each(function(){
			var target_carousel = 	this;
			var target_control = 	jQuery('.play-control', target_carousel);
			
			jQuery('a', target_control).click(function(event){
				event.stopPropagation();
				event.preventDefault();
				
				var target_control_active = 	target_control.find('a.active');
				var target_mode = 				((target_control_active.data('attr') == 'play') ? 'pause' : 'play');
				
				target_control_active.removeClass('active');
				target_control.find('a[data-attr="' + target_mode + '"]').addClass('active');
				
				target_control.data('override', target_mode);
			});
			
			var target_component = jQuery('macro-carousel', this);
			
			target_component.find('.slide').hover(function(){
				target_control.find('.active').removeClass('active');
				target_control.find('a[data-attr="pause"]').addClass('active');
			}, function(){				
				if(!target_control.data('override') || (target_control.data('override') && target_control.data('override') !== 'pause')){
					target_control.find('.active').removeClass('active');
					target_control.find('a[data-attr="play"]').addClass('active');					
				}				
			});
			
			setInterval(function(){
				if(target_control.find('a.active').data('attr') == 'play'){
					target_component[0].next();
				}
			}, 10000);
		});	
	}
};