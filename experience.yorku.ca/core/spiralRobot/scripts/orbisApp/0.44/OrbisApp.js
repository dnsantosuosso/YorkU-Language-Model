/************** POLYFILLS **************/
if (!Object.entries)
{
	Object.entries = function( obj ){
		var ownProps = Object.keys( obj ),
	        i = ownProps.length,
	        resArray = new Array(i); // preallocate the Array
	    while (i--)
	      resArray[i] = [ownProps[i], obj[ownProps[i]]];
	    
	    return resArray;
  };
}

/**
 * IE11 and Edge will not catch a form being submitted multiple times and will allow each submit to go to the server.


if(navigator.userAgent.indexOf("Trident") > -1 || navigator.userAgent.indexOf("Edge") > -1)
{
	HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
	HTMLFormElement.prototype.submit = function() {
		if(orbisAppSr.lastFormSubmitted == null || !this.isEqualNode(orbisAppSr.lastFormSubmitted))
		{
			this._submit();
			orbisAppSr.lastFormSubmitted = this;
		}
	};
}
 */
/**
 * prevent anchors from double clicking 
 */

if(spiralRobotMigration && !spiralRobotMigration.stopClickGuard) {
	$(function(){
		$(".clickGuard").dblclick(function(e){return false;});
		$(".clickGuard").on('click', function(event){
			var $this = $(this);
			
			var isForm = $this.attr("type") === 'submit';
			
			if(isForm && $this.closest("form").attr("novalidate") && !$this.closest("form").valid()){
				return false;
			}
			
			if($this.hasClass('clickGuarded')){
				return false;
			}else{
				
				$this.addClass('clickGuarded');
				$this.addClass('disabled');
				if(isForm){
					$this.closest("form").submit();
				}else{
					$this.click();
				}
				if(!isForm){
					setTimeout(function(){
						$this.removeClass("clickGuarded");
						$this.removeClass('disabled');
					}, 3000);
				}
			}
		});
	});
}

/* dealing with the bootstrap modal z-index issues with the outer template */
$(document).on("show.bs.modal", function(ele) {

	var $modal = $("#" + ele.target.id);

	if($modal.is(".modal"))
	{
		orbisAppSr.newTopLayer($modal.data("modal").$backdrop);
		orbisAppSr.newTopLayer($modal.parent());
	}
});

