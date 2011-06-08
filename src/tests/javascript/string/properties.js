(function(){
	
	dohx.add({name:"string properties",
		mqcExecutionOrderBaseOffset:830000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// length
			// (there used to be a time when length didn't work in IE, so this might be irrelevant on most modern platforms)
			//
			javascriptUtil.getExistsTest({id:100, object:"", property:"length", expectedType:"", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:200, object:"", property:"length", expectedType:"number", dependsOn:[100], specs:[]}),
			{
				id:300,
				name:"Is length 0 for an empty string?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "".length;
					t.assertEqual(0, actual);
					return actual;
				}
			},
			{
				id:400,
				name:"Is length correct for a simple string?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "1234567890".length;
					t.assertEqual(10, actual);
					return actual;
				}
			},
			{
				id:500,
				name:"Is length correct for a unicode character?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "\u0000".length;
					t.assertEqual(1, actual);
					return actual;
				}
			},
			{
				id:600,
				name:"Is length correct for two unicode chars?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = "\u0000\u00FE".length;
					t.assertEqual(2, actual);
					return actual;
				}
			}
//*/
		]
	});
})();
