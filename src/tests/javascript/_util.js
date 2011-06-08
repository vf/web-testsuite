var javascriptUtil;

;(function(){
	
	javascriptUtil = {
		// Util functions for testing javascript.
		
		getExistsTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			// This funcitons is for convinience to make writing property-exists tests less verbose.
			var ret = {
				id: obj.id,
				name: "Does '" + obj.property + "' exist?",
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
				name: "Is '" + obj.property + "' of type '" + obj.expectedType + "'?",
				definedInSpecs: obj.specs,
				test:function(t){
					var actual = typeof obj.object[obj.property];
					t.assertEqual(obj.expectedType, actual);
					return actual;
				}
			};
			if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
			return ret;
		}
	};
})();
