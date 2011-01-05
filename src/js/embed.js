(function(){
	
	function __loadScriptFile(fileName){
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.src = fileName + "?nocache="+(+new Date());
		document.body.appendChild(node);
	}
	
	// Currently we are using embed.toJson() and need the "vodafone-apps-manager2.2" version
	// for those devices that have no JSON implementation natively.
	if (!window["JSON"]){
		__loadScriptFile("js/embedjs-vodafone-apps-manager2.2.js");
	} else {
		__loadScriptFile("js/embedjs-android.js");
	}
})();
