// mmmmh, if we allow filtering and only running some tests
// we have to adjust doh.register() so numTests etc. have to be adjusted too, right?
// or it will just be "wrong".
doh.config = {
	filter:{
		groupName:""
	},
	
	// testFunctionName: Set the function name where the test is implemented in.
	testFunctionName:"test"
};

