function searchPrimo($uniqueQuery) {

  var $pQ   = "primoQuery-" + $uniqueQuery;
  var $pQT  = "primoQueryTemp-" + $uniqueQuery;
  
  document.getElementById($pQ).value = "any,contains," + document.getElementById($pQT).value.replace(/[,]/g, " ");
  document.forms["searchForm"].submit();
}