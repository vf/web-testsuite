doh.ui = {
	// summary: This object contains the functions that are responsible for rendering out the results of each test.
	// description: Override this object or the funtion(s) you need to override.

	started:function(){
		// summary: This is called when run() was called the first time.
		//console.log(doh._numTests + " tests registered, in " + doh._groups.length + " groups");
		//console.log("--------");
		util.query(".notCustomConfigured")[0].style.display = config.isCustomConfiguration ? "none" : "inline";
	},

	groupStarted:function(group){
		// summary: Called before a group's tests get executed.
		ui.groupHeader(group.name, group.tests.length);
	},
	
	groupFinished:function(group){
		// summary: After all group's tests ran.
		//console.log(group.numTestsExecuted + " tests ran, " +
		//			group.numFailures + " failures, " +
		//			group.numErrors + " errors");
		//console.log("--------");
	},
	
	testStarted:function(group, test){
		// summary: Before a test's test() method is executed.
	},
	
	testFailure:function(group, test, error){
		// summary: After a test failed.
		var out = "";
		if(error instanceof doh.assert.Failure){
			if(error.fileName){ out += error.fileName + ':'; }
			if(error.lineNumber){ out += error.lineNumber + ' '; }
			out += error+": "+error.message;
		}
		ui.failure(test, error);
	},
	
	testError:function(group, test, error){
		// summary: After a test failed.
		ui.error(test, error);
	},
	
	testFinished:function(group, test, success){
		// summary: 
		if (success){
			ui.success(test);
		}
		var numFailed = doh._numFailures + doh._numErrors;
		util.query(".statusBar .numFailed")[0].innerHTML = numFailed;
		util.query(".statusBar .percentFailed")[0].innerHTML = Math.round(100 * numFailed / doh._numTestsExecuted);
		util.query(".statusBar .numTestsDone")[0].innerHTML = doh._numTestsExecuted;
		ui.resetInfo();
	},
	
	report:function(){
		// summary: 
		ui.report(doh._numTests, doh._groups.length, doh._numErrors, doh._numFailures, doh._numNotApplicable);
	}
};