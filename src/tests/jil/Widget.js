(function(){
	var w = util.isObject("Widget") ? Widget : {};
	
	dohx.add({name:"Widget - preference methods",
		mqcExecutionOrderBaseOffset:260000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.setPreferenceForKey", "Widget.preferenceForKey"],
		tests:[
			{
				id:100,
				name:"setPreferenceForKey/preferenceForKey - Verify that get returns what set did.",
				test:function(t){
					// Test the methods themselves.
					var value = "foo bar", key = "myKey1";
					w.setPreferenceForKey(value, key);
					var actual = w.preferenceForKey(key);
					t.assertEqual(value, actual, "'preferenceForKey(key)' didn't return expected result.");
				}
			},{
				id:150,
				name:"setPreferenceForKey/preferenceForKey - Check for old params order. (If this test fails the old params order for setPreferenceForKey is implemented.)",
				test:function(t){
					var value = "foo bar"+new Date().getTime();
					var key = "myKey1"+new Date().getTime();
					w.setPreferenceForKey(key, value);
					var actual = w.preferenceForKey(key);
					t.assertNotEqual(value, actual, "setPreferenceForKey() parameters are in the wrong order, (watch out it switched since JIL 1.2).");
				}
			},{
				id:200,
				name:"setPreferenceForKey - Verify that return value is 'undefined'.",
				test:function(t){
					var ret = w.setPreferenceForKey("value", "key");
					t.assertEqual(undefined, ret);
				}
			},{
				id:300,
				name:"setPreferenceForKey - Set a preference string using all characters from char(1) through char(255), and verify them.",
				test:function(t){
					var expected = "",
						key = "myKey1";
					for (var i=1; i<255; i++) expected += String.fromCharCode(i); // Watch out, don't use 0!
					w.setPreferenceForKey(expected, key);
					var actual = w.preferenceForKey(key);
					t.assertEqual(expected, actual, "'preferenceForKey(key)' didn't return expected result.");
				}
			},{
				id:400,
				name:"setPreferenceForKey - Store 1024 characters.",
				test:function(t){
					var expected = "foo bar ",
						key = "myKey1";
					for (var i=0; i<Math.ceil(1024/expected.length); i++) expected += expected;
					w.setPreferenceForKey(expected, key);
					var actual = w.preferenceForKey(key);
// TODO when multiple asserts work, uncomment the following.
					//t.assertTrue(typeof actual!="undefined");
					//t.assertEqual(expected.length, actual.length, "'preferenceForKey(key)' - lengths differ.");
					t.assertEqual(expected, actual, "'preferenceForKey(key)' doesn't return value of length " + expected.length + " properly.");
				}
			}
		]
	});
	
	dohx.add({name:"Widget",
		mqcExecutionOrderBaseOffset:270000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:500,
				name:"openURL - Verify that it opens the browser.",
				requiredObjects:["Widget.openURL"],
				instructions:"Make sure your device is online. Click the 'GO' button, to open a browser window.",
				expectedResult:"Did the browser open?",
				test:function(){
					w.openURL("http://google.de");
				}
			},{
				id:600,
				name:"onFocus - Verify that callback is executed.",
				mustSupportApis:["Widget.onFocus"],
addIf:false, // disabled for now ... implement properly doesnt work on H2
				//addIf:config.canDoMultitasking,
				instructions:[
					"Open multiple widgets on your screen.",
					"Click 'GO'.",
					"Focus this one again."
				],
				timeout: 10 * 1000,
				test:function(t){
t.failure("TODO test not properly implemented imho");
					w.onFocus = function(){
						t.success("Callback executed.");
					};
				},
				tearDown:function(){
					delete w.onFocus;
				}
			},{
				id:700,
				name:"onMaximize - Verify that callback is executed.",
				mustSupportApis:["Widget.onMaximize"],
				instructions:[
					"Click 'GO'.",
					"Minimize this application, to mini mode.",
					"Maximize it again, to full screen mode, test should pass (will timeout otherwise)."
				],
				timeout: 10 * 1000,
				test:function(t){
					w.onMaximize = function(){
						t.success("Callback executed.");
					};
				},
				tearDown:function(){
					delete w.onMaximize;
				}
			},{
				id:800,
				name:"onRestore - Verify that callback is executed.",
				mustSupportApis:["Widget.onRestore"],
				addIf:config.canDoMultitasking,
				timeout: 10 * 1000,
				instructions:[
					"Click 'GO'.",
					"Hide/Minimize this application.",
					"Restore it again, test should pass (will timeout otherwise)."
				],
				test:function(t){
					w.onRestore = function(){
						t.success("Callback executed.");
					};
				},
				tearDown:function(){
					delete w.onRestore;
				}
			},{
				id:900,
				name:"onWakeup - Verify that callback is executed.",
				mustSupportApis:["Widget.onWakeup"],
				addIf:config.canDoMultitasking,
				instructions:[
					"Click 'GO'.",
					"Make your phone enter sleep mode.",
					"Turn your phone back on, this should make this test pass (will timeout otherwise)."
				],
				timeout: 20 * 1000,
				test:function(t){
					w.onWakeup = function(){
						t.success("Callback executed.");
					};
				},
				tearDown:function(){
					delete w.onWakeup;
				}
			}
		]
	});
})()
//*/
