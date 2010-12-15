

//////// INVALID .... they worked with doh (we now have doh2)
// FIXXXXXME update the tests to reflect the latest doh2 version we currently use.


//
//	The simplest, basic form of addig tests, using the "doh"-object.
//

doh.registerTest("Adding a single test", function(t){
	t.assertTrue(true);
});

doh.registerTest("A test group", function(t){
	// This test will fail.
	t.assertEqual(1, 2);
});

// This test gets added to the same group "A test group" as the one above.
doh.registerTest("A test group", function(t){
	t.assertNotEqual("one", "two");
});

//
//	Adding multiple tests using "doh", at once.
//

doh.register("Group with many tests", [
	function(t){
		t.assertTrue(false);
	},
	function(t){
		t.assertFalse(true);
	},{
		name:"I have a name :-)",
		runTest:function(t){
			t.assertTrue(false);
		}
	},{
		name:"I have a name :-) too",
		setUp:function(){
			// Do setup stuff
		},
		runTest:function(t){
			t.assertTrue(false);
		},
		tearDown:function(){
			// Tear down if necessary.
		}
	}
]);

//
//	Real life test for JIL
//
doh.register("JIL Widget.preference test", [
	{
		name:"Basics",
		runTest:function(){
			// Make sure that prefernce methods exist.
			t.assertTrue(util.isObject("Widget.preferenceForKey"));
			t.assertTrue(util.isObject("Widget.setPreferenceForKey"));
			// Test the methods themselves.
			var value = "foo bar", key = "myKey1";
			Widget.setPreferenceForKey(key, value);
			var actual = Widget.preferenceForKey(key);
			t.assertEqual(value, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
		}
	},{
		name:"Special characters",
		runTest:function(t){
			// Make sure that prefernce methods exist.
			t.assertTrue(util.isObject("Widget.preferenceForKey"));
			t.assertTrue(util.isObject("Widget.setPreferenceForKey"));
			
			var expected = "",
				key = "myKey1";
			for (var i=1; i<255; i++) expected += String.fromCharCode(i); // Watch out, don't use 0!
			Widget.setPreferenceForKey(key, expected);
			var actual = Widget.preferenceForKey(key);
			t.assertEqual(expected, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
		}
	}
]);

//
//	Abstract out the isObject checks, so we can be sure the test doesnt run unless the required objects exist.
//
tests.add({name:"Widget: preferences",
	tests:[
		{
			name:"Basics",
			requiredObjects:["Widget.setPreferenceForKey", "Widget.preferenceForKey"],
			test:function(t){
				// Test the methods themselves.
				var value = "foo bar", key = "myKey1";
				Widget.setPreferenceForKey(key, value);
				var actual = Widget.preferenceForKey(key);
				t.assertEqual(value, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
			}
		},{
			name:"Special characters",
			requiredObjects:["Widget.setPreferenceForKey", "Widget.preferenceForKey"],
			test:function(t){
				var expected = "",
					key = "myKey1";
				for (var i=1; i<255; i++) expected += String.fromCharCode(i); // Watch out, don't use 0!
				Widget.setPreferenceForKey(key, expected);
				var actual = Widget.preferenceForKey(key);
				t.assertEqual(expected, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
			}
		}
	]
});

// Even simpler, tell that the entire group requires those.
tests.add({name:"Widget: preferences",
	requiredObjects:["Widget.setPreferenceForKey", "Widget.preferenceForKey"],
	tests:[
		{
			name:"Basics",
			test:function(t){
				// Test the methods themselves.
				var value = "foo bar", key = "myKey1";
				Widget.setPreferenceForKey(key, value);
				var actual = Widget.preferenceForKey(key);
				t.assertEqual(value, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
			}
		},{
			name:"Special characters",
			test:function(t){
				var expected = "",
					key = "myKey1";
				for (var i=1; i<255; i++) expected += String.fromCharCode(i); // Watch out, don't use 0!
				Widget.setPreferenceForKey(key, expected);
				var actual = Widget.preferenceForKey(key);
				t.assertEqual(expected, actual, "'Widget.preferenceForKey(key)' didn't return expected result.");
			}
		}
	]
});


doh.register("group name", [
	{
		name:"test name 1",
		timeout:1000,
		setUp:function(){},
		runTest:function(){},
		tearDown:function(){}
	}
]);

tests.add({
	name:"Camera tests",
	requiredObjects:["Widget.Multimedia.Camera"],
	tests:[
		{
			name:"test name 2",
			requiredObjects:["Widget.Multimedia.Camera.startCapture"],
			
			// Add test conditionally, e.g. depending on existing hardware features.
			addIf:config.hasClamshell,
			
			// Trigger manual tests.
			instructions:"",
			expectedResult:"",
			
			// For manual and deferred tests.
			timeout:1000,
			
			// The methods.
			setUp:function(){},
			test:function(){},
			tearDown:function(){}
		}
	]
});

tests.add({
	name:"Deferred tests",
	tests:[
		{
			name:"Deferred success",
			test:function(t){
				var d = new doh.Deferred();
				setTimeout(function(){
					d.callback(true);
				}, 1000);
				return d;
			}
		},{
			name:"Deferred will fail",
			test:function(t){
				var d = new doh.Deferred();
				setTimeout(function(){
					d.errback(new Error("FAAAIIIL"));
				}, 1000);
				return d;
			}
		}
	]
});

tests.add({
	name:"Manual tests",
	tests:[
		{
			name:"vibrate",
			instructions:"Click 'GO' to let the phone vibrate.",
			expectedResult:"Did phone vibrate?",
			requiredObjects:["Widget.Device.vibrate"],
			test:function(t){
				Widget.Device.vibrate(1);
			}
		}
	]
});


tests.add({
	name:"Manual asynch tests (manual+callback)",
	tests:[
		{
			name:"onFocus",
			instructions:"Open multiple widgets on your screen. Focus this one again.",
			test:function(t, deferredWrapper){
				Widget.onFocus = function(){
					deferredWrapper.success();
				};
			},
			tearDown:function(){
				delete Widget.onFocus;
			}
		}
	]
});







