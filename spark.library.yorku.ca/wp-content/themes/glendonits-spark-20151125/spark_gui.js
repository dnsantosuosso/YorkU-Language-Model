/* home page */
var openPop = "";

jQuery(document).ready(function (e) {
  jQuery('.topbartabs-1').click(function () {
    jQuery(this).parent().addClass("topbartabs-bg-1");
    jQuery(this).parent().removeClass("topbartabs-bg-2");
    jQuery(this).parent().removeClass("topbartabs-bg-3");
    jQuery('.topmenu-back').hide();
    jQuery('.topmenu-next').show();
    jQuery('.s1').show();
    jQuery('.s2').hide();
    jQuery('.s3').hide();
    jQuery('.p1').show();
    jQuery('.p2').hide();
  });

  jQuery('.topbartabs-2').click(function () {
    jQuery(this).parent().addClass("topbartabs-bg-2");
    jQuery(this).parent().removeClass("topbartabs-bg-1");
    jQuery(this).parent().removeClass("topbartabs-bg-3");
    jQuery('.topmenu-back').hide();
    jQuery('.topmenu-next').hide();
    jQuery('.s1').hide();
    jQuery('.s2').show();
    jQuery('.s3').hide();
    jQuery('.p1').show();
    jQuery('.p2').hide();
  });

  jQuery('.topbartabs-3').click(function () {
    jQuery(this).parent().addClass("topbartabs-bg-3");
    jQuery(this).parent().removeClass("topbartabs-bg-2");
    jQuery(this).parent().removeClass("topbartabs-bg-1");
    jQuery('.topmenu-back').hide();
    jQuery('.topmenu-next').hide();
    jQuery('.s1').hide();
    jQuery('.s2').hide();
    jQuery('.s3').show();
    jQuery('.p1').show();
    jQuery('.p2').hide();
  });

  jQuery('.topmenu-back').hide(); // starting state
  jQuery('.p2').hide(); // starting state
  jQuery('.s2').hide(); // starting state
  jQuery('.s3').hide(); // starting state

  jQuery('.topmenu-next').click(function () {
    jQuery(this).hide();
    jQuery('.topmenu-back').show();
    jQuery('.p1').hide();
    jQuery('.p2').show();
  });
  jQuery('.topmenu-back').click(function () {
    jQuery(this).hide();
    jQuery('.topmenu-next').show();
    jQuery('.p1').show();
    jQuery('.p2').hide();
  });

  jQuery('.video-mac-view').click(function () {
    var x = window.open(jQuery(this).attr("loc"));
  });

  jQuery('.video-transcript-pop, .video-transcript-pop-fr').click( function () {
    var popupTrans = jQuery('#pop-transcript-' + jQuery(this).attr('rel-id'));
    if (popupTrans.length > 0) {
      var newWindow = window.open('_blank');
      
      newWindow.document.open();
      newWindow.document.write(popupTrans.html());
      newWindow.document.close();
    }
  });

  jQuery('.DLG_titleCloseBtn').click(function () {
    jQuery('.dark-blanket').hide();
    jQuery(openPop).hide();
  });

  jQuery('.gui-bottom-link, .gui-bottom-nav-bar-link').click(function () {
    var a = jQuery(this).find('a');
    if (a.attr('href')) {
      window.open(a.attr('href'), (a.attr('href').indexOf('mailto') !== -1 ? '_self' : '_blank'));
      return false;
    }
  });


  jQuery('.new-homepage-menu li.menu-item-has-children > a').click(function () {
    jQuery('.sub-menu').css('display', 'none');
    jQuery(this).next().css('display', 'table-row');
  });
});

function playerReady(obj) {
  if (obj['id'] == 'swfvideo3043') {
    video3043.setFlashPlayer();
    video3043.flsPlayer.addModelListener("STATE", "OnStateChange");
  }
}

function OnStateChange(obj) {
  if (obj['id'] == 'swfvideo3043') {
    if (obj['newstate'] == 'PLAYING') video3043.autoPlay = true; else video3043.autoPlay = false;
  }
}
