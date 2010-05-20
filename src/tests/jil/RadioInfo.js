(function(){
	
	var wdr = util.isObject("Widget.Device.RadioInfo") ? Widget.Device.RadioInfo : {};
	var wdrTypes = util.isObject("Widget.Device.RadioInfo.RadioSignalSourceTypes") ? Widget.Device.RadioInfo.RadioSignalSourceTypes : {};
	
	dohx.add({
		mqcExecutionOrderBaseOffset:230000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		name:"RadioInfo",
		requiredObjects:["Widget.Device.RadioInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"isRadioEnabled",
				requiredObjects:["Widget.Device.RadioInfo.isRadioEnabled"],
				test:function(t){
					var val = wdr.isRadioEnabled;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},
			{
				id:110,
				name:"isRadioEnabled - Verify.",
				requiredObjects:["Widget.Device.RadioInfo.isRadioEnabled"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					var val = wdr.isRadioEnabled;
					dohx.showInfo("API reports:", val);
					return val;
				}
			},
			{
				id:200,
				name:"isRoaming",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				test:function(t){
					var val = wdr.isRoaming;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},
			{
				id:210,
				name:"isRoaming - Verify.",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					var val = wdr.isRoaming;
					dohx.showInfo("API reports:", val);
					return val;
				}
			},
			{
				id:300,
				name:"'radioSignalSource' exists at all?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				test:function(t){
					var val = wdr.radioSignalSource;
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},
			{
				id:310,
				name:"'radioSignalSource' - Verify?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					var val = wdr.radioSignalSource;
					dohx.showInfo("API reports:", val);
					return val;
				}
			},
			{
				id:400,
				name:"radioSignalStrengthPercent",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalStrengthPercent"],
				test:function(t){
					var val = wdr.radioSignalStrengthPercent;
					t.assertTrue(util.isNumber(val));
					return val;
				}
			},
			{
				id:410,
				name:"'radioSignalStrengthPercent' - Verify?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalStrengthPercent"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					var val = wdr.radioSignalStrengthPercent;
					dohx.showInfo("API reports:", val);
					return val;
				}
			},
			//
			//	Methods
			//
			{
				id:500,
addIf:false,
// I dont know how to test it :(
				name:"onSignalSourceChange - Turn roaming off.",
				instructions:[
					"Make sure roaming is turned off (usually this simply requires a SIM card from your country).",
					"Click 'GO'."
				],
				test:function(t){
					wdr.onSignalSourceChange = function(src, isRoaming){
						t.assertFalse(isRoaming);
					}
				},
				tearDown:function(){
					delete wdr.onSignalSourceChange;
				}
			},
			{
				id:600,
addIf:false,
// I dont know how to test it :(
				name:"onSignalSourceChange - Turn roaming on.",
				instructions:[
					"Make sure roaming is turned on (mostly requires a foreign SIM card).",
					"Click 'GO'."
				],
				test:function(t){
					wdr.onSignalSourceChange = function(src, isRoaming){
						t.assertTrue(isRoaming);
					}
				},
				tearDown:function(){
					delete wdr.onSignalSourceChange;
				}
			},
			{
				id:700,
				name:"onSignalSourceChange - Turn on 2G.",
				instructions:[
					"Make sure 3G is turned on.",
					"Click 'GO'.",
					"Minimize the widget.",
					"Switch to 2G.",
					"Come back to this widget."
				],
				expectedResult:"Is the shown value correct?",
				test:function(t){
					dohx.showInfo("Waiting...");
					wdr.onSignalSourceChange = function(src, isRoaming){
						dohx.showInfo("API resports signalSource:", src);
					}
				},
				tearDown:function(){
					delete wdr.onSignalSourceChange;
				}
			},
			{
				id:800,
				name:"onSignalSourceChange - Turn on 3G.",
				instructions:[
					"Make sure 2G is turned on.",
					"Click 'GO'.",
					"Minimize the widget.",
					"Switch to 3G.",
					"Come back to this widget."
				],
				expectedResult:"Is the shown value correct?",
				test:function(t){
					dohx.showInfo("Waiting...");
					wdr.onSignalSourceChange = function(src, isRoaming){
						dohx.showInfo("API resports signalSource:", src);
					}
				},
				tearDown:function(){
					delete wdr.onSignalSourceChange;
				}
			}
		]
	});
})();