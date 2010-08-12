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
				name:"isRadioEnabled - is it boolean?",
				requiredObjects:["Widget.Device.RadioInfo.isRadioEnabled"],
				test:function(t){
					var val = wdr.isRadioEnabled;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},
			{
				id:110,
				name:"isRadioEnabled - Verify false.",
				requiredObjects:["Widget.Device.RadioInfo.isRadioEnabled"],
				instructions:"Make sure you have NO phone line coverage (e.g. remove the SIM card).",
				test:function(t){
					var val = wdr.isRadioEnabled;
					t.assertFalse(val);
					return val;
				}
			},
			{
				id:120,
				name:"isRadioEnabled - Verify true.",
				requiredObjects:["Widget.Device.RadioInfo.isRadioEnabled"],
				instructions:"Make sure you have phone line coverage!",
				test:function(t){
					var val = wdr.isRadioEnabled;
					t.assertTrue(val);
					return val;
				}
			},
			{
				id:200,
				name:"isRoaming - returns boolean?",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				test:function(t){
					var val = wdr.isRoaming;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},
			{
				id:210,
				name:"isRoaming - Verify false.",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				instructions:"Make sure your phone does NOT do roaming!",
				test:function(t){
					var val = wdr.isRoaming;
					t.assertFalse(val);
					return val;
				}
			},
			{
				id:220,
				name:"isRoaming - Verify true.",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				instructions:"Make sure your phone is in roaming mode (e.g. by using a foreign SIM card).",
				test:function(t){
					var val = wdr.isRoaming;
					t.assertTrue(val);
					return val;
				}
			},
			{
				id:300,
				name:"radioSignalSource - Exists at all?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				test:function(t){
					var val = wdr.radioSignalSource;
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},
			{
				id:310,
				name:"radioSignalSource - Verify?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				expectedResult:"Is the above the type of source your phone currently uses for phone calls?",
				test:function(t){
					var val = wdr.radioSignalSource;
					dohx.showInfo("API reports:", val);
					return val;
				}
			},
			{
				id:320,
				name:"radioSignalSource - Verify GSM?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				instructions:"Switch your phone to use GSM!",
				test:function(t){
					var val = wdr.radioSignalSource;
					t.assertEqual(wdrTypes.GSM, val);
					return val;
				}
			},
			{
				id:400,
				name:"radioSignalStrengthPercent",
//TODO more explicit questions!!!
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
//TODO more explicit questions!!!
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
				mustSupportApis:["Widget.Device.RadioInfo.onSignalSourceChange"],
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
				mustSupportApis:["Widget.Device.RadioInfo.onSignalSourceChange"],
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
				mustSupportApis:["Widget.Device.RadioInfo.onSignalSourceChange"],
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
				mustSupportApis:["Widget.Device.RadioInfo.onSignalSourceChange"],
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