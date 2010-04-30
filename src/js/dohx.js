doh._numNotApplicable = 0;
dohx = {
	add:function(obj){
		var tests = obj.tests;
		// Add requiredObjects to each tests.
		// TODO maybe add this magically as a test and make all tests just depend on it.
		if (obj.requiredObjects){
			for (var i=0; t=tests[i]; i++){
				t.requiredObjects = t.requiredObjects ? (t.requiredObjects.concat(obj.requiredObjects)) : obj.requiredObjects;
			}
		}
		var dohTests = [];
		for (var i=0; t=tests[i]; i++){
			// Copy the addIf=false value to each test of a group.
			if ("addIf" in obj){
				t.addIf = !!obj.addIf;
			}
			if (t.instructions || t.expectedResult){
				dohTests.push(dohx.extendManualTestObject(t));
			} else if(t.timeout){
				t.instructions = "Click 'GO' to run test.";
				dohTests.push(dohx.extendManualTestObject(t));
			} else {
				dohTests.push(dohx.extendTestObject(t));
			}
		}
		// If obj.name=="" doh runs the tests forever, funny bug.
		doh.register(obj.name || "Noname", dohTests);
	}
};

dohx._testObject = {
	name:"",
	requiredObjects:[],
	timeout:5 * 1000, // The phone might be a bit slow, so give it some time :-).
	
	getMissingRequiredObjects:function(){
		var ret = [];
		for (var i=0, o; o=this.requiredObjects[i]; i++){
			// Split up the object name by "." and check each part singlely to report
			// more detailed error, e.g. "Widget.Device.foo" maybe already "Widget" is
			// not defined. So report "'Widget' is not implemented" instead of
			// "'Widget.Device.foo' is not implemented."
			var parts = o.split(".");
			for (var j=0, l=parts.length, p; j<l; j++){
				p = parts.slice(0, j+1).join(".");
				if (!util.isObject(p)){
					ret.push(p);
				}
			}
		}
		return ret;
	},
	
	_runTest:function(t){
		var missing = this.getMissingRequiredObjects();
		if (missing.length){
			t.failure("'" + missing[0] + "' is not implemented!");
			return;
		}
		if (this.requiredObjects.length>0 && !this.test){
			t.assertTrue(true);
			return;
		}
		if (typeof this.test=="function"){
			// Maybe no test is given.
			return this.test(t);
		}
	},
	
	runTest:function(t){
		window.scrollTo(0, 0); // Show the manual test overlay always at top.
		return this._runTest(t)
	}
};

dohx._manualTestObject = {};
doh.util.mixin(dohx._manualTestObject, dohx._testObject);
doh.util.mixin(dohx._manualTestObject, {
	timeout:1 * 60 * 1000,
	instructions:"",
	
	_goClicked:function(){
		util.query(".manualTest .whatToDo .goButton")[0].setAttribute("disabled", "disabled");
		var t = doh._current.test;
		if (t.instructions && !t.expectedResult){
			doh._runTest();
			if (doh._testInFlight){ // If the test didn't finish yet show the countdown, otherwise don't.
				ui.dialog.showCountDown(t.startTime, t.timeout);
			}
		} else if (t.expectedResult){
			try{
				t.test(t);
			}catch(e){
//console.log(e); maybe no test function is implemented, is possible and valid. See e.g. PowerInfo it makes use of that.
			}
			util.style(".manualTest .result", {display:"block"});
		}
	},
	
	_tearDown:function(){
// TODO implement calling the actual tearDown!!!!
		ui.dialog.hide();
	},
	_successfulTestFunction:function(){
		doh._current.test.test = function(t){
			t.success("User confirmed success, pressed 'Yes'.");
		};
		doh._runTest();
	},
	_failTestFunction:function(){
		doh._current.test.test = function(t){
			t.failure("User declined success, pressed 'No'.")
		};
		doh._runTest();
	}
});
// We are connecting on the actual dohx._manualTestObject object itself, which
// means each of the function CANT access the current test through "this", but
// must use "doh._current.test" to access the current test!
// We could of course connect each time for each test, that would just mean we
// would also have to clean up, too much hazzle imho. This way it's just scope mangling :-).
util.connect(".manualTest .whatToDo .goButton", "onclick", doh.util.hitch(dohx._manualTestObject, "_goClicked"));
util.connect(".manualTest .result .yesButton", "onclick", doh.util.hitch(dohx._manualTestObject, "_successfulTestFunction"));
util.connect(".manualTest .result .noButton", "onclick", doh.util.hitch(dohx._manualTestObject, "_failTestFunction"));

doh._runNextTest = function(){
	do{
		var hasNextTest = this._selectNextTest();
		if (!hasNextTest){
			return;
		}
		var c = this._current;
		if (c.test.addIf===false){
			// Pass in the following structure, which is actually created inside
			// doh, but we don't pass the test to doh.
			var test = {};
			doh.util.mixin(test, c.test);
			test.group = c.group;
// TODO I dont know if this is proper in this place.
			doh._numNotApplicable++;
			ui.notApplicable(test);
		}
	}while(c.test.addIf===false);
	var missingReqObj = c.test.getMissingRequiredObjects();
	// If there are requiredObjects that don't exist don't even show the dialog.
	if ((c.test.expectedResult || c.test.instructions) && missingReqObj.length==0){
		// Show the instructions. The click on 'GO' will then call this._runTest().
		var instructions;
		if (util.isArray(c.test.instructions)){
			// If it is an array, prefix every line with an increasing number.
			instructions = [];
			for (var i=0, l=c.test.instructions.length; i<l; i++){
				instructions.push((i+1) +") " + c.test.instructions[i]);
			}
			instructions = instructions.join('<br />');
		} else {
			instructions = c.test.instructions;
		}
		ui.dialog.show(c.test.name, instructions, c.test.expectedResult);
	} else {
		this._runTest();
	}
	return;
}


doh.config.testFunctionName = "runTest";

dohx.showInfo = function(){
	ui.showInfo(Array.prototype.slice.apply(arguments).join(" "));
}

dohx.extendTestObject = function(obj){
	// summary: Clone the doh._testObject and add the properties of obj.
	var ret = {};
	doh.util.mixin(ret, dohx._testObject);
	doh.util.mixin(ret, obj);
	return ret;
};

dohx.extendManualTestObject = function(obj){
	var ret = {};
	doh.util.mixin(ret, dohx._manualTestObject);
	doh.util.mixin(ret, obj);
	if (!ret.instructions){
		ret.instructions = "Click 'GO' to run test!";
	}
	if (ret.tearDown){
		var _actualTearDown = ret.tearDown;
		ret.tearDown = function(t){
			ret._tearDown(t); // Make sure our tearDown is called first, so the actual one can fail.
			_actualTearDown.apply(ret, [t]);
		}
	} else {
		ret.tearDown = ret._tearDown;
	}
	return ret;
};
