(function(){
	
	var wdd = util.isObject("Widget.Device.DataNetworkInfo") ? Widget.Device.DataNetworkInfo : {};
	
	dohx.add({
		mqcExecutionOrderBaseOffset:150000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		name:"DataNetworkInfo",
		requiredObjects:["Widget.Device.DataNetworkInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"isDataNetworkConnected - Does it return a boolean value?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},{
				id:200,
				name:"isDataNetworkConnected - Verify that 'false' is returned properly?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				instructions:[
					"Disconnect the phone from the network!",
					"Press 'GO'."
				],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertFalse(val);
					return val;
				}
			},{
				id:300,
				name:"isDataNetworkConnected - Verify that 'true' is returned properly?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				instructions:[
					"Connect the phone to the network.",
					"Press 'GO'."
				],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertTrue(val);
					return val;
				}
			},{
				id:400,
				name:"networkConnectionType - Verify it returns an array.",
				requiredObjects:["Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					var val = wdd.networkConnectionType;
					t.assertTrue(util.isArray(val), "Should be an array.");
					return val;
				}
			},
			//
			//	Methods
			//
			{
				id:500,
				name:"getNetworkConnectionName - Verify it is not '' (empty string).",
				requiredObjects:["Widget.Device.DataNetworkInfo.getNetworkConnectionName", "Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					var types = wdd.networkConnectionType;
					if (!util.isArray(types) || types.length==0){
						throw new Error("Property 'networkConnectionType' returned no valid data, can't execute test.");
					}
					var val = wdd.getNetworkConnectionName(types[0]);
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},{
				id:600,
				name:"onNetworkConnectionChanged - Verify that the callback fires.",
				instructions:[
					"Click 'GO'!",
					"Connect to a different data network, e.g. from 3G to Wifi (within 30 seconds)."
				],
				timeout:30 * 1000,
				test:function(t){
					wdd.onNetworkConnectionChanges = function(con){
						t.success(con);
					}
				},
				tearDown:function(){
					delete wdd.onNetworkConnectionChanges;
				}
			}
		]
	});
})();