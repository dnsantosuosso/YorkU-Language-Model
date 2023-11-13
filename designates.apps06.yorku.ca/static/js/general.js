function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$(function () {
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {        
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    },
    error: function (aevent, arequest, options) {
      //debugger;
      //alert('You cannot reset this password... Please direct to accounts@yorku.ca');
      alert('An error has occurred, please reload the page. If the error persists, please report it at ithelp.yorku.ca, quoting error #' + aevent.status + ':' + aevent.statusText + '. Include what you were doing at the moment of the error as well as the browser and operating system you were using. Thanks!');
      console.log(aevent);
      console.log(arequest);
      throw aevent.status + ': ' + aevent.statusText;
    }
  });
})
