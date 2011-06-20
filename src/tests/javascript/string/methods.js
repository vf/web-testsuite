(function(){
	
	dohx.add({name:"string methods",
		mqcExecutionOrderBaseOffset:820000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			
			//
			// charAt
			//
			javascriptUtil.getExistsTest({id:100, object:"", property:"charAt", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:101, object:"", property:"charAt", expectedType:"function", dependsOn:[100], specs:[]}),
			
			//
			// charCodeAt
			//
			javascriptUtil.getExistsTest({id:200, object:"", property:"charCodeAt", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:210, object:"", property:"charCodeAt", expectedType:"function", dependsOn:[200], specs:[]}),
			
			//
			// concat
			//
			javascriptUtil.getExistsTest({id:300, object:"", property:"concat", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:310, object:"", property:"concat", expectedType:"function", dependsOn:[300], specs:[]}),
			
			//
			// indexOf
			// (there used to be a time when indexOf() didnt work in IE, so this might be irrelevant on most modern platforms)
			//
			javascriptUtil.getExistsTest({id:400, object:"", property:"indexOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:410, object:"", property:"indexOf", expectedType:"function", dependsOn:[400], specs:[]}),
			{
				id:420,
				name:"Does indexOf() return -1 on non-matches?",
				dependsOn: [410],
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "".indexOf("1");
					t.assertEqual(-1, actual);
					return actual;
				}
			},
			{
				id:430,
				name:"Does indexOf() return 0 for a match at start?",
				dependsOn: [410],
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "abcdefgh".indexOf("abc");
					t.assertEqual(0, actual);
					return actual;
				}
			},
			{
				id:440,
				name:"Does indexOf() return correct position for multi character string?",
				dependsOn: [410],
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "abcdefgh".indexOf("def");
					t.assertEqual(3, actual);
					return actual;
				}
			},
			{
				id:450,
				name:"Does indexOf() return correct position for a one character string?",
				dependsOn: [410],
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "abcdefgh".indexOf("e");
					t.assertEqual(4, actual);
					return actual;
				}
			},
			
			//
			// lastIndexOf
			//
			javascriptUtil.getExistsTest({id:500, object:"", property:"lastIndexOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:510, object:"", property:"lastIndexOf", expectedType:"function", dependsOn:[500], specs:[]}),
			
			//
			// localeCompare
			//
			javascriptUtil.getExistsTest({id:600, object:"", property:"localeCompare", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:610, object:"", property:"localeCompare", expectedType:"function", dependsOn:[600], specs:[]}),
			
			//
			// match
			//
			javascriptUtil.getExistsTest({id:700, object:"", property:"match", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:710, object:"", property:"match", expectedType:"function", dependsOn:[700], specs:[]}),
			
			//
			// quote
			//
			javascriptUtil.getExistsTest({id:800, object:"", property:"quote", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:810, object:"", property:"quote", expectedType:"function", dependsOn:[800], specs:[]}),
			
			//
			// replace
			//
			javascriptUtil.getExistsTest({id:900, object:"", property:"replace", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:910, object:"", property:"replace", expectedType:"function", dependsOn:[900], specs:[]}),
			{
				id:920,
				name:"Does replace() return a string?",
				dependsOn: [910],
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = typeof "".replace();
					t.assertEqual("string", actual);
					return actual;
				}
			},
			
			//
			// search
			//
			javascriptUtil.getExistsTest({id:1000, object:"", property:"search", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1010, object:"", property:"search", expectedType:"function", dependsOn:[1000], specs:[]}),
			
			//
			// slice
			//
			javascriptUtil.getExistsTest({id:1100, object:"", property:"slice", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1110, object:"", property:"slice", expectedType:"function", dependsOn:[1100], specs:[]}),
			
			//
			// split
			//
			javascriptUtil.getExistsTest({id:1200, object:"", property:"split", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1210, object:"", property:"split", expectedType:"function", dependsOn:[1200], specs:[]}),
			
			//
			// substr
			//
			javascriptUtil.getExistsTest({id:1300, object:"", property:"substr", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1310, object:"", property:"substr", expectedType:"function", dependsOn:[1300], specs:[]}),
			
			//
			// substring
			//
			javascriptUtil.getExistsTest({id:1400, object:"", property:"substring", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1410, object:"", property:"substring", expectedType:"function", dependsOn:[1400], specs:[]}),
			
			//
			// toLocaleLowerCase
			//
			javascriptUtil.getExistsTest({id:1500, object:"", property:"toLocaleLowerCase", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1510, object:"", property:"toLocaleLowerCase", expectedType:"function", dependsOn:[1500], specs:[]}),
			
			//
			// toLocaleUpperCase
			//
			javascriptUtil.getExistsTest({id:1600, object:"", property:"toLocaleUpperCase", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1610, object:"", property:"toLocaleUpperCase", expectedType:"function", dependsOn:[1600], specs:[]}),
			
			//
			// toLowerCase
			//
			javascriptUtil.getExistsTest({id:1700, object:"", property:"toLowerCase", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1710, object:"", property:"toLowerCase", expectedType:"function", dependsOn:[1700], specs:[]}),
			
			//
			// toSource
			//
			javascriptUtil.getExistsTest({id:1800, object:"", property:"toSource", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1810, object:"", property:"toSource", expectedType:"function", dependsOn:[1800], specs:[]}),
			
			//
			// toString
			//
			javascriptUtil.getExistsTest({id:1900, object:"", property:"toString", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1910, object:"", property:"toString", expectedType:"function", dependsOn:[1900], specs:[]}),
			
			//
			// toUpperCase
			//
			javascriptUtil.getExistsTest({id:2000, object:"", property:"toUpperCase", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2100, object:"", property:"toUpperCase", expectedType:"function", dependsOn:[2000], specs:[]}),
			
			//
			// trim
			//
			javascriptUtil.getExistsTest({id:2100, object:"", property:"trim", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2110, object:"", property:"trim", expectedType:"function", dependsOn:[2100], specs:[]}),
			
			//
			// trimLeft
			//
			javascriptUtil.getExistsTest({id:2200, object:"", property:"trimLeft", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2210, object:"", property:"trimLeft", expectedType:"function", dependsOn:[2200], specs:[]}),
			
			//
			// trimRight
			//
			javascriptUtil.getExistsTest({id:2300, object:"", property:"trimRight", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2310, object:"", property:"trimRight", expectedType:"function", dependsOn:[2300], specs:[]}),
			
			//
			// valueOf
			//
			javascriptUtil.getExistsTest({id:2400, object:"", property:"valueOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2410, object:"", property:"valueOf", expectedType:"function", dependsOn:[2400], specs:[]})
//*/
		]
	});
})();
