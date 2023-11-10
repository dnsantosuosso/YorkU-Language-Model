jQuery(document).ready(function() {
jQuery("#BulletinFeed").hide();
jQuery.ajax({
    // url: 'https://blog.yorku.ca/yufeeds/security-front-page-urgent-bulletins.rss',
    url: 'https://www.yorku.ca/safety/category/york-front-page/feed/',
    dataType: 'xml',
    success: function (data) {
      var self = jQuery(data).find('channel item').first();
      var url = jQuery(self).find('link').text();
      var title = jQuery(self).find('title').text(); 
      if (title != "") {
        var container = document.getElementById("BulletinFeed");
        var more_link = document.createElement("a");
        // set href on more_link
        more_link.setAttribute("href",url);
        // create more_link title
        var more_title = document.createElement("h2");
        // add title to more_title
        more_title.appendChild(document.createTextNode(title));
        // add link text to more_link
        jQuery(more_link).html(more_title);
        // add link to container and show it
        container.appendChild(more_link);
        jQuery("#BulletinFeed").show();
    }
    }
});
});

