/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	dohx.add({name:"widget",
		mqcExecutionOrderBaseOffset:340000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["widget"],
		tests:[
			//
			//	showNotification
			//	spec: http://www.w3.org/TR/2009/WD-widgets-apis-20090423/#the-shownotification-method
			//
			{
				id: 100,
				name:"showNotification - simple",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a notification with 1) headline 'Hello headline' and 2) the message telling you something nice?",
				test:function(t){
					widget.showNotification("Hello headline", "Hello, have a nice day!!!");
				}
			},
			{
				id: 200,
				name:"showNotification - two lines",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a notification, with 1) the headline and 2) a TWO LINE message?",
				test:function(t){
					widget.showNotification("Hello headline", "Hello, have a nice day!!!\nA really nice day!");
				}
			},
			{
				id: 300,
				name:"showNotification - callback",
				requiredObjects:["widget.showNotification"],
				timeout:30 * 1000, // Give the user 30secs
				instructions:[
					"Click 'GO'!",
					"Confirm the notification."
				],
				test:function(t){
					widget.showNotification("Hello headline", "Just click me away, thanks.", function(){
						t.success("Callback fired.");
					});
				}
			},
			{
				id: 400,
addIf:false, // we agreed with opera that this is a minor thing that wont be fixed
				name:"showNotification - Missing params",
				requiredObjects:["widget.showNotification"],
				test:function(t){
					widget.showNotification(); // Should be no problem, also no excpetion should be thrown.
					t.success(true);
				}
			},
			{
				id: 500,
				name:"openURL() - simply open a site.",
				requiredObjects:["widget.openURL"],
				expectedResult:"Did the browser open?",
				test:function(t){
					widget.openURL("http://vodafone.com");
				}
			},
			{
				id: 510,
				name:"openURL() - invalid URL as param",
				requiredObjects:["widget.openURL"],
				expectedResult:"Did the browser open?",
				test:function(t){
					widget.openURL("oops");
				}
			},
			
			//
			//	preferences stuff
			//
			{
				id:600,
				name:"setPreferenceForKey/preferenceForKey - Verify that get returns what set did.",
				requiredObjects:["widget.setPreferenceForKey", "widget.preferenceForKey"],
				test:function(t){
					// Test the methods themselves.
					var value = "foo bar", key = "myKey1";
					widget.setPreferenceForKey(value, key);
					var actual = widget.preferenceForKey(key);
					t.assertEqual(value, actual, "'preferenceForKey(key)' didn't return expected result.");
				}
			},{
				id:700,
				name:"setPreferenceForKey/preferenceForKey - Check for old params order. (If this test fails the old params order for setPreferenceForKey is implemented.)",
				requiredObjects:["widget.setPreferenceForKey", "widget.preferenceForKey"],
				test:function(t){
					var value = "foo bar"+new Date().getTime();
					var key = "myKey1"+new Date().getTime();
					widget.setPreferenceForKey(key, value);
					var actual = widget.preferenceForKey(key);
					t.assertNotEqual(value, actual, "setPreferenceForKey() parameters are in the wrong order, (watch out it switched since JIL 1.2).");
				}
			},{
				id:800,
				name:"setPreferenceForKey - Verify that return value is 'undefined'.",
				requiredObjects:["widget.setPreferenceForKey"],
				test:function(t){
					var ret = widget.setPreferenceForKey("value", "key");
					t.assertEqual(undefined, ret);
				}
			},{
				id:900,
				name:"setPreferenceForKey - Set a preference string using all characters from char(1) through char(255), and verify them.",
				requiredObjects:["widget.setPreferenceForKey", "widget.preferenceForKey"],
				test:function(t){
					var expected = "";
					var key = "myKey1";
					for (var i=1; i<255; i++) expected += String.fromCharCode(i); // Watch out, don't use 0!
					widget.setPreferenceForKey(expected, key);
					var actual = widget.preferenceForKey(key);
					t.assertEqual(expected, actual, "'preferenceForKey(key)' didn't return expected result.");
				}
			},{
				id:1000,
				name:"setPreferenceForKey - Store 1024 characters.",
				requiredObjects:["widget.setPreferenceForKey", "widget.preferenceForKey"],
				test:function(t){
					var expected = "foo bar ";
					var key = "myKey1";
					for (var i=0; i<Math.ceil(1024/expected.length); i++) expected += expected;
					widget.setPreferenceForKey(expected, key);
					var actual = widget.preferenceForKey(key);
// TODO when multiple asserts work, uncomment the following.
					//t.assertTrue(typeof actual!="undefined");
					//t.assertEqual(expected.length, actual.length, "'preferenceForKey(key)' - lengths differ.");
					t.assertEqual(expected, actual, "'preferenceForKey(key)' doesn't return value of length " + expected.length + " properly.");
				}
			}
			
			// look into the NS there are a lot of potential tests to write, show, hide, getAttention, ....
		]
	});
})();