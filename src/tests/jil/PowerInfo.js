(function(){
	var wd = util.isObject("Widget.Device") ? Widget.Device : {},
		wdp = util.isObject("PowerInfo", wd) ? wd.PowerInfo : {};
	
	dohx.add({name:"PowerInfo",
		mqcExecutionOrderBaseOffset:220000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.PowerInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"isCharging - Verify reported state.",
				requiredObjects:["Widget.Device.PowerInfo.isCharging"],
				instructions:[
					'Unplug the charger!',
					'Then press "GO".'],
				test:function(t){
					var val = wdp.isCharging;
					t.assertFalse(val);
					return val;
				}
			},{
				id:200,
				name:"isCharging - Verify reported state.",
				requiredObjects:["Widget.Device.PowerInfo.isCharging"],
				instructions:[
					'Make sure the battery is NOT FULLY charged!',
					'Plug in the charger!',
					'Then press "GO".'],
				test:function(t){
					var val = wdp.isCharging;
					t.assertTrue(val);
					return val;
				}
			},{
				id:300,
				name:"percentRemaining - Verify value.",
				requiredObjects:["Widget.Device.PowerInfo.percentRemaining"],
				instructions:[
					'Look up the current battery capacity.',
					'Then press "GO".'],
				expectedResult:"Is the battery level value correct?",
				test:function(){
					dohx.showInfo("API reports battery level is: ", wdp.percentRemaining+"%.");
				}
			},{
				id:400,
				name:"percentRemaining - Verify changed value.",
				requiredObjects:["Widget.Device.PowerInfo.percentRemaining"],
				instructions:[
					'Wait a bit until you are sure the battery capacity has changed (maybe unplug the charger).',
					'Look up the current battery capacity.',
					'Then press "GO".'],
				expectedResult:"Is the battery level value correct?",
				test:function(){
					dohx.showInfo("API reports battery level is: ", wdp.percentRemaining+"%.");
				}
			},
			//
			//	Methods
			//
			{
				id:500,
				name:"onChargeLevelChange - Verify that callback fires.",
				instructions:[
					'Make sure the phone is NOT FULLY charged.',
					'Plug in the charger.',
					'Then press "GO" and wait.'
				],
				timeout:30 * 60 * 1000,
				test:function(t){
					_interval = setInterval(function(){
						dohx.showInfo("Current battery level: "+wdp.percentRemaining+"%.");
					}, 5000);
					var oldCapacity = wdp.percentRemaining;
					wdp.onChargeLevelChange = function(newCapacity){
						t.success("Callback was fired (oldCapacity="+oldCapacity+", newCapacity="+newCapacity+"%).");
					};
				},
				tearDown:function(){
					clearInterval(_interval);
					delete wdp.onChargeLevelChange;
				}
			},{
				id:600,
				name:"onChargeLevelChange - Verify changing value.",
				instructions:[
					'Make sure the phone is NOT FULLY charged.',
					'Plug in the charger.',
					'Then press "GO" and wait.'
				],
				timeout:30 * 60 * 1000,
				test:function(t){
					var oldCapacity = wdp.percentRemaining;
					wdp.onChargeLevelChange = function(newCapacity){
						t.assertNotEqual(oldCapacity, newCapacity);
						t.result = 'oldCapacity='+oldCapacity+', newCapacity='+newCapacity;
					};
					_interval = setInterval(function(){
						dohx.showInfo("Current battery level: "+wdp.percentRemaining+"%.");
					}, 5000);
				},
				tearDown:function(){
					clearInterval(_interval);
					delete wdp.onChargeLevelChange;
				}
			},{
				id:700,
				name:"onChargeStateChange - Verify callback.",
				instructions:[
					"Click 'GO'.",
					"Change the charge stage, either by unplugging or plugging in the charger."
				],
				timeout:60 * 60 * 1000,
				test:function(t){
					wdp.onChargeStateChange = function(stage){
						t.success("Callback fired (stage="+stage+").");
					};
				},
				tearDown:function(){
					delete wdp.onChargeStateChange;
				}
			},{
				id:800,
				name:"onChargeStateChange - Verify change to 'discharging'.",
				instructions:[
					'Plug in the charger.',
					"Press 'GO'.",
					'Unplug the charger.'
				],
				timeout:60 * 60 * 1000,
				test:function(t){
					wdp.onChargeStateChange = function(stage){
						t.assertEqual(stage, "discharging");
						t.result = stage;
					};
				},
				tearDown:function(){
					delete wdp.onChargeStateChange;
				}
			},{
				id:900,
				name:"onChargeStateChange - Verify change to 'charging'.",
				instructions:[
					'Unplug the charger.',
					"Press 'GO'.",
					'Plug in the charger.'],
				timeout:60 * 60 * 1000,
				test:function(t){
					wdp.onChargeStateChange = function(stage){
						t.assertEqual(stage, "charging");
						t.result = stage;
					};
				},
				tearDown:function(){
					delete wdp.onChargeStateChange;
				}
			},{
				id:1000,
				name:"onChargeStateChange - Verify change to 'full'.",
				instructions:[
					'Plug in charger.',
					"Press 'GO'.",
					'Wait until fully charged (test waits max. 2h).'],
				timeout:2 * 60 * 60 * 1000,
				test:function(t){
					wdp.onChargeStateChange = function(stage){
						t.assertEqual(stage, "full");
						t.result = stage;
					};
				},
				tearDown:function(){
					delete wdp.onChargeStateChange;
				}
//			},{
//				id:1100,
//				name:"onLowBattery",
//				test:function(t){
//// TODO
//				}
			}
		]
	});
})();
