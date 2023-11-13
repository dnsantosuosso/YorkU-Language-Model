<!--

// Initialization
if (document.getElementById) {
  if (window.addEventListener)
    window.addEventListener("load", requestBodyOnLoad, false);
  else if (window.attachEvent) {
    window.attachEvent("onload", requestBodyOnLoad);
  }
}
/* variable to avoid multiple submissions if things are slow */
submitted = 0;

function requestBodyOnLoad() {
  badSafarip();
  var loginform = document.forms["loginform"];
  if (!loginform) {
    return;
  }
  
  // auto focus on username
  if (loginform.mli)
    if (loginform.mli.value != "") {
      if (loginform.password) {
        loginform.password.focus()
      }
    }
    else loginform.mli.focus();
  
  // add requestform onsubmit event
  if (loginform.onsubmit)
    loginform.inlineOnSubmit = loginform.onsubmit;
  loginform.onsubmit = validateLoginFormWrapper;

}

function badSafarip()
{
  var divstyle = getStyleObject("toplayer");
  var ua = navigator.userAgent;
      
  if (ua.match('.*Safari/4.*')) {
      divstyle.display = 'none';
 }
}

//--------------------------------------------------------------------------------

//-- This wrapper preserves any inlined javascript in the form's submit button. 
function validateLoginFormWrapper() {
  var loginform = document.forms["loginform"];
  var ret = undefined;

  if (submitted > 0) 
    return(false);
  submitted++;
  if (loginform && loginform.inlineOnSubmit)
    ret = loginform.inlineOnSubmit();
  if (ret == undefined)
    ret = true;
  
  if (validateLoginForm() && ret) {
    return(true);	
  }
  else {
    submitted = 0;
    return(false);
  }
}

/**
 * check loginform input fields.
 */
function validateLoginForm() {
  var loginform = document.forms["loginform"];
  if (!loginform) {
    return false;
  }
  if (loginform.mli) {
    var uname = loginform.mli.value.toLowerCase();
    if (uname == "") {
      alert('Please enter your username.');
      return(false);
    }
    if (uname.indexOf('@') != -1) {
      alert('You appear to be entering an email address.  Please enter only your username.');
      return(false);
    }
  }
  if (loginform.password) {
    if (loginform.password.value == "") {
      alert('Please enter your password.');
      return(false);
    }
  }
  return(true);
}


  function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
} // getStyleObject

// -->
