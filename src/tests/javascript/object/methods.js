(function(){
	
	dohx.add({name:"object methods",
		mqcExecutionOrderBaseOffset:860000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			
			//
			// create
			//
			javascriptUtil.getExistsTest({id:100, object:Object, property:"create", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:101, object:Object, property:"create", expectedType:"function", dependsOn:[100], specs:[]}),
			
			//
			// defineProperty
			//
			javascriptUtil.getExistsTest({id:200, object:Object, property:"defineProperty", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:210, object:Object, property:"defineProperty", expectedType:"function", dependsOn:[200], specs:[]}),
			
			//
			// defineProperties
			//
			javascriptUtil.getExistsTest({id:300, object:Object, property:"defineProperties", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:310, object:Object, property:"defineProperties", expectedType:"function", dependsOn:[300], specs:[]}),
			
			//
			// eval
			//
// irrelevant ... or can it be changed somehow to make sense?
			//javascriptUtil.getExistsTest({id:400, object:Object, property:"eval", specs:[]}),
			//javascriptUtil.getTypeCheckTest({id:410, object:Object, property:"eval", expectedType:"function", dependsOn:[400], specs:[]}),
			
			//
			// getOwnPropertyDescriptor
			//
			javascriptUtil.getExistsTest({id:500, object:Object, property:"getOwnPropertyDescriptor", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:510, object:Object, property:"getOwnPropertyDescriptor", expectedType:"function", dependsOn:[500], specs:[]}),
			
			//
			// hasOwnProperty
			//
			javascriptUtil.getExistsTest({id:600, object:Object, property:"hasOwnProperty", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:610, object:Object, property:"hasOwnProperty", expectedType:"function", dependsOn:[600], specs:[]}),
			
			//
			// isFrozen
			//
			javascriptUtil.getExistsTest({id:700, object:Object, property:"isFrozen", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:710, object:Object, property:"isFrozen", expectedType:"function", dependsOn:[700], specs:[]}),
			
			//
			// isPrototypeOf
			//
			javascriptUtil.getExistsTest({id:800, object:Object, property:"isPrototypeOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:810, object:Object, property:"isPrototypeOf", expectedType:"function", dependsOn:[800], specs:[]}),
			
			//
			// isSealed
			//
			javascriptUtil.getExistsTest({id:900, object:Object, property:"isSealed", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:910, object:Object, property:"isSealed", expectedType:"function", dependsOn:[900], specs:[]}),
			
			//
			// keys
			//
			javascriptUtil.getExistsTest({id:1000, object:Object, property:"keys", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1010, object:Object, property:"keys", expectedType:"function", dependsOn:[1000], specs:[]}),
			
			//
			// getOwnPropertyNames
			//
			javascriptUtil.getExistsTest({id:1100, object:Object, property:"getOwnPropertyNames", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1110, object:Object, property:"getOwnPropertyNames", expectedType:"function", dependsOn:[1100], specs:[]}),
			
			//
			// getPrototypeOf
			//
			javascriptUtil.getExistsTest({id:1200, object:Object, property:"getPrototypeOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1210, object:Object, property:"getPrototypeOf", expectedType:"function", dependsOn:[1200], specs:[]}),
			
			//
			// preventExtensions
			//
			javascriptUtil.getExistsTest({id:1300, object:Object, property:"preventExtensions", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1310, object:Object, property:"preventExtensions", expectedType:"function", dependsOn:[1300], specs:[]}),
			
			//
			// propertyIsEnumerable
			//
			javascriptUtil.getExistsTest({id:1400, object:Object, property:"propertyIsEnumerable", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1410, object:Object, property:"propertyIsEnumerable", expectedType:"function", dependsOn:[1400], specs:[]}),
			
			//
			// isExtensible
			//
			javascriptUtil.getExistsTest({id:1500, object:Object, property:"isExtensible", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1510, object:Object, property:"isExtensible", expectedType:"function", dependsOn:[1500], specs:[]}),
			
			//
			// seal
			//
			javascriptUtil.getExistsTest({id:1600, object:Object, property:"seal", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1610, object:Object, property:"seal", expectedType:"function", dependsOn:[1600], specs:[]}),
			
			//
			// toSource
			//
			javascriptUtil.getExistsTest({id:1700, object:Object, property:"toSource", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1710, object:Object, property:"toSource", expectedType:"function", dependsOn:[1700], specs:[]}),
			
			//
			// toLocaleString
			//
			javascriptUtil.getExistsTest({id:1800, object:Object, property:"toLocaleString", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1810, object:Object, property:"toLocaleString", expectedType:"function", dependsOn:[1800], specs:[]}),
			
			//
			// toString
			//
			javascriptUtil.getExistsTest({id:1900, object:Object, property:"toString", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:1910, object:Object, property:"toString", expectedType:"function", dependsOn:[1900], specs:[]}),
			
			//
			// unwatch
			//
			javascriptUtil.getExistsTest({id:2000, object:Object, property:"unwatch", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2010, object:Object, property:"unwatch", expectedType:"function", dependsOn:[2000], specs:[]}),
			
			//
			// valueOf
			//
			javascriptUtil.getExistsTest({id:2100, object:Object, property:"valueOf", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2110, object:Object, property:"valueOf", expectedType:"function", dependsOn:[2100], specs:[]}),
			
			//
			// watch
			//
			javascriptUtil.getExistsTest({id:2200, object:Object, property:"watch", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2210, object:Object, property:"watch", expectedType:"function", dependsOn:[2200], specs:[]}),
			
			//
			// __lookupGetter__
			//
			javascriptUtil.getExistsTest({id:2300, object:Object, property:"__lookupGetter__", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2310, object:Object, property:"__lookupGetter__", expectedType:"function", dependsOn:[2300], specs:[]}),
			
			//
			// __lookupSetter__
			//
			javascriptUtil.getExistsTest({id:2400, object:Object, property:"__lookupSetter__", specs:[]}),
			javascriptUtil.getTypeCheckTest({id:2410, object:Object, property:"__lookupSetter__", expectedType:"function", dependsOn:[2400], specs:[]}),
			
			//
			// __noSuchMethod__
			//
			{
				id:2500,
				name:"Does __noSuchMethod__ fire?",
				dependsOn: [100],
				definedInSpecs:["??????????"],
				test:function(t){
					var o = Object.create({});
					o.__noSuchMethod__ = function(){
						t.success("__noSuchMethod__ fired");
					}
					o.wtf();
				}
			}

//*/
		]
	});
})();
