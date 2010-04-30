(function(){
	var wddc = util.isObject("Widget.Device.DeviceStateInfo.Config") ? Widget.Device.DeviceStateInfo.Config : {};
	
	dohx.add({name:"Widget.Device.DeviceStateInfo.Config",
		mqcExecutionOrderBaseOffset:140000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo.Config"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"vibrationSetting - Is 'ON' or 'OFF'?",
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="ON" || val=="OFF", "Value should be 'ON' or 'OFF'.");
					return val;
				}
			},{
				id:200,
				name:"vibrationSetting - Verify 'ON'?",
				instructions:[
					'Make sure that your phone has turned ON the vibrate mode.',
					"Press 'GO'."
				],
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="ON");
					return val;
				}
			},{
				id:300,
				name:"vibrationSetting - Verify 'OFF'?",
				instructions:[
					'Make sure that your phone has turned OFF the vibrate mode.',
					"Press 'GO'."
				],
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="OFF");
					return val;
				}
			}
		]
	});
})();
