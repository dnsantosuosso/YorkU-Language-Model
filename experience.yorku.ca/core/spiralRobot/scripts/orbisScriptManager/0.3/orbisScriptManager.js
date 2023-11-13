var orbisScriptManager = (function(){
	
	var scriptsToLoad = new Array();
	var scriptsLoaded = new Array();
	var showDebugMessages = false;
	
	function runScriptLoader()
	{
		if(scriptsToLoad.length != 0)
		{
			debug("Fetching script: " + scriptsToLoad[0].script);
			
			$.getScript(scriptsToLoad[0].script, function() {
				scriptsLoaded.push(scriptsToLoad[0].script.split("?")[0]);
				
				if(scriptsToLoad[0].callbacks.length > 0)
				{
					$.each(scriptsToLoad[0].callbacks, function(i, callback){
						if(callback)
						{
							debug("Script Loaded, firing callback " + i + ": " + scriptsToLoad[0].script);
							callback();
						}
					});
				}
				
				scriptsToLoad.shift();
				runScriptLoader();
			});
		}
		else
		{
			debug("All scripts loaded");
			$.holdReady(false);
		}
	}
	
	function isScriptLoading(script, callbackToAddIfTrue)
	{
		script = script.split("?")[0];
		for(var i = 0; i < scriptsToLoad.length; i++)
		{
			if(scriptsToLoad[i].script == script)
			{
				scriptsToLoad[i].callbacks.push(callbackToAddIfTrue);
				return true
			}
		}
		
		return false;
	}
	
	function isScriptLoaded(script)
	{
		script = script.split("?")[0];
		
		for(var i = 0; i < scriptsLoaded.length; i++)
		{
			if(scriptsLoaded[i] == script)
			{
				return true;
			}
		}
		
		return false;
	}
	
	function debug(message)
	{
		if(showDebugMessages)
		{
			console.log("orbisScriptManager.js: " + message);
		}
	}
	
	function enableDebugMessages(enable)
	{
		showDebugMessages = enable;
	}
	
	function scriptLoaded(script)
	{
		script = script.split("?")[0];
		scriptsLoaded.push(script);
	
		debug("Script assumed loaded: " + script);
	}
	
	function loadScript(script, callback)
	{
		debug("Checking if script is currently loading: " + script);
		
		if(!isScriptLoading(script, callback))
		{
			debug("Checking if script has been loaded: " + script);
			
			if(!isScriptLoaded(script))
			{
				debug("Adding script to queue: " + script);
				
				scriptsToLoad.push({
					script: script,
					callbacks: [callback]
				});
				
				if(scriptsToLoad.length == 1)
				{
					debug("Starting up loader");
					
					$.holdReady(true);
					runScriptLoader();
				}
			}
			else
			{
				if(callback)
				{
					debug("Script already loaded, firing callback: " + script);
					callback();
				}
			}
		}
	}
	
	return {
		scriptLoaded : scriptLoaded,
		loadScript : loadScript,
		enableDebugMessages : enableDebugMessages
	};
})();

