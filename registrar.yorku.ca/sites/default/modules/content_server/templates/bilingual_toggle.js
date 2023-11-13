document.addEventListener('WebComponentsReady', function(){
	localStorage.setItem('bilingual-toggle', (localStorage.getItem('bilingual-toggle') || "english"));
	
	var target_toggle = 		jQuery('york-paper-toggle-button-bilingual');
	
	if(target_toggle.length > 0){
		//boostrap
		var initial = (localStorage.getItem('bilingual-toggle') == 'french' ? true : false);
		
		var event = new CustomEvent('bilingual-toggle', {detail:{language:localStorage.getItem('bilingual-toggle')}});//https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
		document.dispatchEvent(event);
		
		target_toggle.each(function(){
			this.checked = initial;		
		});
		
		jQuery('.cs-bilingual-toggle').each(function(){
			jQuery(this).find('iron-pages')[0].selected = (initial ? 1 : 0);
		});
		
		jQuery('.cs-bilingual-toggle').each(function(){
			let target_canvas = jQuery(this);
			if(initial && target_canvas.find('iron-pages')[0].querySelector('.french h1') != null){
				jQuery('#block-pagetitle h1').addClass('hidden');
			}
		});			
		
		//later
		target_toggle.change(function(event){
			let target_toggle = this;
			
			ga('create', 'UA-54028600-1', {'name':'main'}) // please do not change this
			ga('main.send', 'event', window.location.hostname, 'Bilingual Toggle Event', (target_toggle.checked ? 'French' : 'English') + ' selected'); //category, action, label
			
			jQuery('.cs-bilingual-toggle').each(function(){
				let target_canvas = jQuery(this);
				
				target_canvas.find('iron-pages')[0].selected = (target_toggle.checked ? 1 : 0);
				if(target_toggle.checked && target_canvas.find('iron-pages')[0].querySelector('.french h1') != null){
					jQuery('#block-pagetitle h1').addClass('hidden');
				}
				else{
					jQuery('#block-pagetitle h1').removeClass('hidden');
				}
			});
			
			localStorage.setItem('bilingual-toggle', (target_toggle.checked ? 'french' : 'english'));
			
			var event = new CustomEvent('bilingual-toggle', {detail:{language:(target_toggle.checked ? 'french' : 'english')}});//https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
			document.dispatchEvent(event);
			
			if(AOS){
				AOS.refresh();
			}
		});		
	}
});