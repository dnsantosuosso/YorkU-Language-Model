function doFckSubmit(form, btnAction, isSubmitForm) {
	if ( btnAction != null )
	{
		if (form.button != null)
		{
			form.button.value = btnAction;
		}
		
		if (form['siteElement.button'] != null)
		{
			form['siteElement.button'].value = btnAction;
		}
	}
	
	if ( isSubmitForm )
	{
		$(form).submit();
	}
	return true;
}

orbisAppSr.confirmDialog = function(message, confirmCallback, denyCallback){
	orbisAppSr.showConfirmModal(message, confirmCallback, denyCallback);
};