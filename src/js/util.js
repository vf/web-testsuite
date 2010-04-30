var util = new (doh.util.extend(function(){},{
	
	checkProperties:function(obj, expected){
		// summary: This method checks if all the expected properties are given.
		var props = [], missing = [];
		for (var i=0, prop, l=expected.length; i<l; i++){
			prop = expected[i];
			if (typeof obj[prop]=="undefined"){
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
		var group = g.replace(/^\s*/, "").replace(/\s*$/, "")
					.replace(/[^0-9a-zA-Z]/g, "_");
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
			dohx.add({name:"Preconditions",
				tests:[
					{
						name:"config values",
						test:function(t){
							throw new Error("Missing configs: "+ missingConfigs.join(","));
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
	
	toJson:function(inp){
		function _toJson(val){
			if (util.isArray(val)){
				return _array(val);
			} else if (typeof val=="object"){
				var ret = _object(val);
				return ret=="{}" ? ""+val : ret;
			} else if (typeof val=="string"){
				return '"' + val + '"';
			}
			return ""+val;
		}
		function _array(val){
			var ret = [];
			for (var i=0, l=val.length; i<l; i++){
				ret.push(_toJson(val[i]));
			}
			return "[" + ret.join(", ") + "]";
		}
		function _object(val){
			var ret = [];
			for (var i in val){
				if (typeof val[i]=="function"){
					continue;
				}
				ret.push('"' + i + '": ' + _toJson(val[i]));
			}
			return "{" + ret.join(", ") + "}";
		}
		
		return _toJson(inp);
	}
}));
