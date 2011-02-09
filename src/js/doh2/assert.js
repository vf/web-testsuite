doh.assert = {
	assertTrue:function(/*Object*/ condition, /*String?*/ hint){
		// summary:
		//		is the passed item "truthy"?
		if(arguments.length < 1){ 
			throw new doh.assert.Failure("assertTrue failed because it was not passed at least 1 argument"); 
		} 
		if(!eval(condition)){
			throw new doh.assert.Failure("assertTrue('" + condition + "') failed", hint);
		}
	},

	assertFalse:function(/*Object*/ condition, /*String?*/ hint){
		// summary:
		//		is the passed item "falsey"?
		if(arguments.length < 1){ 
			throw new doh.assert.Failure("assertFalse failed because it was not passed at least 1 argument"); 
		} 
		if(eval(condition)){
			throw new doh.assert.Failure("assertFalse('" + condition + "') failed", hint);
		}
	},

	assertError:function(/*Error object*/expectedError, /*Object*/scope, /*String*/functionName, /*Array*/args, /*String?*/ hint){
		//	summary:
		//		Test for a certain error to be thrown by the given function.
		//	example:
		//		t.assertError(dojox.data.QueryReadStore.InvalidAttributeError, store, "getValue", [item, "NOT THERE"]);
		//		t.assertError(dojox.data.QueryReadStore.InvalidItemError, store, "getValue", ["not an item", "NOT THERE"]);
		try{
			scope[functionName].apply(scope, args);
		}catch (e){
			if(e instanceof expectedError){
				return true;
			}else{
				throw new doh.assert.Failure("assertError() failed:\n\texpected error\n\t\t"+expectedError+"\n\tbut got\n\t\t"+e+"\n\n", hint);
			}
		}
		throw new doh.assert.Failure("assertError() failed:\n\texpected error\n\t\t"+expectedError+"\n\tbut no error caught\n\n", hint);
	},

	assertEqual:function(/*Object*/ expected, /*Object*/ actual, /*String?*/ hint){
		// summary:
		//		are the passed expected and actual objects/values deeply
		//		equivalent?
	
		// Compare undefined always with three equal signs, because undefined==null
		// is true, but undefined===null is false. 
		if((expected === undefined)&&(actual === undefined)){ 
			return true;
		}
		if(arguments.length < 2){ 
			throw doh.assert.Failure("assertEqual failed because it was not passed 2 arguments"); 
		} 
		if((expected === actual)||(expected == actual)){ 
			return true;
		}
		if(	(doh.util.isArray(expected) && doh.util.isArray(actual))&&
			(doh.assert._arrayEq(expected, actual)) ){
			return true;
		}
		if( ((typeof expected == "object")&&((typeof actual == "object")))&&
			(doh.assert._objPropEq(expected, actual)) ){
			return true;
		}
		throw new doh.assert.Failure("assertEqual() failed:\n\texpected\n\t\t'"+expected+"'\n\tbut got\n\t\t'"+actual+"'\n\n", hint);
	},

	assertNotEqual:function(/*Object*/ notExpected, /*Object*/ actual, /*String?*/ hint){
		// summary:
		//		are the passed notexpected and actual objects/values deeply
		//		not equivalent?
	
		// Compare undefined always with three equal signs, because undefined==null
		// is true, but undefined===null is false. 
		if((notExpected === undefined)&&(actual === undefined)){ 
			throw new doh.assert.Failure("assertNotEqual() failed: not expected |"+notExpected+"| but got |"+actual+"|", hint);
		}
		if(arguments.length < 2){ 
			throw doh.assert.Failure("assertEqual failed because it was not passed 2 arguments"); 
		} 
		if((notExpected === actual)||(notExpected == actual)){ 
			throw new doh.assert.Failure("assertNotEqual() failed: not expected |"+notExpected+"| but got |"+actual+"|", hint);
		}
		if(	(doh.util.isArray(notExpected) && doh.util.isArray(actual))&&
			(doh.assert._arrayEq(notExpected, actual)) ){
			throw new doh.assert.Failure("assertNotEqual() failed: not expected |"+notExpected+"| but got |"+actual+"|", hint);
		}
		if( ((typeof notExpected == "object")&&((typeof actual == "object")))&&
			(doh.assert._objPropEq(notExpected, actual)) ){
			throw new doh.assert.Failure("assertNotEqual() failed: not expected |"+notExpected+"| but got |"+actual+"|", hint);
		}
		return true;
	},

	_arrayEq:function(expected, actual){
		if(expected.length != actual.length){ return false; }
		// FIXME: we're not handling circular refs. Do we care?
		for(var x=0; x<expected.length; x++){
			if(!doh.assert.assertEqual(expected[x], actual[x])){ return false; }
		}
		return true;
	},

	_objPropEq:function(expected, actual){
		// Degenerate case: if they are both null, then their "properties" are equal.
		if(expected === null && actual === null){
			return true;
		}
		// If only one is null, they aren't equal.
		if(expected === null || actual === null){
			return false;
		}
		if(expected instanceof Date){
			return actual instanceof Date && expected.getTime()==actual.getTime();
		}
		var x;
		// Make sure ALL THE SAME properties are in both objects!
		for(x in actual){ // Lets check "actual" here, expected is checked below.
			if(expected[x] === undefined){
				return false;
			}
		};
	
		for(x in expected){
			if(!doh.assert.assertEqual(expected[x], actual[x])){
				return false;
			}
		}
		return true;
	},

	Failure:function(msg, hint){
		// idea for this as way of dis-ambiguating error types is from JUM. 
		// The JUM is dead! Long live the JUM!
	
		if(!(this instanceof doh.assert.Failure)){
			return new doh.assert.Failure(msg);
		}
		if(hint){
			msg = (new String(msg||""))+" with hint: \n\t\t"+(new String(hint)+"\n");
		}
		this.message = new String(msg||"");
		return this;
	}
};
doh.assert.Failure.prototype = new Error();
doh.assert.Failure.prototype.constructor = doh.assert.Failure;
doh.assert.Failure.prototype.name = "doh.assert.Failure";
