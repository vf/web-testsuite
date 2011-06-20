(function(){
	
	dohx.add({name:"array properties",
		mqcExecutionOrderBaseOffset:850000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// length
			// (there used to be a time when length didn't work in IE, so this might be irrelevant on most modern platforms)
			//
			javascriptUtil.getExistsTest({id:100, object:[], property:"length", expectedType:"", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:200, object:[], property:"length", expectedType:"number", dependsOn:[100], specs:[]}),
			{
				id:300,
				name:"Is length 0 for an empty array?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = [].length;
					t.assertEqual(0, actual);
					return actual;
				}
			},
			{
				id:400,
				name:"Is length correct for a simple array?",
				definedInSpecs:["??????????"],
				test:function(t){
					var actual = [1,2,3,4].length;
					t.assertEqual(4, actual);
					return actual;
				}
			}
//*/
		]
	});
})();
