(function(){
	
	var _obj = document.body.classList || {};
	
	dohx.add({name:"classList ",
		mqcExecutionOrderBaseOffset:880000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tags: ["CSS", "class", "DOM", "API"],
		tests:[
			
			//
			// Does it exist?
			//
			_domUtil.getExistsTest({id:100, object:document.body, property:"classList", specs:[]}),
			_domUtil.getTypeCheckTest({id:200, object:document.body, property:"classList", expectedType:"object", dependsOn:[100], specs:[]}),
			
			//
			// add
			//
			_domUtil.getExistsTest({id:1000, object:_obj, property:"add", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:1100, object:_obj, property:"add", expectedType:"function", dependsOn:[1000], specs:[]}),
			{
				//
				// From spec:
				// 	If the token argument is the empty string, then raise a SYNTAX_ERR exception and stop the algorithm.
				//
				id: 1200,
				name: "Raise SYNATX_ERR if parameter is an empty string?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, "add", [""]);
				}
			},
			{
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: 1300,
				name: "Raise INVALID_CHARACTER_ERR if parameter is ONLY a space?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, "add", [" "]);
				}
			},
			{
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: 1300,
				name: "Raise INVALID_CHARACTER_ERR if parameter CONTAINS a space?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, "add", [" class1"]);
				}
			},
			{
				//
				// From spec:
				// 	If the token argument contains any space characters, then raise an INVALID_CHARACTER_ERR exception and stop the algorithm.
				//
				id: 1400,
				name: "Raise INVALID_CHARACTER_ERR if parameter CONTAINS a space inbetween two classes?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					t.assertError(DOMException, el.classList, "add", ["class1 class2"]);
				}
			},
			// The real stuff :)
			{
				id: 1600,
				name: "Does adding a class work?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					el.classList.add("xyz");
					var actual = ""+el.classList;
					t.assertEqual("xyz", actual);
					return actual;
				}
			},
			{
				id: 1610,
				name: "Does adding a second class work?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					el.classList.add("xyz");
					el.classList.add("abc");
					var actual = ""+el.classList;
					// I guess we can not be sure of the order, so split the string and sort the array :).
					// We are NOT using contains() to have no other dependencym though we rely on the proper toString() implementation.
					t.assertEqual(["abc", "xyz"], actual.split(" ").sort());
					return actual;
				}
			},
			{
				id: 1620,
				name: "Does adding an existing class NOT add it multiple times?",
				dependsOn: [1100],
				definedInSpecs: ["http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add"],
				test: function(t){
					var el = document.createElement("span");
					el.classList.add("abc");
					el.classList.add("xyz");
					el.classList.add("abc");
					var actual = ""+el.classList;
					// I guess we can not be sure of the order, so split the string and sort the array :).
					// We are NOT using contains() to have no other dependencym though we rely on the proper toString() implementation.
					t.assertEqual(["abc", "xyz"], actual.split(" ").sort());
					return actual;
				}
			},
			
			
			//
			// contains
			//
			_domUtil.getExistsTest({id:2000, object:_obj, property:"contains", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:2100, object:_obj, property:"contains", expectedType:"function", dependsOn:[2000], specs:[]}),
			
			
			//
			// item
			//
			_domUtil.getExistsTest({id:3000, object:_obj, property:"item", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:3100, object:_obj, property:"item", expectedType:"function", dependsOn:[3000], specs:[]}),
			
			
			//
			// length
			//
			_domUtil.getExistsTest({id:4000, object:_obj, property:"length", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:4100, object:_obj, property:"length", expectedType:"number", dependsOn:[4000], specs:[]}),
			
			//
			// remove
			//
			_domUtil.getExistsTest({id:5000, object:_obj, property:"remove", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:5100, object:_obj, property:"remove", expectedType:"function", dependsOn:[5000], specs:[]}),
			
			//
			// toggle
			//
			_domUtil.getExistsTest({id:6000, object:_obj, property:"toggle", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:6100, object:_obj, property:"toggle", expectedType:"function", dependsOn:[6000], specs:[]}),
			
			//
			// Check what does ""+classList return?
			//
// TODO

//*/
		]
	});
})();
