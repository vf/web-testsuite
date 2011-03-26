/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	function __loadScriptFile(fileName){
		//var node = document.createElement("script");
		//node.type = "text/javascript";
		//node.src = "js/" + fileName + "?nocache="+(+new Date());
		//document.body.appendChild(node);
		document.write('<script type="text/javascript" src="js/' + fileName + "?nocache="+(+new Date()) + '"></script>');
	}
	
	// Currently we are using embed.toJson() and need the "vodafone-apps-manager2.2" version
	// for those devices that have no JSON implementation natively.
	if (window.navigator.userAgent.split("MSIE 7.0").length>1) {
		__loadScriptFile("embedjs-windows-phone-7-ie7.js");
	} else if (!window["JSON"]){
		__loadScriptFile("embedjs-vodafone-apps-manager2.2.js");
	} else {
		__loadScriptFile("embedjs-android.js");
	}
})();
