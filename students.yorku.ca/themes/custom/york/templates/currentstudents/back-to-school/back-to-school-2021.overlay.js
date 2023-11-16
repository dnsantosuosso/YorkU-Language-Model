Drupal.behaviors.b2s_2021_overlay = {
	attach: function (context, settings) {
		let body = jQuery('body, html');
		const variable = 'b2s-self-selection';
		let self_selector = jQuery('#self-selector');

		if (!window.localStorage.getItem(variable) || typeof window.localStorage.getItem(variable) == 'undefined') {
			window.localStorage.setItem(variable, 'null');
		}

		if (window.localStorage.getItem(variable) !== 'null') {
			//hide if the selection is already made
			self_selector.css('display', 'none');

			const changed_event = new Event('self-selection-changed');
			document.dispatchEvent(changed_event);
		}
		else {
			self_selector.css('display', 'block');
			body.css('overflow', 'hidden');
		}

		function self_selection_restore() {
			jQuery('#self-selector').css('display', 'none');
			body.css('overflow', 'auto');

			const changed_event = new Event('self-selection-changed');
			document.dispatchEvent(changed_event);
		}

		jQuery('#self-selector-control a').click(function (event) {
			event.stopPropagation();
			event.preventDefault();

			self_selection_restore();
			jQuery('#site-title a').focus();
		});

		jQuery('#self-selector-body-wrapper a').click(function (event) {
			if (jQuery(this).attr('href') == "#") {

				event.stopPropagation();
				event.preventDefault();

				window.localStorage.setItem(variable, jQuery(this).data('value'));

				ga('create', 'UA-54028600-1', { 'name': 'main' }) // please do not change this
				ga('main.send', 'event', 'students.yorku.ca', 'Back-to-school Self-identifier', jQuery(this).data('value')); //category, action, label

				self_selection_restore();
			}
		});

		jQuery(".self-selector-invoke").click(function (event) {
			event.stopPropagation();
			event.preventDefault();

			self_selector.css('display', 'block');
			body.css('overflow', 'hidden');
		});

		jQuery(document).ready(function () {
			jQuery('#self-selector-body-wrapper a:first').focus();
		});

		jQuery('#self-selector-body-wrapper a[data-value="other"]').focusout(function () {
			jQuery('#self-selector-control >a').focus();
		});

	}
};