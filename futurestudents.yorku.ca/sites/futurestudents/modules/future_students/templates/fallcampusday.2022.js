Drupal.behaviors.fallcampusday2023 = {
	attach:function(context, settings){
		let source_url = 	window.location.search;
		if(source_url){
			let url_parameters = 	new URLSearchParams(source_url);
			
			let utm_source = 		url_parameters.get('utm_source');
			let utm_campaign = 		url_parameters.get('utm_campaign');
			
			let dictionary = {
				'fall-campus-day-keele':{ //https://www.eventbrite.ca/e/york-university-fall-campus-day-2023-tickets-728845515557
					'facebook':	'facebook',
					'instagram':'igkeele',
					'display ads':'displaykeele',
					'programatic display':'disp',
					'pmax':		'pmaxKeele',
					'google':	'searchkeele',
					'tiktok':	'tiktokkeele',
				},
				'fall-campus-day-gl-en':{ //https://www.eventbrite.ca/e/glendon-fall-campus-day-journee-dautomne-sur-le-campus-tickets-718494304807
					'facebook':	'fbglen',
					'instagram':'igGLen',
					'display ads':'displayGLen',
					'programatic display':'dispGLen',
					'pmax':		'pmaxGLen',
					'google':	'searchGLen',
					'tiktok':	'tiktokGL',
				},
				'fall-campus-day-gl-fr':{
					'facebook':	'fbglfr',
					'instagram':'igGLfr',
					'display ads':'displayGLfr',
					'programatic display':'dispGLfr',
					'pmax':		'pmaxGLfr',
					'google':	'searchGLfr',
					'tiktok':	'tiktokGL',
				},
				'fall-campus-day-markham':{ //https://preview-yu-markham.eventbrite.ca/
					'facebook':	'fbmk',
					'instagram':'igmarkham',
					'display ads':'displaymarkham',
					'programatic display':'dispmarkham',
					'pmax':		'pmaxmarkham',
					'google':	'searchmarkham',
					'tiktok':	'tiktokmarkham',
				},
				'fall-campus-day':{
					'student-life-network':		'slnblast',
					'student-life-network-fb':	'slnfbk',
					'student-life-network-igf':	'slntwk',
					'student-life-network-igs':	'slnig',
					'student-life-network-twitter':'slnstoryk',
					'yconic':			'yconic',
					'yconic-facebook':	'yfbk',
					'yconic-twitter':	'ytwk',
					'yconic-igf':		'yigk',
					'yconic-igs':		'ystoryk',
					'sfg-email-3-fcd':	'sfgemail',
				}
			};
			
			//https://www.eventbrite.ca/e/york-university-fall-campus-day-2023-tickets-728845515557?aff=oddtdtcreator
			if(utm_source && utm_source && dictionary[utm_campaign][utm_source]){
				let url_dictionary = [
					'https://www.eventbrite.ca/e/york-university-fall-campus-day-2023-tickets-728845515557',
					'https://www.eventbrite.ca/e/glendon-fall-campus-day-journee-dautomne-sur-le-campus-tickets-718494304807',
					'https://preview-yu-markham.eventbrite.ca/'
				];
				
				for(let target_url of url_dictionary){
					jQuery('a[href^="' + target_url + '"]').each(function(){
						jQuery(this).attr('href', target_url + '?aff=' + dictionary[utm_campaign][utm_source]);
					});
				}
			}
		}
	}
}