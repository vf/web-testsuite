(function(){
	
	dohx.add({name:"array methods",
		mqcExecutionOrderBaseOffset:840000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			
			//
			// concat
			//
			javascriptUtil.getExistsTest({id:100, object:[], property:"concat", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:101, object:[], property:"concat", expectedType:"function", dependsOn:[100], specs:[]}),
			
			//
			// every
			//
			javascriptUtil.getExistsTest({id:200, object:[], property:"every", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:210, object:[], property:"every", expectedType:"function", dependsOn:[200], specs:[]}),
			
			//
			// filter
			//
			javascriptUtil.getExistsTest({id:300, object:[], property:"filter", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:310, object:[], property:"filter", expectedType:"function", dependsOn:[300], specs:[]}),
			
			//
			// forEach
			//
			javascriptUtil.getExistsTest({id:400, object:[], property:"forEach", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:410, object:[], property:"forEach", expectedType:"function", dependsOn:[400], specs:[]}),
			
			//
			// indexOf
			//
			javascriptUtil.getExistsTest({id:500, object:[], property:"indexOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:510, object:[], property:"indexOf", expectedType:"function", dependsOn:[500], specs:[]}),
			
			//
			// join
			//
			javascriptUtil.getExistsTest({id:600, object:[], property:"join", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:610, object:[], property:"join", expectedType:"function", dependsOn:[600], specs:[]}),
			
			//
			// lastIndexOf
			//
			javascriptUtil.getExistsTest({id:700, object:[], property:"lastIndexOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:710, object:[], property:"lastIndexOf", expectedType:"function", dependsOn:[700], specs:[]}),
			
			//
			// map
			//
			javascriptUtil.getExistsTest({id:800, object:[], property:"map", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:810, object:[], property:"map", expectedType:"function", dependsOn:[800], specs:[]}),
			
			//
			// pop
			//
			javascriptUtil.getExistsTest({id:900, object:[], property:"pop", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:910, object:[], property:"pop", expectedType:"function", dependsOn:[900], specs:[]}),
			
			//
			// push
			//
			javascriptUtil.getExistsTest({id:1000, object:[], property:"push", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1010, object:[], property:"push", expectedType:"function", dependsOn:[1000], specs:[]}),
			
			//
			// reduce
			//
			javascriptUtil.getExistsTest({id:1100, object:[], property:"reduce", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1110, object:[], property:"reduce", expectedType:"function", dependsOn:[1100], specs:[]}),
			
			//
			// reduceRight
			//
			javascriptUtil.getExistsTest({id:1200, object:[], property:"reduceRight", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1210, object:[], property:"reduceRight", expectedType:"function", dependsOn:[1200], specs:[]}),
			
			//
			// reverse
			//
			javascriptUtil.getExistsTest({id:1300, object:[], property:"reverse", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1310, object:[], property:"reverse", expectedType:"function", dependsOn:[1300], specs:[]}),
			
			//
			// slice
			//
			javascriptUtil.getExistsTest({id:1400, object:[], property:"slice", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1410, object:[], property:"slice", expectedType:"function", dependsOn:[1400], specs:[]}),
			
			//
			// shift
			//
			javascriptUtil.getExistsTest({id:1500, object:[], property:"shift", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1510, object:[], property:"shift", expectedType:"function", dependsOn:[1500], specs:[]}),
			
			//
			// some
			//
			javascriptUtil.getExistsTest({id:1600, object:[], property:"some", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1610, object:[], property:"some", expectedType:"function", dependsOn:[1600], specs:[]}),
			
			//
			// sort
			//
			javascriptUtil.getExistsTest({id:1700, object:[], property:"sort", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1710, object:[], property:"sort", expectedType:"function", dependsOn:[1700], specs:[]}),
			
			//
			// splice
			//
			javascriptUtil.getExistsTest({id:1800, object:[], property:"splice", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1810, object:[], property:"splice", expectedType:"function", dependsOn:[1800], specs:[]}),
			
			//
			// toSource
			//
			javascriptUtil.getExistsTest({id:1900, object:[], property:"toSource", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1910, object:[], property:"toSource", expectedType:"function", dependsOn:[1900], specs:[]}),
			
			//
			// toString
			//
			javascriptUtil.getExistsTest({id:2000, object:[], property:"toString", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2100, object:[], property:"toString", expectedType:"function", dependsOn:[2000], specs:[]}),
			
			//
			// unshift
			//
			javascriptUtil.getExistsTest({id:2100, object:[], property:"unshift", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2110, object:[], property:"unshift", expectedType:"function", dependsOn:[2100], specs:[]})
//*/
		]
	});
})();
