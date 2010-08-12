// TODO
// 1) either provide createFile() whcih would be ideal, to automatically create files
//		OR create file TEST_FILE manually (sucks).

(function(){
	
	//
	// Provide some shortcuts and helper functionality or variables/constants.
	//
	var w = util.isObject("Widget") ? Widget : {};
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	
	//
	// Properties
	//
	dohx.add({name:"Device",
		mqcExecutionOrderBaseOffset:160000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"clipboardString - Does it return the copied stirng?",
				addIf:config.hasClipboard,
				instructions:"Copy 'THIS HERE' into the clipboard (without the apostrophes) using the phone's copy-functionality, then press 'GO'.",
				test:function(t){
					t.assertEqual("THIS HERE", wd.clipboardString);
				}
			},{
				id:200,
				name:"widgetEngineName - Verify that it is not '' (an empty string).",
				requiredObjects:["Widget.Device.widgetEngineName"],
				test:function(t){
					var ret = wd.widgetEngineName;
					t.assertNotEqual("", ret, "Should not be empty!");
					return ret;
				}
			},{
				id:300,
				name:"widgetEngineName - Verify content.",
				requiredObjects:["Widget.Device.widgetEngineName"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					dohx.showInfo("widgetEngineName: ",wd.widgetEngineName);
				}
			},{
				id:400,
				name:"widgetEngineProvider - Verify that it is not '' (an empty string).",
				requiredObjects:["Widget.Device.widgetEngineProvider"],
				test:function(t){
					var ret = wd.widgetEngineProvider;
					t.assertNotEqual("", ret, "Should not be empty!");
					return ret;
				}
			},{
				id:500,
				name:"widgetEngineProvider - Verify content.",
				requiredObjects:["Widget.Device.widgetEngineProvider"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					dohx.showInfo("widgetEngineProvider:", wd.widgetEngineProvider);
				}
			},{
				id:600,
				name:"widgetEngineVersion - Verify that it is not '' (an empty string).",
				requiredObjects:["Widget.Device.widgetEngineVersion"],
				test:function(t){
					var ret = wd.widgetEngineVersion;
					t.assertNotEqual("", ret, "Should not be empty!");
					return ret;
				}
			},{
				id:700,
				name:"widgetEngineVersion - Verify content..",
				requiredObjects:["Widget.Device.widgetEngineVersion"],
				expectedResult:"Is the above value correct?",
				test:function(t){
					dohx.showInfo("widgetEngineVersion:", wd.widgetEngineVersion);
				}
			}
			//
			//	vibrate/ringtome
			//
			,{
//				id:800,
//				name:"setRingtone",
//				requiredObjects:["Widget.Device.setRingtone"],
//				test:function(t){
//// TODO Maybe bundle a MIDI file with this widget and try to copy this file onto the file system
//// and use it as ringtone later!?
//throw new Error("TODO");
//				}
//			},{
				id:900,
				name:"vibrate 1s",
				requiredObjects:["Widget.Device.vibrate"],
				instructions:"Click 'GO', then the phone should vibrate for 1s.",
				expectedResult:"Did the phone vibrate for 1s?",
				test:function(t){
					wd.vibrate(1);
				}
			},{
				id:1000,
				name:"vibrate 10s",
				requiredObjects:["Widget.Device.vibrate"],
				instructions:"Click 'GO', then the phone should vibrate for 10s.",
				expectedResult:"Did the phone vibrate for 10s?",
				test:function(t){
					wd.vibrate(10);
				}
//*/
			}
		]
	});
})();