var orbisAppSr = (function($, orbisAppLocalized){
	$.ajaxSetup({ traditional: true });
	
	var clickTrackingActive = false;
	
	//z-index management
	var startingZIndex = 999999999;
	var currentTopZIndex = startingZIndex;
	
	//touch params
	var touchGestureTime = 500; //milliseconds
	var swipeMinDistance = 40; //pixels
	var touchHoldTime = 700; //milliseconds
	var touchSwipeAngleTolerance = 30; //degrees
	
	var currentlyClicked = null;
	
	//loading overlay counter
	var loadingOverlayCalls = 0;
	
	var htmlStructures = {
		notification : {
			getNotificationContainer : function(){
				return	'<div class="is--spiral--robot">                                                 ' +
				        '<div class="notification__container hide--scrollbar">                           ' +
						'	<div class="hide--scrollbar__viewport--vertical js--notification__container">' +
						'	                                                                             ' +
						'	</div>                                                                       ' +
						'</div>                                                                          ' +
						'</div>                                                                          ';
			},
			getNotification : 	function(){
				return	'<div class="is--spiral--robot">                                                                                      ' +
				        '<div class="notification">                                                                                           ' + 
						'	<button class="notification__btn--close js--btn--close--notification"><i class="material-icons">close</i></button>' + 
						'	<div class="message">%(message)s</div>                                                                            ' + 
						'</div>                                                                                                               ' +
					    '</div>                                                                                                               ';
			}
		},
		
		modals : {
			getConfirmModal : function(){
				return	'<div class="is--spiral--robot">                                                                                                  ' +
				        '<div id="confirmModal" class="modal js--modal">                                                                                  ' +
						'	<div class="modal__inner">                                                                                                    ' +
						'		<button class="modal__btn--close js--close--modal"><i class="material-icons">close</i></button>                           ' +
						'		<h3 class="modal__title">%(htmlStructures.modals.confirmModal.confirmation)s</h3>                                         ' +
						'                                                                                                                                 ' +
						'		<div class="message">%(message)s</div>                                                                                    ' +
						'                                                                                                                                 ' +
						'		<button type="button" class="btn__default--text btn--info js--confirm sel_YesButtonTest">%(htmlStructures.modals.confirmModal.yes)s</button>' +
						'		<button type="button" class="btn__default--text btn--info js--deny">%(htmlStructures.modals.confirmModal.no)s</button>    ' +
						'	</div>                                                                                                                        ' +
						'</div>                                                                                                                           ' +
						'</div>                                                                                                                           ';
			},
			
			getAlertModal : function(){
				return	'<div class="is--spiral--robot">                                                                                          ' +
				        '<div id="alertModal" class="modal js--modal">                                                                            ' +
						'	<div class="modal__inner">                                                                                            ' +
						'		<button class="modal__btn--close js--close--modal"><i class="material-icons">close</i></button>                   ' +
						'		<h3 class="modal__title">%(htmlStructures.modals.alertModal.alert)s</h3>                                          ' +
						'                                                                                                                         ' +
						'		<div class="message">%(message)s</div>                                                                            ' +
						'                                                                                                                         ' +
						'		<button type="button" class="btn__default--text btn--info js--ok">%(htmlStructures.modals.alertModal.ok)s</button>' +
						'	</div>                                                                                                                ' +
						'</div>                                                                                                                   ' +
						'</div>                                                                                                                   ';
			}
		},
		
		loadingStructures : {
			loadingOverlay : function(){
				return	'<div class="is--spiral--robot">' + 
				        '<div class="loading--stuff">' + 
						'	<p>%(message)s</p>' + 
						'</div>' +
						'</div>';
			}
		}
	};
	
	var componentDefaults = {
		datepicker : {
			lang : orbisAppLocalized.locale,
			startDate : new Date(),
			lazyInit : true,
			mask : false,
			datepicker : true,
			timepicker : false,
			format : orbisAppLocalized.dateTimeFormats.php.dateShort,
			formatTime : orbisAppLocalized.dateTimeFormats.php.timeShort,
			step : 15,
			scrollInput : false,
			allowBlank : true
		},
		
		validate : {
			focusInvalid : false,
			onkeyup : false,
			errorElement : "div",
			errorClass : "error--tooltip",
			ignore:":hidden:not(.validateHiddenField)" ,
			errorPlacement : function(error, element){
				var $placementContainer = element.parents(".js--error-placement-container:last");
				var $placement = element.parents(".js--error-placement:first");
				var $foundPlacement = element;

				if($placementContainer.length > 0)
				{
					$placement = $placementContainer.find(".js--error-placement:first");
					if($placement.length > 0)
					{
						$foundPlacement = $placement;
					}
				}
				else if($placement.length > 0)
				{
					$foundPlacement = $placement;
				}
				
				orbisAppSr.newTopLayer(error);
				error.insertAfter($foundPlacement);
			},
			highlight : function(element, errorClass){
				$(element).parents(".input__group:first").addClass("error");
			},
			unhighlight : function(element, errorClass){
				$(element).parents(".input__group:first").removeClass("error");
			},
			
			invalidHandler : function(event, validator){
				if (!validator.numberOfInvalids())
					return;
				
				$('html, body').animate({
					scrollTop: parseInt($(validator.errorList[0].element).offset().top) - 150
				}, 400);
			}
		},
		
		ckeditor : {
			toolbar : "basic",
			language : orbisAppLocalized.locale,
			allowedContent : true,
			contentsCss: orbisAppLocalized.spiralRobotCss,
			bodyClass: orbisAppLocalized.spiralRobotTheme ? orbisAppLocalized.spiralRobotTheme : null//,
			//extraPlugins: ["spiralRobotTables"]
		},
		
		fullCalendar : {
			current : {
				
			},
			legacy : {
				"1.6.1" : {
					lazyFetching: false,
					timeFormat: {agenda: 'h:mm TT{ - h:mm TT}'},
					columnFormat:{month:"ddd",week:"ddd M/d",day:"dddd M/d"},
					titleFormat:{month:"MMMM yyyy",week:"MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",day:"dddd, MMM d, yyyy"},
					weekNumberTitle:"W",
					buttonText:{prev:"&nbsp;&#9668;&nbsp;",next:"&nbsp;&#9658;&nbsp;",prevYear:"&nbsp;&lt;&lt;&nbsp;",nextYear:"&nbsp;&gt;&gt;&nbsp;",today:"today",month:"month",week:"week",day:"day"},
					monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
					monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
					dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
					dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
					componentLocalized : {
						fr : {
							buttonText:{prev:"&nbsp;&#9668;&nbsp;",next:"&nbsp;&#9658;&nbsp;",prevYear:"&nbsp;&lt;&lt;&nbsp;",nextYear:"&nbsp;&gt;&gt;&nbsp;",today:"aujourd'hui",month:"mois",week:"semaine",day:"jour"},
							monthNames:["Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre"],
							monthNamesShort:["Jan","F&eacute;v","Mar","Avr","Mai","Jun","Jul","Ao&ucirc;","Sep","Oct","Nov","D&eacute;c"],
							dayNames:["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
							dayNamesShort:["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
						}
					}
				}
			}
		}
	};
	
	/**
	 * Private functions used within orbisApp
	 */
	
	function getHtmlStructure(structureFunction, variables)
	{
		if(typeof structureFunction !== "function")
		{
			orbisAppSr.outputError("getHtmlStructure", "Param at 0 is required and must be a function.");
			return "";
		}
		
		if(!variables)
		{
			variables = {};
		}
		
		return sprintf(structureFunction(), $.extend(orbisAppLocalized.translations, variables));
	}
	
	function overlayContainer($overlay, $container)
	{
		var bounds = $container.get(0).getBoundingClientRect();
		
		$overlay.find(".loading--stuff").css({
            position : "absolute",
            top : bounds.top + findParentScroll($container),
            left : bounds.left,
            width : bounds.width,
            height : bounds.height
        });
	}
	
	function findParentScroll($element){ 
		
		var total = 0;
		if($element.parent().length > 0 && !$element.parent().is("html"))
	    {
			var $parent = $element.parent();
			total = $parent.scrollTop() + findParentScroll($parent);
	    }
		else
	    {
			total = $element.parent().scrollTop();
	    }

		return total;
	}
	
	
	
	function angleBetweenTwoVectors(cx, cy, ex, ey)
	{
		var dy = ey - cy;
		var dx = ex - cx;
		var theta = Math.atan2(dy, dx);
		theta *= 180 / Math.PI;
		if (theta < 0) theta = 360 + theta;
		return theta;
	}
	
	function startTouchTracker()
	{
		var touchStartTime = 0;
		var touchHoldInterval = null;
		$(window).on("touchstart", function(e){
			resetLastTouchData();
			orbisAppSr.lastTouchData.start = [e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY];
			touchStartTime = new Date().getTime();
			
			if(touchHoldInterval)
			{
				clearInterval(touchHoldInterval);
			}
			
			touchHoldInterval = setInterval(function(){
				clearInterval(touchHoldInterval);
				$(window).trigger("touchhold");
				orbisAppSr.lastTouchData.hold = true;
			}, touchHoldTime);
		});
		
		$(window).on("touchmove", function(e){
			if(touchHoldInterval) clearInterval(touchHoldInterval);
			orbisAppSr.lastTouchData.move = [e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY];
			orbisAppSr.lastTouchData.time = new Date().getTime() - touchStartTime;
		});
		
		$(window).on("touchend touchcancel", function(e){
			if(touchHoldInterval) clearInterval(touchHoldInterval);
			orbisAppSr.lastTouchData.end = orbisAppSr.lastTouchData.move != null ? orbisAppSr.lastTouchData.move : orbisAppSr.lastTouchData.start;
			orbisAppSr.lastTouchData.time = new Date().getTime() - touchStartTime;
			parseTouch();
		});
	}
	
	function parseTouch()
	{
		if(orbisAppSr.lastTouchData.time <= touchGestureTime)
		{
			var angle = angleBetweenTwoVectors(orbisAppSr.lastTouchData.start[0], orbisAppSr.lastTouchData.start[1], orbisAppSr.lastTouchData.end[0], orbisAppSr.lastTouchData.end[1]);
			if(angle != 0)
			{
				if(180 - touchSwipeAngleTolerance <= angle && 180 + touchSwipeAngleTolerance >= angle)
				{
					var distance = orbisAppSr.lastTouchData.start[0] - orbisAppSr.lastTouchData.end[0];
					if(distance >= swipeMinDistance)
					{
						$(window).trigger("swipeleft");
					}
				}
				else if(360 - touchSwipeAngleTolerance <= angle || touchSwipeAngleTolerance >= angle)
				{
					var distance = orbisAppSr.lastTouchData.end[0] - orbisAppSr.lastTouchData.start[0];
					if(distance >= swipeMinDistance)
					{
						$(window).trigger("swiperight");
					}
				}
			}
		}
		else if(orbisAppSr.lastTouchData.hold)
		{
			$(window).trigger("touchholdend");
		}
	}
	
	function resetLastTouchData()
	{
		orbisAppSr.lastTouchData.start = null;
		orbisAppSr.lastTouchData.move = null;
		orbisAppSr.lastTouchData.end = null;
		orbisAppSr.lastTouchData.time = 0;
		orbisAppSr.lastTouchData.hold = false;
	}
	
	/**
	 * Creation of OrbisApp
	 */
	
	var orbisAppObj = {
		ajax : {},
		lastTouchData : {
			start : null,
			move : null,
			end : null,
			time : 0,
			hold : false
		},

		applyCkeditorDialogHandler : function (editor) {
			editor.config.baseFloatZIndex = 2000000000;
		},

		getComponentConfig : function(component, extend, version){
			if (extend && typeof extend === "string")
			{
				version = extend;
				extend = null;
			}
			
			var conf = componentDefaults[component];
			
			if(conf)
			{
				if(conf.current)
				{
					if(version && conf.legacy && conf.legacy[version])
					{
						conf = conf.legacy[version];
					}
					else
					{
						conf = conf.current;
					}
				}
				else
				{
					conf = componentDefaults[component];
				}
			}
			else
			{
				conf = {};
			}
			
			if(conf.componentLocalized)
			{
				$.extend(true, conf, conf.componentLocalized[orbisAppLocalized.locale]);
			}
			
			if(extend)
			{
				$.extend(conf, extend);
			}
			
			return conf;
		},
		
		buildForm : function(parameters, action, target, method){
			
			if(!method)
			{
				method = "post";
			}
			
			var theForm = $(document.createElement("form")).attr("method", method).attr("action", action).attr("enctype","multipart/form-data").attr("style","display:none;");
			
			if (target && typeof target === "string")
			{
				theForm.attr("target", target);
			}
			else if(target && typeof target === "boolean")
			{
				theForm.attr("target", '_BLANK' + Math.random()*100000);
			}
			
			$(theForm).insertObject(parameters);
			
			theForm.append($(document.createElement("input")).attr({
				type : "hidden",
				name : "rand",
				value : Math.floor(Math.random() * 100000)
			}));
			
			$(theForm).appendTo("body");
			return theForm;
		},
		
		checkDoc: function(seFullPath, request, docId, downloadRequest, errorMessageText) {
			$.post(seFullPath, request, function(data){
				if(data.success){
					orbisApp.buildForm(downloadRequest).submit();
				} else if (errorMessageText === undefined) {
					orbisApp.displayErrorMessage('<orbis:message javaScriptEscape="true"  code="i18n.na_studentApplicationGridAjax.Failedtoloaddocument" />');
				} else {
					orbisApp.displayErrorMessage(errorMessageText);
				}
			}, 'json');
		},
		
		checkAjaxResponse : function (xmlHttpRequest) {
			var happy = true;
			
			if (orbisAppSr.isEmpty(xmlHttpRequest))
			{
				happy = false;
				orbisAppSr.showNotification(orbisAppLocalized.translations.functions.checkAjaxResponse.c53266207, "error");
			}
			else
			{
				if (!orbisAppSr.isEmpty(xmlHttpRequest.getResponseHeader("notLoggedIn")))
				{
					happy = false;
				    window.parent.location = "/notLoggedIn.htm";
				}
				else if (!orbisAppSr.isEmpty(xmlHttpRequest.getResponseHeader("portalError")))
				{
					happy = false;
					orbisAppSr.showNotification(orbisAppLocalized.translations.functions.checkAjaxResponse.t14685232, "error");
				}
				else if (orbisAppSr.isEmpty(xmlHttpRequest.status))
				{
					if(!unloadedProperly)
					{
						happy = false;
						orbisAppSr.showNotification(orbisAppLocalized.translations.functions.checkAjaxResponse.g92510331, "error");
					}
				}
				else if (xmlHttpRequest.status != 200)
				{
					happy = false;
					orbisAppSr.showNotification(orbisAppLocalized.translations.functions.checkAjaxResponse.x410443028, "error");
				}
			}
			
			return happy;
		},
		
		showNotification : function(message, type, duration){
			if($(".notification__container").length == 0)
			{
				$(getHtmlStructure(htmlStructures.notification.getNotificationContainer)).appendTo("body");
			}
			
			if(!type)
			{
				type = "info";
			}
			
			if(duration === null || duration === undefined)
			{
				duration = 5000;
			}
			
			var $notification = $(getHtmlStructure(htmlStructures.notification.getNotification, {message : message}));
			$notification.find(".notification").addClass(type);
			orbisAppSr.newTopLayer($(".notification__container"));
			$notification.appendTo(".notification__container").animateCss("fadeInRight").find(".notification").addClass("is--visible");
			
			if(duration != 0)
			{
				$notification.delay(duration).queue(function(){
					orbisAppSr.hideNotification.apply(this);
				});
			}
			
			return $notification;
		},
		
		hideNotification : function(){
			$(this).animateCss("bounceOutRight", function(){
				$(this).remove();
			}, 400);
		},
		
		handleUiStateChange : function(property, state) {
			if(orbisAppSr.uiState && property in orbisAppSr.uiState)
			{
				if(orbisAppSr.uiState[property] != state)
				{
					orbisAppSr.uiState[property] = state;
					
					orbisAppSr.ajaxSend({
						action: orbisAppSr.actions.handleUiState,
						setProperty: property,
						setPropertyState: state
					});
				}
			}
		},
		
		showConfirmModal : function(message, confirmCallback, denyCallback){
			var $confirmModal = $("#confirmModal");
			var buttonClicked = false;
			
			if($confirmModal.length == 0)
			{
				$confirmModal = $(getHtmlStructure(htmlStructures.modals.getConfirmModal, {message : message})).appendTo("body").find("#confirmModal");
			}else{
				$confirmModal.find(".message").html(message);
			}
			
			$confirmModal.find(".js--confirm").off("click").click(function(){
				if(confirmCallback)
				{
					confirmCallback.apply($confirmModal);
				}
				buttonClicked = true;
				orbisAppSr.hideModal($confirmModal);
			});
			
			$confirmModal.find(".js--deny").off("click").click(function(){
				if(denyCallback)
				{
					denyCallback.apply($confirmModal);
				}
				buttonClicked = true;
				orbisAppSr.hideModal($confirmModal);
			});
			
			$confirmModal.off("hide").on("hide", function(){
				if(denyCallback && !buttonClicked)
				{
					denyCallback.apply($confirmModal);
				}
			});
			
			orbisAppSr.showModal($confirmModal);
			
			return $confirmModal;
		},
		
		showAlertModal : function(message, okCallback){
			var $alertModal = $("#alertModal");
			if($alertModal.length == 0)
			{
				$alertModal = $(getHtmlStructure(htmlStructures.modals.getAlertModal, {message : message})).appendTo("body").find("#alertModal");
			}else{
				$alertModal.find(".message").html(message);
			}
			
			$alertModal.find(".js--ok").off("click").click(function(){
				if(okCallback)
				{
					okCallback.apply($alertModal);
				}
				orbisAppSr.hideModal($alertModal);
			});
			
			orbisAppSr.showModal($alertModal);
			
			return $alertModal;
		},
		
		showModal: function (modal) {
            var $modal = null;
            
            if(typeof modal === "string")
            {
                $modal = $("div#" + modal);
            }
            else
            {
                $modal = $(modal);
            }
            
            if($modal)
            {
                if(orbisAppSr.isHybridMode())
                {
                    if(!($modal.parent().is("is--spiral--robot") && $modal.parent().parent().is("body")))
                    {
                        if(typeof $modal.data('appendToBody') == "undefined" || $modal.data('appendToBody'))
                        {
                        	$('<div class="is--spiral--robot"></div>').append($modal).appendTo('body');
                        }
                        else
                        {
                        	$modal.wrap('<div class="is--spiral--robot"></div>');
                        }
                    }
                }
                else if(typeof $modal.data('appendToBody') == "undefined" || $modal.data('appendToBody'))
                {
                    $modal.appendTo("body");
                }
                
                $modal.triggerHandler("show");
                orbisAppSr.newTopLayer($modal);
                $("body").css("overflow", "hidden");
                $modal.addClass('is--visible').removeClass('display--none').triggerHandler('shown');
                currentlyClicked = $(':focus');
                $('main :focusable ').not('.js--modal').not('.modal').attr('aria-hidden', true).attr('tabindex', -1).addClass('js--hidden');
                $('.modal .js--close--modal').focus();
            }
        },
        
        isHybridMode : function(){
        	return orbisApp && orbisApp.setUpRegularDialog;
        },
		
		hideModal : function(modal){
			var $modal = null;
			
			if(typeof modal === "string")
			{
				$modal = $("div#" + modal);
			}
			else
			{
				$modal = $(modal);
			}
			
			if($modal)
			{
				$modal.triggerHandler("hide");
				$("body").css("overflow", "initial");
                $modal.removeClass('is--visible').addClass('display--none').triggerHandler('hidden');

                $('main .js--hidden').attr('aria-hidden', false).attr('tabindex', 0).removeClass('js--hidden');
                if(currentlyClicked)
            	{
                	currentlyClicked.focus();
            	}
			}
		},
		
		showBottomBar: function (bottomBar) {
			var $bottomBar = null;
			
			if(typeof bottomBar === "string")
			{
				$bottomBar = $("div#" + bottomBar);
			}
			else
			{
				$bottomBar = $(bottomBar);
			}
			
			if($bottomBar)
			{
				$bottomBar.triggerHandler("show");
				
				$bottomBar.addClass('is--visible').removeClass('display--none').triggerHandler('shown');
				
				
				$('.bottomBar .js--close--bottomBar').focus();
				currentlyClicked = $(':focus');
				
			}
		},
		
		hideBottomBar : function(bottomBar){
			var $bottomBar = null;
			
			if(typeof bottomBar === "string")
			{
				$bottomBar = $("div#" + bottomBar);
			}
			else
			{
				$bottomBar = $(bottomBar);
			}
			
			if($bottomBar)
			{
				$bottomBar.triggerHandler("hide");
				$bottomBar.removeClass('is--visible').addClass('display--none').triggerHandler('hidden');
				//currentlyClicked.focus();
			}
		},
		
		showLoadingOverlay : function(message, $container){
			if (++loadingOverlayCalls == 1) {
				if(!message)
				{
					message = orbisAppLocalized.translations.functions.showLoadingOverlay.loading;
				}
				
				var $loading = $(getHtmlStructure(htmlStructures.loadingStructures.loadingOverlay, {message : message}));
				
				if($(".loading--stuff").length != 0)
				{
					$(".loading--stuff").remove();
				}
				
				if($container)
	            {
	                $loading.find("loading--stuff").addClass("not--fullscreen");
	                
	                $(window).on("resize.loadingOverlay", function(){
	                    overlayContainer($loading, $container);
	                });
	                
	                overlayContainer($loading, $container);
	            }
	            
	            $loading.appendTo("body");
	            orbisAppSr.newTopLayer($(".loading--stuff"));
	            $(".loading--stuff").addClass("is--visible").animateCss("fadeIn");
	        }
		},
		
		hideLoadingOverlay : function(){
			loadingOverlayCalls = Math.max(0, loadingOverlayCalls - 1);
			
			if (loadingOverlayCalls === 0) {
				$(".loading--stuff").animateCss("fadeOut", function(){
					$(".loading--stuff").removeClass("is--visible");
				});
				
				$(window).off("resize.loadingOverlay");
			}
		},
		
		isEmpty : function (obj)
		{
			var empty = false;
			
			if (typeof obj == "undefined" || obj == null || obj == "")
			{
				empty = true;
			}
			
			return empty;
		},
		
		outputError : function(functionName, message)
		{
			if(functionName && message)
			{
				console.error("OrbisApp error -> <b>%s</b>: %s", functionName, message);
				console.trace();
			}
			else
			{
				orbisAppSr.outputError("outputError", "There was an error while displaying the previous error. Please error properly.");
			}
		},
		
		removeThemeClasses : function(){
			$("body").removeClass("lp-theme--001 lp-theme--002 lp-theme--003 lp-theme--004 lp-theme--005");
		},
		
		safelyDestroyOrbisEditor: function(editorId)
		{
			if(CKEDITOR != undefined)
			{
				var editor = CKEDITOR.instances[editorId];
				
				if (!!editor)
				{
					editor.destroy();
					$("#charCountDiv_" + editorId).remove();
				}
			}
		},
		
		getSubscribers: function(eventName) {
			if (eventName)
			{
				var subscribers = $(document).data("subscribers") || {};
				$(document).data("subscribers", subscribers);
				
				if (!subscribers[eventName])
				{
					subscribers[eventName] = [];
					
					$(document).on(eventName, function(e, data){
						$.each($(this).data("subscribers")[eventName], function(index, subscriber){
							subscriber.callback && subscriber.callback.apply(subscriber.elements, [ data ]);
						});
					});
				}
				return subscribers[eventName];
			}
		},
		
		notifySubscribers: function(eventName, data) {
			$(document).trigger(eventName, [ data ]);
		},
		
		startMouseClickTracker : function(){
			if(!clickTrackingActive)
			{
				$(document).mousedown(function(e) {
					orbisAppSr.currentlyClicked = $(e.target);
				});
				$(document).mouseup(function(e) {
					orbisAppSr.currentlyClicked = null;
				});
				clickTrackingActive = true;
			}
		},
		
		newTopLayer : function($element){
			currentTopZIndex++;
			if($element)
			{
				$element.css("z-index", currentTopZIndex);
			}
			return currentTopZIndex;
		},
		
		initOrbisPlugin : function(functions, init, dataKey){
			return function(params){
				var ret = {};
				
				if(!$(this).data(dataKey))
				{
					$(this).data(dataKey, init.call(this, params) || $(this));
				}

				ret = $(this);
				if(params != null && typeof params == "string" && params in functions)
				{
					ret = functions[params].apply(this, Array.prototype.slice.call(arguments, 1));
					
					if(ret === undefined)
					{
						ret = $(this);
					}
				}
				return ret;
			};
		},
		
		initPlugin : function(pluginProto, dataKey){
			return function(params){
				var $this = $(this);
				
				if(!$this.data(dataKey))
				{
					$this.each(function(){
						$this.data(dataKey, new pluginProto($(this), params));
					});
				}
				
				var data = $this.data(dataKey);
				var ret = $this;
				
				if(params != null && typeof params == "string" && params in data)
				{
					var returnedVal = data[params].apply(data, Array.prototype.slice.call(arguments, 1));
					
					if(returnedVal)
						ret = returnedVal;
				}
				
				return ret;
			};
		},
		
		ajaxSend : function(params, successMessage, callback){
			if(typeof successMessage === "function")
			{
				callback = successMessage;
				successMessage = undefined;
			}
				
			$.post("", params, function(data, status, xhr){
				if (orbisAppSr.checkAjaxResponse(xhr))
				{
					if(successMessage)
						orbisAppSr.showNotification(successMessage, "success");
					
					if(callback)
						callback.apply(this, arguments);
				}
			}, "json");
		},
		
		handleProtips : function(){
			$.protip({
				protipTemplate : '<div class="{classes}" data-pt-identifier="{identifier}" style="{widthType}:{width}px">{arrow}{icon}<div class="protip-content" role="tooltip" aria-hidden="true">{content}</div></div>',
				defaults: {
					 classes: "tip--default"
				}
			});
		},
		
		checkMobile: function(){
			var isMobile = new Boolean();
			
			if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
			{
				isMobile = true;
				
			}
			return isMobile;
		},
		isValidEmail : function (s)
		{
			// RFC 2822 (https://tools.ietf.org/html/rfc2822#section-3.4.1)
		   return !orbisAppSr.isEmpty(s) && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(s);
		}
	};
	
	/**
	 * Site wide page events
	 */
	
	startTouchTracker();
	
	return orbisAppObj;
})(jQuery, orbisAppLocalized);

if(!window.orbisApp)
{
	window.orbisApp = orbisAppSr;
}