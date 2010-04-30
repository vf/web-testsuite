(function(){
	
	var wdr = util.isObject("Widget.Device.RadioInfo") ? Widget.Device.RadioInfo : {};
	
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
			},{
				id:200,
				name:"isRoaming",
				requiredObjects:["Widget.Device.RadioInfo.isRoaming"],
				test:function(t){
					var val = wdr.isRoaming;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},{
				id:300,
				name:"'radioSignalSource' exists at all?",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalSource"],
				test:function(t){
					var val = wdr.radioSignalSource;
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},{
				id:400,
				name:"radioSignalStrengthPercent",
				requiredObjects:["Widget.Device.RadioInfo.radioSignalStrengthPercent"],
				test:function(t){
					var val = wdr.radioSignalStrengthPercent;
					t.assertTrue(util.isNumber(val));
					return val;
				}
			},
			//
			//	Methods
			//
			{
				id:500,
				name:"onSignalSourceChange",
				test:function(t){
throw new Error("Insufficiently specified.");
				}
			}
		]
	});
})();