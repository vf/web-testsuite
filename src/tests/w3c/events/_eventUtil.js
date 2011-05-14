var eventUtil = {
	
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
			definedInSpecs: obj.specs,
			test:function(t){
				eventUtil.addEventListener(function(e){
					t.assertTrue(e.hasOwnProperty(obj.name));
					t.result = "" + e[obj.name]; // Show the value to the user too. (It's always nice to see details :).)
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
			definedInSpecs: obj.specs,
			test:function(t){
				eventUtil.addEventListener(function(e){
					// If the value is null its ok too, this is allowed by spec.
					if (e[obj.name] === null){
						t.success("Value is 'null', which is valid too.");
						return;
					}
					t.assertEqual(obj.expectedType, typeof e[obj.name]);
					t.result = typeof e[obj.name];
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
			definedInSpecs: obj.specs,
			test:function(t){
				eventUtil.addEventListener(function(e){
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
