// TODO write a test that verifies that the test run in the order as added.
// Write tets for setUp and tearDown
//*
doh.register("Synchronously written tests.",
	[
		//
		//	assertTrue
		//
		{
			name:"fail: assertTrue",
			test:function(t){
				t.assertTrue(false);
			}
		},{
			name:"success: assertTrue",
			test:function(t){
				t.assertTrue(true);
			}
		},
		//
		//	assertFalse
		//
		{
			name:"fail: assertFalse",
			test:function(t){
				t.assertFalse(true);
			}
		},{
			name:"success: assertFalse",
			test:function(t){
				t.assertFalse(false);
			}
		},
		//
		//	assertEqual
		//
		{
			name:"fail: assertEqual bools",
			test:function(t){
				t.assertEqual(true, false);
			}
		},{
			name:"success: assertFalse bools",
			test:function(t){
				t.assertEqual(true, true);
			}
		},
		{
			name:"fail: assertEqual numbers",
			test:function(t){
				t.assertEqual(1, "2");
			}
		},{
			name:"success: assertEqual numbers",
			test:function(t){
				t.assertEqual(1, "1");
			}
		},
		{
			name:"fail: assertEqual arrays",
			test:function(t){
				t.assertEqual([1,2], [2,1]);
			}
		},{
			name:"success: assertEqual arrays",
			test:function(t){
				t.assertEqual([2,3], [2,3]);
			}
		},
		
		
		
		
		
		
		
		
		
		{
			// A missing assert call.
			name:"error: timeout, assert() missing",
			test:function(t){
			}
		},{
			// This test will fail, because it has no implementation of the test method.
			name:"error: test() missing"
		}
	]
);

doh.register("Asynchronous tests.",
	[
		{
			// Inside of an asynch test case you can (and should) still use the assert() methods.
			// No return necessary anymore!!!
			name:"fail: simple asynch",
			timeout:2000,
			test:function(t){
				setTimeout(function(){
					t.assertTrue(false);
				}, 1000);
			}
		},
		{
			name:"success: simple asynch",
			timeout:2000,
			test:function(t){
				setTimeout(function(){
					t.assertTrue(true);
				}, 1000);
			}
		},
		{
			name:"error: timeout",
			timeout:100, // This timeout is shorter than the setTimeout below, this test should fail.
			test:function(t){
				setTimeout(function(){
					t.assertTrue(true);
				}, 1000);
			}
		},
	]
);

var timeDiff;
doh.register("Test doh.pause()",
	[
		{
			// Test that calling pause() from inside a test does pause the test
			// suite and do also test that run() does continue.
			name:"success: pause after this test (and run again)",
			test:function(t){
				t.assertTrue(true);
				doh.pause();
				timeDiff = new Date().getTime();
				setTimeout(function(){doh.run()}, 3500);
			}
		},
		{
			// This test basically measures the time that the test before had
			// paused the test execution and it should be between 3-4 secs.
			name:"success: measure paused time",
			test:function(t){
				var diff = new Date().getTime() - timeDiff
				t.assertTrue(diff > 3000 && diff < 4000, "The pause should be between 3-4 seconds.");
			}
		},
	]
);

//
//	Test "config" parameter.
//
doh.register("Config parameter tests",
	[
		{
			name:"success: 'testFunctionName'",
			setUp:function(){
				this._actualTestFunctionName = doh.config.testFunctionName;
				doh.config.testFunctionName = "myTestFunctionName";
			},
			myTestFunctionName:function(t){
				t.assertTrue(true);
			},
			tearDown:function(){
				doh.config.testFunctionName = this._actualTestFunctionName;
			}
		},
		{
			name:"success: reset 'testFunctionName'",
			test:function(t){
				t.assertTrue(true);
			}
		}
	]
);



// When writing a GUI for the tests it happens that you also want to show the
// test cases that succeeded and maybe with what value, that is what the return
// values are for.
// E.g.
//	test:function(){
//		assertEqual(expectedGeoLocation, actualGeoLocation);
//		return actualGeoLocation;
//	}
// Returning the actual value allows the doh.ui methods to show this value to the user.

(function(){
	var testObject = {
		// We will check if this object has the return value set after the test.
		name:"success: Simple return",
		test:function(t){
			t.assertTrue(true);
			return "jojo";
		}
	};
	doh.register("Return values",
		[
			testObject,
			{
				name:"success: Verify return value from last test",
				test:function(t){
					t.assertEqual(testObject.result, "jojo");
				}
			},
		]
	);
	
	// Test a bug that was in the tests, which didn't pass the value returned by a test
	// to the doh.ui.testFinished() function, because that function was called BEFORE
	// the returned value was set into the test data. A pretty tricky asynch
	// problem. The following is the test to verify that it is fixed.
	var resultValue = null,
		oldTestFinished;
	doh.register("Return value, asynch bug",
		[
			{
				name:"success: Verify return value from last test",
				setUp:function(){
					// We have to override the testFinished() before we call assert()
					// because with the bug assert() triggered the testFinished()
					// before return was executed.
					oldTestFinished = doh.ui.testFinished; // Backup the old testFinished().
					doh.ui.testFinished = function(group, test){
						resultValue = test.result;
						oldTestFinished.apply(doh.ui, arguments);
					}
				},
				test:function(t){
					t.assertTrue(true);
					return "EXPECT ME";
				}
			},
			{
				name:"success: Verify result from last test.",
				setUp:function(){
					doh.ui.testFinished = oldTestFinished;
				},
				test:function(t){
					t.assertEqual("EXPECT ME", resultValue);
				}
			}
		]
	);
})();


// If the test contains asynch parts you can set the "result" property of the test explicitly instead
// of returning a value, like so.
(function(){
	var testObject = {
		// We will check if this object has the return value set after the test.
		name:"success: Simple return",
		test:function(t){
			setTimeout(function(){
				t.assertTrue(true);
				t.result = "jaja";
			}, 100);
		}
	};
	doh.register("Return values in asynch test",
		[
			testObject,
			{
				name:"success: Verify result value from last test",
				test:function(t){
					t.assertEqual(testObject.result, "jaja");
				}
			},
		]
	);
})();
//*/

/*
doh.register("Multiple asserts",
	[
		{
			name:"success: some asserts",
			test:function(t){
				t.assertTrue(true);
				t.assertEqual(1, 1);
				t.assertError(new Error());
			}
		},
		{
			name:"fail: last assert fails",
			test:function(t){
				t.assertTrue(true);
				t.assertEqual(1, 1);
				t.assertError(new Error());
				
// FIXXXME multiple asserts dont work yet :(
				t.assertTrue(false);
			}
		},
		{
			name:"fail: last assert fails",
			timeout:12*1000,
			test:function(t){
				t.assertTrue(true);
				setTimeout(function(){
					t.numAsserts++;
					t.assertTrue(false);
				}, 10 * 1000);
			}
		},
	]
);

write a test which tests that the test is aborted in the place where the first failure occurs, e.g.
	assertTrue(false);
	window = undefined; // this should NEVER be executed because the test function should be aborted above!!!!!!
	assert(undefined, window);

//*/

(function(){
	doh.register("setUp()/tearDown() throw an error", [
		{
			name:"error: setUp() throws an error, test won't execute.",
			setUp:function(){
				throw new Error("Nasty error.");
			},
			test:function(t){
				t.assertTrue(true);
			}
		},
		{
			name:"success: tearDown() throws an error ... not sure what to do",
			test:function(t){
				t.assertTrue(true);
			},
			tearDown:function(){
				throw new Error("Nasty error.");
			}
		}
	]);
})();