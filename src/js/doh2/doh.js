doh = {
	
	// This is a temporary structure which points to the current data.
	_current:{
		group:null,
		groupIndex:-1,
		test:null,
		testIndex:-1
	},
	// A helper property, which stores a reference to a test group by name.
	_groupsByName:{},
	
	// Statistical data.
	_numTests:0, // The total number of tests.
	_numTestsExecuted:0, // Number of tests already executed.
	
	// Stats about the test results.
	_numErrors:0,
	_numFailures:0,
	
	//
	_isPaused:false,
	_defaultTimeout:1000,
	_testInFlight:false,
	
	// The groups must be an array, since an object does not necessarily maintain
	// it's order, but tests should be executed in the order as added.
	// This might become even more important when test dependencies will be added,
	// which means only execute test2 if test1 succeeded.
	_groups:[],
	
	_additionalGroupProperties:{
		numTestsExecuted:0,
		numFailures:0,
		numErrors:0
	},
	
	pause:function(){
		this._isPaused = true;
	},
	
	register:function(groupName, tests){
		// summary: Register the given tests to the group with the given name.
		// description: The tests are internally stored in "_groups", an array
		// 		which contains all the tests per group. The new tests are added
		// 		to the group with the given name, if it didnt exist yet it is created.
		var group = null;
		if (this._groupsByName[groupName]){
			group = this._groupsByName[groupName];
		} else {
			this._groups.push({name:groupName, tests:[]});
			group = this._groupsByName[groupName] = this._groups[this._groups.length-1];
		}
		for (var i=0, l=tests.length, t; i<l; i++){
			group.tests.push(tests[i]);
		}
		this._numTests += tests.length;
	},
	
	run:function(){
		if (this._current.group===null){
			this.ui.started();
		}
		this._isPaused = false;
		if (this._testInFlight){
			return;
		}
		this._runNextTest();
	},
	
	_getAssertWrapper:function(d){
		// summary: This returns an object which provides all the assert methods, and wraps a Deferred instance.
		// description: Why that? The interface for doh tests should be the same
		// 		for synchronous and asynchronous tests. The old version required
		// 		you to "know" and "think" when writing asynch tests, and the
		// 		assert methods had not been available directly when writing
		// 		asynchronous tests, you had to use doh.callback/errback.
		// 		This allows to ONLY use assert*() methods. See the selftests
		// 		for examples.
		var myT = new function(){
			this._assertClosure = function(method, args){
				// If the Deferred instance is already "done", means callback or errback
				// had already been called don't do it again.
				// This might be the case when e.g. the test timed out.
				if (d.fired > -1){
console.log('FIXXXXXME multiple asserts or timeout ... d.fired = ', d.fired, "GROUP and TEST: '", d.test.group.name, "' " , d.test.name);
					return;
				}
				try{
					var ret = doh.assert[method].apply(doh, args);
					d.callback(ret || true);
				}catch(e){
					d.errback(e);
				}
			};
			this.success = function(msg){
				// This function can be used to directly make a test succeed.
//TODO write selftest for it!!!!!!!!!
				d.test.result = msg;
				d.callback(msg);
			};
			this.failure = function(msg){
//TODO write selftest for it!!!!!!!!!
				d.errback(new doh.assert.Failure(msg));
			};
			var that = this;
			for (var methodName in doh.assert){
				if (methodName.indexOf("assert")===0){
					this[methodName] = (function(methodName){return function(){
						// Make sure the current callstack is worked off before
						// returning from any assert() method, we do this by
						// setTimeout(). The bug was that assert() didn't make the
						// test execute the return statement (if one was in there)
						// before the test ended, this fixes it.
						setTimeout(doh.util.hitch(that, "_assertClosure", methodName, arguments), 1);
					}})(methodName);
				}
			}
		};
		return myT;
	},
	
	_selectNextTest:function(){
		var c = this._current;
		// Is there a test left in this group?
		if (c.group && c.testIndex < c.group.tests.length-1){
			c.testIndex++;
		} else {
			// First test in the next group, if there is another group.
			if (c.groupIndex < this._groups.length-1){
				c.groupIndex++;
				c.group = this._groups[c.groupIndex];
				doh.util.mixin(c.group, this._additionalGroupProperties);
				this.ui.groupStarted(c.group);
				c.testIndex = 0;
			} else {
				this.ui.report();
				return false;
			}
		}
		c.test = c.group.tests[c.testIndex];
		return true;
	},
	
	_runNextTest:function(){
		// summary: Only called from internally after a test has finished.
		if (this._isPaused){
			return;
		}
		if (this._selectNextTest()){
			this._runTest();
		}
	},
	
	_runTest:function(){
		// summary: This executes the current test.
		// description: This method starts the "test" method of the test object
		// 		and finishes by setting the internal state "_testInFlight" to true,
		// 		which is resolved by the call to "_runNextTest()" which
		// 		automatically happens after the (asynchronous) test has "landed".
		var g = this._current.group,
			t = this._current.test;
		this.ui.testStarted(g, t);
		
		// let doh reference "this.group.thinger..." which can be set by
		// another test or group-level setUp function
		t.group = g; 
		var deferred = new doh.Deferred(),
			assertWrapperObject = this._getAssertWrapper(deferred),
			setUpError = null;
		if(t.setUp){
			try{
				t.setUp(assertWrapperObject);
			}catch(setUpError){
				deferred.errback(new Error('setUp() threw an error: ' + setUpError));
			}
		}
		if(!t[this.config.testFunctionName]){
			t[this.config.testFunctionName] = function(){deferred.errback(new Error("Test missing."));}
		}
		deferred.groupName = g.name;
		deferred.test = t;
		
		deferred.addErrback(function(err){
			if (err instanceof doh.assert.Failure){
				g.numFailures++;
				doh._numFailures++;
				doh.ui.testFailure(g, t, err);
			} else {
				g.numErrors++;
				doh._numErrors++;
				doh.ui.testError(g, t, err);
			}
		});
	
		var retEnd = function(){
			t.endTime = new Date();
			g.numTestsExecuted++;
			doh._numTestsExecuted++;
			if(t.tearDown){
				try{ // Catching tearDown() errors won't make the entire suite stall.
					t.tearDown(assertWrapperObject);
				}catch(tearDownError){
// FIXXXME handle this case. But how? see TODO.txt for more comments.
				}
			}
			doh.ui.testFinished(g, t, deferred.results[0]);
			// Is this the last test in the current group?
			var c = doh._current;
			if (c.testIndex == c.group.tests.length-1){
				doh.ui.groupFinished(g);
			}
		}
	
		var timer = setTimeout(function(){
			deferred.errback(new Error("test timeout in " + t.name.toString()));
		}, t.timeout || doh._defaultTimeout);
	
		deferred.addBoth(function(){
			// Copy over the result if an asynchronous test has writte a result.
			// It must be available through the test object.
// TODO maybe copy over all additional properties, compare to which props assertWrapperObject had upon creation and what new ones had been added, pass them all to t.*
			if (assertWrapperObject.result){
				t.result = assertWrapperObject.result;
			}
			clearTimeout(timer);
			retEnd();
			doh._testInFlight = false;
			setTimeout(doh.util.hitch(doh, "_runNextTest"), 1);
		});
		this._testInFlight = true;

		if (!setUpError){
			t.startTime = new Date();
			try{
				t.result = t[this.config.testFunctionName](assertWrapperObject);
			}catch(err){
				deferred.errback(err);
			}
		}
	}
}
