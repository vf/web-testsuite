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

	var infoItems = [
		"screen.availHeight",
		"screen.availWidth",
		"screen.height",
		"screen.width",

		"window.innerHeight",
		"window.innerWidth",
		"window.outerHeight",
		"window.outerWidth",

		"navigator.userAgent",

		"Widget.Device.widgetEngineProvider",
		"Widget.Device.widgetEngineVersion",
		"Widget.Device.widgetEngineName",
		"Widget.Device.getAvailableApplications()",

		"Widget.Device.DeviceInfo.phoneModel",
		"Widget.Device.DeviceInfo.phoneOS",
		"Widget.Device.DeviceInfo.phoneFirmware",
		"Widget.Device.DeviceInfo.phoneScreenHeightDefault",
		"Widget.Device.DeviceInfo.phoneScreenWidthDefault"
	];

	function getObj(path, context){
		var current = context || this;
		var bits = path.split(/\s*\.\s*/);
		var bit;
		while(current && (bit = bits.shift()) != null){
			if(bit.slice(-2) === "()"){
				current = current[bit.slice(0, -2)]();
			}else{
				current = current[bit];
			}
		}

		return current;
	}

	var _escapeNode = document.createElement("span");
	function e(str) {
		_escapeNode.innerHTML = "";
		_escapeNode.appendChild(document.createTextNode(str));
		return _escapeNode.innerHTML;
	}

	function getType(obj) {
		var type = typeof obj;
		if (type === "object") {
			type = Object.prototype.toString.call(obj).slice(8, -1)
		}

		return type;
	}

	var labelIndent = 0;
	function makeLabel(obj) {
		var type = getType(obj);
		var indent = Array(labelIndent+1).join("  ");
		if(obj && obj.length && type !== "string" && type !== "String" && type !== "function" && type !== "Function"){
			labelIndent++;
			obj = Array.prototype.map.call(obj, makeLabel);
			obj = ["["].concat(obj, indent + "]").join("\n");
			labelIndent--;
		}else if(type === "Object"){
			var props = [];
			var i = 0;
			var origLabelIndent = labelIndent;
			labelIndent = 0;
			for(var prop in obj){
				if (i > 25) {
					props[i++] = indent + "  \u2026";
					break;
				}
				props[i++] = indent + "  " + prop + ": " + makeLabel(obj[prop]);
			}
			obj = ["{"].concat(props, indent + "}").join("\n");
			labelIndent = origLabelIndent;
		}

		return indent + "(" + type + ") " + obj;
	}

var infoHTML = "<dl>" +
	infoItems.map(function(item){
		var obj = getObj(item);
		return '<dt>' + e(item) + '</dt>' +
				'<dd><pre>' + e(makeLabel(obj)) + '</pre></dd>';
	}).join("") +
	"</dl>";


	dohx.add({
		name: "Widget Information",
		tests: [
			{
				id: 1,
				instructions: infoHTML,
				name: "Widget Information",
				test: function(){
					//console.log(arguments)
				}
			}
		]
	});

}());
