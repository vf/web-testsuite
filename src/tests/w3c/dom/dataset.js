(function(){
	
	var _el = document.body || {};
	var _specs = {
	};
	
	dohx.add({name:"dataset",
		mqcExecutionOrderBaseOffset:890000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tags: ["CSS", "data-", "dataset", "DOM", "API"],
		tests:[
			
			//
			// Does it exist?
			//
			_domUtil.getExistsTest({id:100, object:_el, property:"dataset", specs:[]}),
			_domUtil.getTypeCheckTest({id:200, object:_el, property:"dataset", expectedType:"object", dependsOn:[100], specs:[]}),
			_domUtil.getInstanceOfCheckTest({id:300, object:_el, property:"dataset", expectedInstance:"DOMStringMap", dependsOn:[100], specs:[]}),
			
			{
				id: 500,
				name: "Are all data-* attributes available?",
				dependsOn: [200],
				definedInSpecs: [],
				test: function(t){
					var el = document.getElementById("test500");
					var actual = el.dataset.x && el.dataset.y && el.dataset.camelCased;
					t.assertTrue(!!actual);
				}
			},
			
			
			
//*/
		]
	});
})();
