var _domUtil;

;(function(){
	
// TODO currently its a copy of javascript/_util.js ... abstract it into a global file??? 
	
	_domUtil = {
		// Util functions for testing javascript.
		
		getExistsTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: obj.property + " - Does it exist?",
				definedInSpecs: obj.specs,
				test:function(t){
					var actual = typeof obj.object[obj.property];
					t.assertNotEqual("undefined", actual);
					return actual;
				}
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		},
		
		getTypeCheckTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: obj.property + " - Is it of type '" + obj.expectedType + "'?",
				definedInSpecs: obj.specs,
				test:function(t){
					var actual = typeof obj.object[obj.property];
					t.assertEqual(obj.expectedType, actual);
					return actual;
				}
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		},
		
		getInstanceOfCheckTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: obj.property + " - Is it an insatnce of '" + obj.expectedInstance + "'?",
				definedInSpecs: obj.specs,
				test:function(t){
					var actual = obj.object[obj.property] instanceof window[obj.expectedInstance];
					t.assertTrue(actual);
					return actual;
				}
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		}
	};
})();
