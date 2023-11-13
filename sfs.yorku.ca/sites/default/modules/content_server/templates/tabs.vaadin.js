Drupal.behaviors.cs2VaadinTabs = {
	attach: function(context, settings){
		var target_tabs = jQuery('.cs-vaadin-tabs vaadin-tabs');
		
		//core function
		target_tabs.click(function(event){
			var target_index = (this.selected);
			jQuery(this).closest('.cs-vaadin-tabs').find('iron-pages')[0].selected = target_index;
			
			if(typeof ga !== 'undefined'){
				ga('create', 'UA-54028600-1', {'name':'main'}) // please do not change this
				ga('main.send', 'event', window.location.hostname, 'tabs:tabs-clicked', 'tabs:changed' + target_index);							
			}
		});
		
		//media query
		var mediaQuery = window.matchMedia('(max-width:600px)');
		if(mediaQuery.matches){
			target_tabs.each(function(){
				this.orientation = 'vertical';
			});
		}
		
		mediaQuery.addListener(function(event){
			target_tabs.each(function(){
				this.orientation = (event.matches ? 'vertical' : 'horizontal');
			});
		});
		
		window.addEventListener('WebComponentsReady', function() {
			let hash = window.location.hash;
			let hash_target = jQuery('vaadin-tab[data-hash="' + hash + '"]');
			
			if(hash && hash_target.length > 0){
				hash_target.click();
				
				let hash_target_parent = hash_target.closest('vaadin-tabs');
				
				var target_index = (hash_target_parent[0].selected);
				var target_parent = jQuery(hash_target_parent).closest('.cs-vaadin-tabs');
				
				target_parent.find('iron-pages')[0].selected = target_index;	
				jQuery('html').scrollTop(target_parent.offset().top - jQuery('.sticky-top').height());
			}
			
			window.addEventListener('hashchange', function(){
				var hash = window.location.hash;
				let hash_target = jQuery('vaadin-tab[data-hash="' + hash + '"]');
				
				if(hash_target.length > 0){
					hash_target.click();
					
					let hash_target_parent = hash_target.closest('vaadin-tabs');
					
					var target_index = (hash_target_parent[0].selected);
					var target_parent = jQuery(hash_target_parent).closest('.cs-vaadin-tabs');
					
					target_parent.find('iron-pages')[0].selected = target_index;	
					jQuery('html').scrollTop(target_parent.offset().top - jQuery('.sticky-top').height());
				}			
			});
		});
	}
};