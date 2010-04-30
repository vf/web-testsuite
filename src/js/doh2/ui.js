doh.ui = {
	// summary: This object contains the functions that are responsible for rendering out the results of each test.
	// description: Override this object or the funtion(s) you need to override.

	started:function(){
		// summary: This is called when run() was called the first time.
		console.log(doh._numTests + " tests registered, in " + doh._groups.length + " groups");
		console.log("--------");
	},
	
	groupStarted:function(group){
		// summary: Called before a group's tests get executed.
		console.log("Starting group '" + group.name + "', " + group.tests.length + " tests");
	},
	
	groupFinished:function(group){
		// summary: After all group's tests ran.
		console.log(group.numTestsExecuted + " tests ran, " +
					group.numFailures + " failures, " +
					group.numErrors + " errors");
		console.log("--------");
	},
	
	testStarted:function(group, test){
		// summary: Before a test's test() method is executed.
	},
	
	testFailure:function(group, test, error){
		// summary: After a test failed.
		console.log(test.name + " FAILURE, " + error.message);
	},
	
	testError:function(group, test, error){
		// summary: After a test failed.
		console.log(test.name + " ERROR, " + error.message);
	},
	
	testFinished:function(group, test, success){
		// summary: 
	},
	
	report:function(){
		// summary: 
		console.log(doh._numTestsExecuted + " tests ran, " +
					doh._numFailures + " failures, " +
					doh._numErrors + " errors");
		console.log("========");
	}
}