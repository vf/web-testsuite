(function(){
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	var wdd = util.isObject("Widget.Device.DeviceStateInfo") ? wd.DeviceStateInfo : {};
	
	dohx.add({name:"DeviceStateInfo",
		mqcExecutionOrderBaseOffset:180000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"audioPath",
				requiredObjects:["Widget.Device.DeviceStateInfo.audioPath"],
				test:function(t){
					var val = wdd.audioPath;
					t.assertNotEqual("", val, "Should not be empty!");
					return val;
				}
			},{
				id:200,
				name:"availableMemory",
				requiredObjects:["Widget.Device.DeviceStateInfo.availableMemory"],
				test:function(t){
					var value = wdd.availableMemory;
					t.assertTrue(util.isNumber(value), "availableMemory is not a number.");
					return value;
				}
			},{
				id:300,
				name:"backLightOn",
				requiredObjects:["Widget.Device.DeviceStateInfo.backLightOn"],
				test:function(t){
					var val = wdd.backLightOn;
					t.assertTrue(val===true || val===false, "backLightOn is not boolean.");
					return val;
				}
			},{
				id:400,
				addIf:config.hasKeypadLight,
				name:"keypadLightOn",
				requiredObjects:["Widget.Device.DeviceStateInfo.keypadLightOn"],
				test:function(t){
					var val = wdd.keypadLightOn;
					t.assertTrue(val===true || val===false, "keypadLightOn is not boolean.");
					return val;
				}
			},{
				id:500,
				name:"language",
				requiredObjects:["Widget.Device.DeviceStateInfo.language"],
				test:function(t){
					var val = wdd.language;
					t.assertNotEqual("", val, "Language should not be empty.");
					return val;
				}
			},{
				id:600,
				name:"processorUtilizationPercent",
				requiredObjects:["Widget.Device.DeviceStateInfo.processorUtilizationPercent"],
				test:function(t){
					var val = wdd.processorUtilizationPercent;
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},
			//
			//	Methods
			//
			{
				id:700,
				name:"onFlipEvent close",
				addIf:config.hasClamshell,
				requiredObjects:["Widget.Device.DeviceStateInfo.onFlipEvent"],
				instructions:[
					"Please click 'GO'.",
					"Close the clamshell (and open it again to return here)."
				],
				test:function(t){
					wdd.onFlipEvent = function(isClosed){
						if (isClosed){
							t.success();
						}
						t.failure();
					};
				},
				tearDown:function(){
					delete wdd.onFlipEvent;
				}
			},{
				id:800,
				addIf:config.hasClamshell,
				name:"onFlipEvent open",
				requiredObjects:["Widget.Device.DeviceStateInfo.onFlipEvent"],
				instructions:[
					"Please click 'GO'.",
					"Close and open the clamshell again."
				],
				test:function(t){
					var counter = 0;
					wdd.onFlipEvent = function(isClosed){
						counter++;
						// Ignore the event when the clamshell gets closed, we want to test for open.
						if (isClosed){
							return;
						}
						// The counter must be 2, since the onFlipEvent was called twice, the open MUST be the second event.
						t.assertEqual(2, counter);
					};
				},
				tearDown:function(){
					delete wdd.onFlipEvent;
				}
			//},{
			//	id:900,
			//	name:"onScreenChangeDimensions - does it fire at all?",
			//	instructions:[
			//		"Click 'GO'.",
			//		"Change the orientation of the phone (landscape/portrait)!"
			//	],
			//	timeout:10 * 1000,
			//	test:function(t){
			//		//wdd.onScreenChangeDimensions = function(){
			//		//	//t.success("event fired");
			//		//}
			//	},
			//	tearDown:function(){
			//		delete wdd.onScreenChangeDimensions;
			//	}
			},{
				id:1000,
				name:"onScreenChangeDimensions - do width+height change?",
				instructions:[
					"Click 'GO'",
					"Switch the widget to mini/floating mode, to change it's dimensions.",
					"Switch back to fullscreen mode, the test should have ended successfully."
				],
				timeout:10 * 1000,
				test:function(t){
					var oldW = window.innerWidth;
					var oldH = window.innerHeight;
// this shows that the size changes when going into floating mode ... 
//var count=0;setInterval(function(){dohx.showInfo(count++, oldW, oldH," = ", window.innerWidth, window.innerHeight)}, 3000);
					wdd.onScreenChangeDimensions = function(width, height){
						t.assertTrue(oldW!=width && oldH!=height);
					}
				},
				tearDown:function(){
					delete wdd.onScreenChangeDimensions;
				}
			}
		]
	});
})();

