(function(){
	
	dohx.add({name:"object properties",
		mqcExecutionOrderBaseOffset:870000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// prototype
			//
			javascriptUtil.getExistsTest({id:100, object:Object, property:"prototype", expectedType:"", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:200, object:Object, property:"prototype", expectedType:"object", dependsOn:[100], specs:[]}),
//*/
		]
	});
})();
