$('a[data-toggle="dropdown"]:not([href=""])').off('click.namespace').on('click.namespace',
   function(e) {
       if ($(this).parent().is('.show, .open')) 
           window.open($(this).attr(
                'href'), $(this).attr('target') || '_self');
   });