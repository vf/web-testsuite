(function(){
	
	var _obj = document.body.classList || {};
	var _specs = {
		add: "http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-add",
		contains: "http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-contains",
		remove: "http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-remove",
		toggle: "http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-toggle",
		tostring: "http://www.w3.org/TR/html5/common-dom-interfaces.html#dom-tokenlist-tostring"
	};
	
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
			// Check what does ""+classList return?
			//
			{
				id: 500,
				name: "Does ''+classList return properly?",
				dependsOn: [200],
				definedInSpecs: [_specs.tostring],
				test: function(t){
					var el = document.getElementById("test500");
					var actual = ""+el.classList;
					t.assertEqual("class1 class2 classXYZ", actual);
					return actual;
				}
			},
			
			//
			// add
			//
			_domUtil.getExistsTest({id:1000, object:_obj, property:"add", dependsOn:[200], specs:[_specs.add]}),
			_domUtil.getTypeCheckTest({id:1100, object:_obj, property:"add", expectedType:"function", dependsOn:[1000], specs:[_specs.add]}),
			_domTokenListUtil.getParameterIsEmptyStringTest({id:1200, object:_obj, property:"add", dependsOn:[1100], specs:[_specs.add]}),
			_domTokenListUtil.getParameterIsOnlyASpaceTest({id:1300, object:_obj, property:"add", dependsOn:[1100], specs:[_specs.add]}),
			_domTokenListUtil.getParameterContainsSpaceTest({id:1400, object:_obj, property:"add", dependsOn:[1100], specs:[_specs.add]}),
			_domTokenListUtil.getParameterContainsSpace1Test({id:1500, object:_obj, property:"add", dependsOn:[1100], specs:[_specs.add]}),
			// The real stuff :)
			{
				id: 1600,
				name: "Does adding a class work?",
				dependsOn: [1100, 500],
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
				dependsOn: [1100, 500],
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
				dependsOn: [1100, 500],
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
			_domUtil.getExistsTest({id:2000, object:_obj, property:"contains", dependsOn:[200], specs:[_specs.contains]}),
			_domUtil.getTypeCheckTest({id:2100, object:_obj, property:"contains", expectedType:"function", dependsOn:[2000], specs:[_specs.contains]}),
			_domTokenListUtil.getParameterIsEmptyStringTest({id:2200, object:_obj, property:"contains", dependsOn:[2100], specs:[_specs.contains]}),
			_domTokenListUtil.getParameterIsOnlyASpaceTest({id:2300, object:_obj, property:"contains", dependsOn:[2100], specs:[_specs.contains]}),
			_domTokenListUtil.getParameterContainsSpaceTest({id:2400, object:_obj, property:"contains", dependsOn:[2100], specs:[_specs.contains]}),
			_domTokenListUtil.getParameterContainsSpace1Test({id:2500, object:_obj, property:"contains", dependsOn:[2100], specs:[_specs.contains]}),
			
			
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
			_domTokenListUtil.getParameterIsEmptyStringTest({id:5200, object:_obj, property:"remove", dependsOn:[5100], specs:[_specs.remove]}),
			_domTokenListUtil.getParameterIsOnlyASpaceTest({id:5300, object:_obj, property:"remove", dependsOn:[5100], specs:[_specs.remove]}),
			_domTokenListUtil.getParameterContainsSpaceTest({id:5400, object:_obj, property:"remove", dependsOn:[5100], specs:[_specs.remove]}),
			_domTokenListUtil.getParameterContainsSpace1Test({id:5500, object:_obj, property:"remove", dependsOn:[5100], specs:[_specs.remove]}),
			
			//
			// toggle
			//
			_domUtil.getExistsTest({id:6000, object:_obj, property:"toggle", dependsOn:[200], specs:[]}),
			_domUtil.getTypeCheckTest({id:6100, object:_obj, property:"toggle", expectedType:"function", dependsOn:[6000], specs:[]}),
			_domTokenListUtil.getParameterIsEmptyStringTest({id:6200, object:_obj, property:"toggle", dependsOn:[6100], specs:[_specs.toggle]}),
			_domTokenListUtil.getParameterIsOnlyASpaceTest({id:6300, object:_obj, property:"toggle", dependsOn:[6100], specs:[_specs.toggle]}),
			_domTokenListUtil.getParameterContainsSpaceTest({id:6400, object:_obj, property:"toggle", dependsOn:[6100], specs:[_specs.toggle]}),
			_domTokenListUtil.getParameterContainsSpace1Test({id:6500, object:_obj, property:"toggle", dependsOn:[6100], specs:[_specs.toggle]}),

			//
			// add+contains
			//
			_domTokenListUtil.getAddAndContainsTest({id:7000, name:"Does the add()ed class show up in contains()?",
													addClasses:["abc"], contains:"abc", assert:"assertTrue",
													dependsOn:[1100, 2100], specs:[_specs.add, _specs.contains]}),
			_domTokenListUtil.getAddAndContainsTest({id:7010, name:"Does one of the add()ed classes show up in contains()?",
													addClasses:["abc", "ABC", "xyz"], contains:"xyz", assert:"assertTrue",
													dependsOn:[1100, 2100], specs:[_specs.add, _specs.contains]}),
			_domTokenListUtil.getAddAndContainsTest({id:7020, name:"Does one that was NOT add()ed return false for contains()?",
													addClasses:["abc", "ABC", "xyz"], contains:"Class1", assert:"assertFalse",
													dependsOn:[1100, 2100], specs:[_specs.add, _specs.contains]}),
			_domTokenListUtil.getAddAndContainsTest({id:7030, name:"Case-sensitive, does contains('Abc') fail if class is 'abc'?",
													addClasses:["abc"], contains:"Abc", assert:"assertFalse",
													dependsOn:[1100, 2100], specs:[_specs.add, _specs.contains]}),
			_domTokenListUtil.getAddAndContainsTest({id:7040, name:"Does contains('abc') fail if class is 'abcd'?",
													addClasses:["abcd"], contains:"abc", assert:"assertFalse",
													dependsOn:[1100, 2100], specs:[_specs.add, _specs.contains]}),
//*/
		]
	});
})();
