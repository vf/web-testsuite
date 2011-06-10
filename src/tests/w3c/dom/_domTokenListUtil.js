var _domTokenListUtil;

;(function(){
	
	_domTokenListUtil = {
		// Methods to create DOMTokenList tests, e.g. for classList
		
		getParameterIsEmptyStringTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			var ret = {
				//
				// From spec:
				// 	If the token argument is the empty string, then raise a SYNTAX_ERR exception and stop the algorithm.
				//
				id: obj.id,
				name: obj.property + "() - Raise SYNATX_ERR if parameter is an empty string?",
				definedInSpecs: obj.specs,
				dependsOn: obj.dependsOn || [],
				test:function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, obj.property, [""]);
				}
			};
			return ret;
		},
		
		getParameterIsOnlyASpaceTest: function(obj){
			// Returns a test object that can be passed into dohx.add().
			var ret = {
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: obj.id,
				name: obj.property + "() - Raise INVALID_CHARACTER_ERR if parameter is ONLY a space?",
				dependsOn: obj.dependsOn || [],
				definedInSpecs: obj.specs,
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, obj.property, [" "]);
				}
			};
			return ret;
		},
		
		getParameterContainsSpaceTest: function(obj){
			var ret = {
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: obj.id,
				name: obj.property + "() - Raise INVALID_CHARACTER_ERR if parameter CONTAINS a space?",
				dependsOn: obj.dependsOn || [],
				definedInSpecs: obj.specs,
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, obj.property, [" class1"]);
				}
			};
			return ret;
		},
		
		getParameterContainsSpace1Test: function(obj){
			var ret = {
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: obj.id,
				name: obj.property + "() - Raise INVALID_CHARACTER_ERR if parameter CONTAINS a space inbetween two classes?",
				dependsOn: obj.dependsOn || [],
				definedInSpecs: obj.specs,
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, obj.property, ["class1 class2"]);
				}
			};
			return ret;
		}
	};
})();
