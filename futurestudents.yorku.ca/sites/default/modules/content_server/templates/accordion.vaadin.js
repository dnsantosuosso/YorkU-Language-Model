Drupal.behaviors.cs2VaadinAccordions = {
    attach: function (context, settings) {
        var target_accordions = jQuery('.cs-vaadin-accordion vaadin-accordion');

        //core function
        target_accordions.on('opened-changed', function (event) {
            // var target_top = target_accordions.offset().top; //moved this segment inside because Safari wouldn't calculate this correctly

            var target_parent_panel = target_accordions.closest('.has-very-light-gray-background-color.has-background.grey-bg-block');
            if(target_parent_panel.length){
                target_top = target_parent_panel.offset().top;
            }

            var sticky_top_height = jQuery('.sticky-top').height() || 0;

            var target_index = (this.opened);

            if(typeof window.vaadin_accordion_suppress_scroll == 'undefined' || window.vaadin_accordion_suppress_scroll == FALSE){
                jQuery('html').scrollTop(target_top - sticky_top_height);
            }

            jQuery('york-calendar-events', this).each(function () {
                this.requestUpdate();
            });

            if(typeof AOS !== 'undefined'){
                AOS.refresh();
            }

            if(typeof ga !== 'undefined'){
                ga('create', 'UA-54028600-1', {'name':'main'}) // please do not change this
                ga('main.send', 'event', window.location.hostname, 'accordion:accordion-clicked', 'accordion:changed' + target_index);
            }
        });

        window.addEventListener('WebComponentsReady', function () {
            var hash = window.location.hash;
            if(hash){
                var target_id = jQuery(hash);
                var target_panel = (target_id.length > 0 ? target_id.closest('vaadin-accordion-panel') : jQuery('vaadin-accordion-panel[data-hash="' + hash + '"]'));
                var target_parent = target_panel.closest('vaadin-accordion');

                if(target_panel && target_parent.length){
                    var target_index = target_parent.find('vaadin-accordion-panel').index(target_panel[0]);
                    target_parent[0].opened = target_index;

                    if(target_id.length > 0){
                        let scrollToTarget = function () {
                            jQuery('html').scrollTop(target_id.offset().top - jQuery('.sticky-top').height());
                            jQuery('paper-ripple')[0].simulatedRipple();
                        };

                        setTimeout(scrollToTarget, 500);
                        setTimeout(scrollToTarget, 1000);
                    }
                }
            }
        });
    }
};
