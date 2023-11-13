function init_glendon() {

    jQuery('img').addClass('img-responsive');

    jQuery('#btn_quicklinks').click(function (e) {

        if (jQuery('#quicklinks').is(":visible")) {
            jQuery('#quicklinks').hide('puff');
            jQuery('#quicklinks_caret').removeClass('fa-sort-desc');
            jQuery('#quicklinks_caret').addClass('fa-sort-asc');
            jQuery('#quicklinks').attr('role', 'presentation');
            jQuery('#quicklinks').attr('aria-hidden', 'true');

        } else {
            jQuery('#quicklinks').show('puff');
            jQuery('#quicklinks_caret').removeClass('fa-sort-asc');
            jQuery('#quicklinks_caret').addClass('fa-sort-desc');
            jQuery('#quicklinks').removeAttr('role');
            jQuery('#quicklinks').removeAttr('aria-hidden');
        }

        e.stopPropagation();
    });

    trigger_replace();

    jQuery(document).click(function () {
        if (jQuery('#quicklinks').is(":visible")) {
            jQuery('#quicklinks').hide('puff');
            jQuery('#quicklinks_caret').removeClass('fa-sort-desc');
            jQuery('#quicklinks_caret').addClass('fa-sort-asc');
            jQuery('#quicklinks').attr('role', 'presentation');
            jQuery('#quicklinks').attr('aria-hidden', 'true');
        }
    });

    jQuery("#quicklinks").click(function (e) {
        e.stopPropagation(); // This is the preferred method.
        return true;        // This should not be used unless you do not want
        // any click events registering inside the div
    });

    var wrapper = jQuery('.wrapper').height();
    if (wrapper < 600) {
        var height = jQuery('body').height();
        jQuery('.wrapper').css('min-height', (height - 312));
    }

    //Home page
    jQuery('#tab-1').show();
    jQuery('#tab-2').hide();
    jQuery('#tab-3').hide();

    jQuery('#btn_events').click(function () {
        jQuery('#tab-1').hide();
        jQuery('#tab-2').show();
        jQuery('#featured').hide();
        jQuery('#featured-li').removeClass('active');
        jQuery('#events-li').addClass('active');
        return false;
    });

    jQuery('#btn_featured').click(function () {
        jQuery('#tab-1').show();
        jQuery('#tab-2').hide();
        jQuery('#featured').show();
        jQuery('#events-li').removeClass('active');
        jQuery('#featured-li').addClass('active');
        return false;
    });

    //Convert tabs to collapse
    jQuery('.nav-tabs').tabCollapse();

    //Make toplevel menu items clickable when in mobile view
    var $mainMenu = jQuery('#main-primary').on('click', 'span.sub-arrow', function (e) {
        // toggle the sub menu on sub arrow click in collapsible mode
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub'),
                    subIsVisible = $sub.dataSM('shown-before') && $sub.is(':visible');
            $sub.dataSM('arrowClicked', true);
            obj.itemActivate($item);
            if (subIsVisible) {
                obj.menuHide($sub);
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }).bind({
        // don't show the sub menu in collapsible mode unless the sub arrow is clicked
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        },
        'show.smapi': function (e, menu) {
            jQuery(menu).dataSM('parent-a').children('span.sub-arrow').text('-');
        },
        'hide.smapi': function (e, menu) {
            jQuery(menu).dataSM('parent-a').children('span.sub-arrow').text('+');
        }
    });

    //Fix for bootstrap tab when linking to
    //example link <a href="yoursite.com/#tab_mytab">Go to Specific Tab </a>
    var hash = document.location.hash;
    
    var prefix = "tab_";
    if (hash) {
        jQuery('.nav-tabs a[href=' + hash.replace(prefix, "") + ']').tab('show');
    }

// Change hash for page-reload
    jQuery('.nav-tabs a').on('shown', function (e) {
        window.location.hash = e.target.hash.replace("#", "#" + prefix);
    });
}

function trigger_replace() {
    jQuery('.ai1ec-next-year,.ai1ec-next-month,.ai1ec-minical-trigger,.ai1ec-prev-month,.ai1ec-prev-year,.ai1ec-next-page,.ai1ec-prev-page,.ai1ec-next-day,.ai1ec-prev-day,.ai1ec-prev-week,.ai1ec-next-week,.ai1ec-load-view,.ai1ec-clear-filter,.ai1ec-tooltip-trigger').click(function () {
        window.setTimeout(replace, 1000);
    });
    jQuery('#ai1ec-view-agenda,#ai1ec-view-oneday,#ai1ec-view-month,#ai1ec-view-week,#ai1ec-view-posterboard,#ai1ec-view-stream').click(function () {
        window.setTimeout(replace, 1000);
    });
}

function replace() {
    var url = window.location.href;
    if (url.search("www.glendon") == 7) {
        var replace_str = jQuery('#ai1ec-container').html();
        var newstr = replace_str.replace(/www2.glendon/g, "www.glendon");
        jQuery('#ai1ec-container').html(newstr);
    }
    trigger_replace();
}

