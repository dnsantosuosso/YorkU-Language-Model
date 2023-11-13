function juiConfirm(myquestion, mytitle, mybuttons) {
  if (typeof(BootstrapDialog) != typeof(Function)) {
    alert("You do not have BootstrapDialog installed!");
    return false;
  } else {
    BootstrapDialog.show({
      title: mytitle,
      message: myquestion,
      buttons: mybuttons
    });
    return true;
  }
};

function juiMessage(mymessage, mytitle, reload = false, url = null) {
  juiConfirm(mymessage, mytitle, [{ 
                                   label: 'OK', 
                                   action: function(dialogItself) { 
                                                  dialogItself.close(); 
                                                  if (reload) { 
                                                    if (url != null) {
                                                      window.location.href = url
                                                    } else {
                                                      window.location.href = window.location.href
                                                    }
                                                  }
                                   } 
  }]);

  return true;
};

function juiForward(mymessage, mytitle, url) {
  juiConfirm(mymessage, mytitle, [{ 
                                   label: 'OK', 
                                   action: function(dialogItself) { 
                                                  dialogItself.close(); 
                                                  window.location.replace(url); 
                                   } 
  }]);

  return true;
};