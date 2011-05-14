var eventUtil;

;(function(){
	
	//
	// Helper function(s)
	//
	function _getRef(obj, propertyString){
		// summary: Resolve propertyString and "apply" it to obj.
		// 		For example: _getRef(window, "navigator.userAgent") will return:
		// 			{object: window.navigator, propertyName: "userAgent"}
		var parts = propertyString.split(".");
		var ret = obj;
		for (var i=0, l=parts.length, p; i < l-1; i++){
			ret = ret[parts[i]];
		}
		return {"object":ret, propertyName: parts[parts.length-1]};
	}
	
	eventUtil = {
		// Util functions for testing events.
		
		EVENT_TYPE: "",
		
		// Store the event listener function in here
		_func: null,
		
		addEventListener: function(func){
			this._func = func;
			window.addEventListener(this.EVENT_TYPE, func, true);
		},
		
		removeEventListener: function(){
			window.removeEventListener(this.EVENT_TYPE, this._func, true);
		},
		
		getPropertyExistTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: "Does attribute '" + obj.name + "' exist?",
				timeout: 100,
				definedInSpecs: obj.specs,
				test:function(t){
					eventUtil.addEventListener(function(e){
						eventUtil.removeEventListener(); // Remove the event listener right away, so this callback is not called a second time before the tearDown
						var ref = _getRef(e, obj.name); // Resolve deeper object structures.
						t.assertTrue(ref.object.hasOwnProperty(ref.propertyName));
						t.result = "" + ref.object[ref.propertyName]; // Show the value to the user too. (It's always nice to see details :).)
					});
				},
				tearDown: embed.hitch(eventUtil, "removeEventListener")
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		},
		
		getPropertyTypeTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This functons is for convinience to make writing property-type checks tests less verbose.
			var ret = {
				id: obj.id,
				name: "Is attribute '" + obj.name + "' of type '" + obj.expectedType + "'?",
				timeout: 100,
				definedInSpecs: obj.specs,
				test:function(t){
					eventUtil.addEventListener(function(e){
						eventUtil.removeEventListener(); // Remove the event listener right away, so this callback is not called a second time before the tearDown
						var ref = _getRef(e, obj.name); // Resolve deeper object structures.
						var v = ref.object[ref.propertyName]; // Show the value to the user too. (It's always nice to see details :).)
						// If the value is null its ok too, this is allowed by spec.
						if (v === null){
							t.success("Value is 'null', which is valid too.");
							return;
						}
						t.assertEqual(obj.expectedType, typeof v);
						t.result = typeof v;
					});
				},
				tearDown: embed.hitch(eventUtil, "removeEventListener")
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		},
		
		getRangeTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: "Is '" + obj.name + "' in the range of " + obj.range[0] + ".." + obj.range[1] + "?",
				timeout: 100,
				definedInSpecs: obj.specs,
				test:function(t){
					eventUtil.addEventListener(function(e){
						eventUtil.removeEventListener(); // Remove the event listener right away, so this callback is not called a second time before the tearDown
	// use multiAssert() but didnt figure out how it works ...
						t.assertTrue(e[obj.name] >= obj.range[0] && e[obj.name] <= obj.range[1]);
						t.result = "" + e[obj.name]; // Show the value to the user too. (It's always nice to see details :).)
					});
				},
				tearDown: embed.hitch(eventUtil, "removeEventListener")
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		}
	};
})();
