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
var util = new (doh.util.extend(function(){},{
	
	checkProperties:function(obj, expected){
		// summary: This method checks if all the expected properties are given.
		if (!obj || typeof obj!="object"){
			throw new Error("Expected object, got: '" + obj + "' (type: " + (typeof obj) +")");
		}
		var props = [], missing = [];
		for (var i=0, prop, l=expected.length; i<l; i++){
			prop = expected[i];
			if (!obj.hasOwnProperty(prop)){
				missing.push(prop);
			} else {
				props.push(prop + ": " + obj[prop]);
			}
		}
		return {missing:missing, asString:props};
	},
	
	isObject:function(objString, scope){
		// summary: Check if the given string represents an object reference.
		// examples:
		// 		>>> util.isObject("window.document"); // Verify that window.document is an object.
		// 		true
		// 		>>> util.isObject("window.util.isObject"); // Verify that util.isObject exists.
		// 		true
		// 		>>> util.isObject("util.isNotAFunction"); // Check the negative case.
		// 		false
		return this.getObject(objString, scope)!=null;
	},
	
	getObject:function(objString, scope){
		var parts = objString.split("."),
			obj = (scope || window);
		for (var i=0; p=parts[i]; i++){
			try{ // Sometimes an error is thrown when accessing an object, esp. on some "special" device.
				if (typeof obj[p]!="undefined"){
					obj = obj[p];
				} else {
					return null;
				}
			}catch(e){
				return null;
			}
		}
		return obj;
	},
	
	getTestId:function(test, groupName){
		// summary:
		// 		This method is placed here to be available at a global place.
		// description:
		//		It is used in the ui class and in the csv export.
		var g = this.getObject("group.name", test) || groupName;
		// Trim and replace all special chars, to have a proper test ID.
		var group = embed.trim(g).replace(/[^0-9a-zA-Z]/g, "_");
		var ret = ("ID_" + group).replace(/_+/g, "_") // Replace multiple underscores with just one.;
					.replace(/[_]+$/, "");
		// CTC software has a limit of max. 40 chars for the ID.
		ret = ret.length>34 ? ret.substr(0, 34) : ret;
		return (ret + "_" + test.id)
	},
	
	isArray:function(arr){
		return doh.util.isArray(arr);
	},
	
	isNumber:function(n){
		return n==parseFloat(n);
	},
	
	isConfigured:function(reqConfigs){
	// Verify all the config variables the tests require!
		var missingConfigs = [];
		for (var i=0, l=reqConfigs.length; i<l; i++){
			if (!util.getObject(reqConfigs[i], config)){
				missingConfigs.push(reqConfigs[i]);
			}
		}
		if (missingConfigs.length){
			dohx.add({name:"__preconditions__",
				tests:[
					{
						name:"config values",
						test:function(t){
							throw new Error("Missing configs: "+ missingConfigs.join(",")+". Please edit 'config.js' and add the missing config settings.");
						}
					}
				]
			});
			return false;
		}
		return true;
	},
	
	byId:function(s){
		return document.getElementById(s);
	},
	
	query:function(query, parentNode){
		// summary: Works with ".className", "#id", and ".className .className"
		// Actually we would need querySelectorAll() :-).
		// But we don't have it, so we just kinda fake it.
		var parts = query.split(" ");
		if (parts.length > 1){
			return this.query(parts.slice(1).join(" "), this.query(parts[0], parentNode)[0]);
		}
		var n = parentNode ? parentNode : document;
		if (query.charAt(0)=="."){
			return n.getElementsByClassName(query.substr(1));
		}
		if (query.charAt(0)=="#"){
			return [n.getElementById(query.substr(1))];
		}
		return [];
	},
	
	_connects:[],
	connect:function(node, event, callback){
		// summary: Connect the event on a node to the callback.
// TODO make this loop over multiple nodes if given or if found via util.query() and return an array of handles.
		var n = (typeof node=="string") ? this.query(node)[0] : node,
			e = event.replace(/^on/, "");
		n.addEventListener(e, callback, false);
		this._connects.push([n, e, callback, false]);
		return this._connects.length-1;
	},
	
	connectOnce:function(node, event, callback){
		// summary: Connect the given event and disconnect right after it fired once.
		var n = (typeof node=="string") ? this.query(node)[0] : node;
		var handle = this.connect(n, event, doh.util.hitch(this, function(){
			callback.apply(null, arguments);
			this.disconnect(handle);
		}));
		return handle;
	},
	
	disconnect:function(handle){
		var c = this._connects[handle];
		if (typeof c=="undefined") return; // Had already been disconnected.
		c[0].removeEventListener.apply(c[0], c.slice(1));
		this._connects[handle] = undefined;
	},
	
	findNextPredecessorByClassName:function(node, className){
		var curClassName = (node && node.className) ? node.className : "";
		while(!curClassName.match(className) && node!=null){
			node = node.parentNode;
			curClassName = (node && node.className) ? node.className : "";
		}
		if (node && node.className.match(className)){
			return node;
		}
		return null;
	},
	
	style:function(queryOrNode, props){
		// util.style(".result", {display:"none"});
		var nodes;
		if (typeof queryOrNode=="string"){
			nodes = this.query(queryOrNode);
		} else if(util.isArray(queryOrNode)){
			nodes = queryOrNode;
		} else {
			nodes = [queryOrNode];
		}
		for (var i=0, l=nodes.length, n; i<l; i++){
			for (var key in props){
				nodes[i].style[key] = props[key];
			}
		}
	},
	
	xhrPost:function(data){
		var req = new XMLHttpRequest();
		if (!req) return;
		req.open("POST", data.url, true);
		req.setRequestHeader('User-Agent','XMLHTTP/1.0');
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		req.onreadystatechange = function () {
			if (req.readyState != 4) return;
			//if (req.status != 200 && req.status != 304) {
			//	alert('HTTP error ' + req.status);
			//	return;
			//}
			// Always do callback, also on errors.
			if (data.callback){
				data.callback(req);
			}
		}
		if (req.readyState == 4) return;
		req.send(data.data);
	}
}));
