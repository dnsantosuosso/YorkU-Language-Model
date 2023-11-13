$.fn.extend({
	animateCss: function (animation, endCallback, duration) {
		if(typeof endCallback === "number" || typeof endCallback === "string")
		{
			duration = endCallback;
			endCallback = null;
		}
		
		if(!duration)
		{
			duration = 250;
		}
		
		if(duration)
		{
			var durationString = typeof duration === "string" ? duration : duration + "ms";
			$(this).css({
				"-webkit-animation-duration" : durationString,
			  	"animation-duration" : durationString
			});
		}
		
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var classes = "animated " + animation;
		
		$(this).addClass(classes).one(animationEnd, function(){
			$(this).css({
				"-webkit-animation-duration" : "initial",
			  	"animation-duration" : "initial"
			});
			if(endCallback)
			{
				endCallback.apply(this);
			}
			$(this).removeClass(classes);
		});
		
		return this;
	},
	
	uiShow : function(){
		var uiShow = $(this).data("uiShow");
		if(uiShow)
		{
			if(typeof uiShow === "string")
			{
				uiShow = eval(sprintf("(function(){%s})", uiShow));
				$(this).data("uiShow", uiShow);
			}
				
			uiShow.call();
		}
		else
		{
			$(this).addClass("is--visible");
		}
	},
	
	uiHide : function(){
		var uiHide = $(this).data("uiHide");
		if(uiHide)
		{
			if(typeof uiHide === "string")
			{
				uiHide = eval(sprintf("(function(){%s})", uiHide));
				$(this).data("uiHide", uiHide);
			}
				
			uiHide.call();
		}
		else
		{
			$(this).removeClass("is--visible");
		}
	},
	
	template : function( props ) {	
		
		if(!props)
			props = {};
		
		var $this = $(this);
		
		var html = $this.html().trim();
			    
		var p = Object.entries(props);
		for (var i = 0; i < p.length; i ++)
		{
			var prop = p[i];
			var key = prop[0];
			var value = prop[1];		
			var regex = new RegExp("{{" + key + "}}", "g");
			html = html.replace(regex, value);
		}	
		
		var parsedHtml = $.parseHTML(html);
		
		return $(parsedHtml);
		
	},
	
	deleteElement : function(callback){
		$(this).animateCss("fadeOutRight", function(){
			$(this).remove();
			if(callback)
			{
				callback.apply(this);
			}
		});
	},
	
	insertObject : function(obj){
		var $container = $(this);
		
		$.each(obj, function(name, value){
			var $element = $container.find("[name='"+name+"']");
			
			if(Object.prototype.toString.call(value) === '[object Array]')
			{
				$.each(value, function(arrayIndex, arrayValue){
					$container.append($(document.createElement("input")).attr({
						type : "checkbox",
						name : name,
						value : arrayValue,
						checked : "checked"
					}).css("display", "none"));
				});
			}
			else if(Object.prototype.toString.call(value) === '[object Object]')
			{
				if($element.length > 0)
				{
					$element.val(JSON.stringify(value));
				}
				else
				{
					$container.append($(document.createElement("input")).attr({
						type : "hidden",
						name : name,
						value : JSON.stringify(value)
					}));
				}
				
			}
			else
			{
				if($element.length > 0)
				{
					$element.val(value);
				}
				else
				{
					$container.append($(document.createElement("input")).attr({
						type : "hidden",
						name : name,
						value : value
					}));
				}
			}
		});
		return $container;
	},
	
	serializeFormToObject : function(){
		if (typeof CKEDITOR != 'undefined' && CKEDITOR && CKEDITOR.instances)
		{
			for(var i in CKEDITOR.instances) CKEDITOR.instances[i].updateElement();
		}

		var serializedArray = $(this).serializeArray();
		var ret = new Object();

		$.each(serializedArray, function() {
		    if (ret[this.name])
		    {
		        if (!ret[this.name].push) 
		        {
		     	   ret[this.name] = [ret[this.name]];
		        }

		        ret[this.name].push(this.value || '');
		    } 
		    else 
		    {
		 	   ret[this.name] = this.value || '';
		    }
		});
		return ret;
	},
	
	isVisible : function($parent, fullyVisible)
	{
		var ret = null;
		if(this && $(this).length != 0)
		{
			if($parent === undefined || $parent === null || typeof $parent === "boolean")
			{
				if(typeof $parent === "boolean")
				{
					fullyVisible = $parent;
				}
				$parent = $(window);
			}
			
			var parentRect = $parent[0] === window ? {top: 0, height: window.innerHeight, left: 0, width: window.innerWidth} : $parent[0].getBoundingClientRect();
			var childRect = $(this)[0].getBoundingClientRect();

			var adjustedTop = childRect.top - parentRect.top;
			var adjustedBottom = childRect.bottom - parentRect.top;
			var adjustedLeft = childRect.left - parentRect.left;
			var adjustedRight = childRect.right - parentRect.left;
			
			var topIsVisible = adjustedTop <= parentRect.height && adjustedTop > 0;
			var bottomIsVisible = adjustedBottom <= parentRect.height && adjustedBottom > 0;
			var leftIsVisible = adjustedLeft <= parentRect.width && adjustedLeft > 0;
			var rightIsVisible = adjustedRight <= parentRect.width && adjustedRight > 0;
			var verticallyVisible = adjustedTop < 0 && adjustedBottom > parentRect.height;
			var horizontallyVisible = adjustedLeft < 0 && adjustedRight > parentRect.width;
			var bodyOnlyIsVisible = verticallyVisible && horizontallyVisible;
			
			var fullyVisibleCheck = fullyVisible && topIsVisible && bottomIsVisible && leftIsVisible && rightIsVisible;
			var cornerVisible = (topIsVisible || bottomIsVisible) && (leftIsVisible || rightIsVisible);
			
			ret = fullyVisibleCheck || !fullyVisible && (cornerVisible || verticallyVisible && (leftIsVisible || rightIsVisible) || horizontallyVisible && (topIsVisible || bottomIsVisible));
		}
		return ret;
	},
	
	editable : function(options) 
	{
		if(options === undefined) {
			options = {};
		}	
		
		var $this = $(this);
		
		$this.hover(function(){
			if(!$this.hasClass("active-editable"))
			{
				$this.css({
					"cursor" 				: "text",
					'-webkit-transition'	: 'background-color 100ms linear',
			    	'-ms-transition'		: 'background-color 100ms linear',
			    	'transition'			: 'background-color 100ms linear',
			    	'min-width' : '10px'
				});
				
				if(!options.noHighlight)
				{
					$this.css('background-color', options.highlightColour || '#f4f5f7');
				}
			}
		}, function(){
			$this.css("background-color","");
		});
		
		$this.click(function()
		{
			$this.css("background-color","");
			if( !$this.hasClass("active-editable") )
			{
				$this.addClass("active-editable");				
				
				var $container = $this.clone();
					$container.html("");
					$container.removeAttr("id");
					$container.addClass("editable-element-field-container");
					$container.css({"display" : "flex"});
					$container.css({"flex-wrap" : "nowrap"});
					$container.css({"align-items" : "center"});
						
					var $okBtn = $('<i class = "material-icons" style = "cursor:pointer;margin-left:5px;margin-right:5px;">done</i>');
					{
						$($okBtn).click(function(e){
							var fieldVal = $editableField.val();
							if( !fieldVal ) {
								fieldVal = '&#8203;'; // add a ZERO WIDTH SPACE character so the element will still be clickable
							}
							$this.html(fieldVal);
							$this.removeClass("active-editable");
							$this.show();
							$container.remove();
							if (options.onOk) {
								options.onOk();
							}
							e.stopPropagation(); // prevents editable reclick
						});
					}
					var $cancelBtn = $('<i class = "material-icons" style = "cursor:pointer;">clear</i>');
					{
						$($cancelBtn).click(function(e) {
							$this.removeClass("active-editable");
							$this.show();
							$container.remove();
							e.stopPropagation(); // prevents editable reclick
						});
					}

					var $editableField;
					if (options.inputType) {
						if (options.inputType === 'textarea') {
							$editableField = $('<textarea onfocus = "this.select()" class = "editable-element-field" style = "width:70%"/>');
						} else {
							$editableField = $('<input onfocus = "this.select()" class = "editable-element-field" style = "width:70%" type = "' + 'inputType' + '" />');
						}
					} else {
						$editableField = $('<input onfocus = "this.select()" class = "editable-element-field" style = "width:70%" type = "text" />');
					}
					if(options.fieldName){
						$editableField.attr('name', options.fieldName);
					}
					{
						$editableField.css("font-size", $this.css("font-size"));
						$editableField.keydown(function(e) {
							if(e.keyCode == 13){ // presses the enter key
								$okBtn.click();	
								e.stopPropagation(); // we don't want users unintentionally submitting a form
							}
							else if(e.keyCode == 27) // presses the esc key
							{
								$cancelBtn.click();
							}
						});
						$editableField.val($this.html().trim());
					}

					$container.append("&#8203;"); // ZERO WIDTH SPACE forces align-items : center
					$container.append($editableField);
					$container.append($okBtn);
					$container.append($cancelBtn);
							
				$this.after($container);
				$this.hide();
				$editableField.focus();
			}
		});
	},
	
	focusableWithHidden : function( element, hasTabindex ) {
		var map, mapName, img, focusableIfVisible, fieldset,
			nodeName = element.nodeName.toLowerCase();

		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap='#" + mapName + "']" );
			return img.length > 0 && img.is( ":visible" );
		}

		if ( /^(input|select|textarea|button|object)$/.test( nodeName ) ) {
			focusableIfVisible = !element.disabled;

			if ( focusableIfVisible ) {

				// Form controls within a disabled fieldset are disabled.
				// However, controls within the fieldset's legend do not get disabled.
				// Since controls generally aren't placed inside legends, we skip
				// this portion of the check.
				fieldset = $( element ).closest( "fieldset" )[ 0 ];
				if ( fieldset ) {
					focusableIfVisible = !fieldset.disabled;
				}
			}
		} else if ( "a" === nodeName ) {
			focusableIfVisible = element.href || hasTabindex;
		} else {
			focusableIfVisible = hasTabindex;
		}

		return focusableIfVisible;
	},
	
	addLoadingIcon : function(prepend){
		var $loadingIcon = $('<i class="material-icons loading-rotate js--loading-icon">sync</i>');
		if(prepend)
		{
			$(this).prepend($loadingIcon);
		}
		else
		{
			$(this).append($loadingIcon);
		}
	},
	
	removeLoadingIcon : function(){
		$(this).find(".js--loading-icon").remove();
	}
});

$.extend( $.expr[ ":" ], {
	focusableWithHidden: function( element ) {
		return $.fn.focusableWithHidden( element, $.attr( element, "tabindex" ) != null );
	}
} );

$.extend( $.expr[ ":" ], {
	tabbableWithHidden: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			hasTabindex = tabIndex != null;
		return ( !hasTabindex || tabIndex >= 0 ) && $.fn.focusableWithHidden( element, hasTabindex );
	}
} );
