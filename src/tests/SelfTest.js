//	Simple tests.
//	- no asynch,
//	- no user interactions required
//	Just straight through and fully automated.

dohx.add({name:"Simple tests",
	addIf:true,
	tests:[
		{
			name:"succeed: simple",
			test:function(t){
				t.assertTrue(true);
				return "success";
			}
		},{
			name:"fail: asynch",
			timeout:2000,
			test:function(t){
				setTimeout(function(){
					t.assertTrue(false);
				}, 1000);
			}
		},{
			name:"succeed: asynch",
			timeout:2000,
			test:function(t){
				setTimeout(function(){
					t.assertTrue(true);
					t.result = "OK";
				}, 1000);
			}
		},{
			name:"succeed: asynch, success",
			timeout:2000,
			test:function(t){
				setTimeout(function(){
					t.success("Message to show.");
				}, 10);
			}
		}
	]
});


//
//	Tests that only need instructions for the user and run automated afterwards.
//	E.g. "Move the phone into landscape mode!"
//	The instructions given to the user are things that can not be automated,
//	like disconnecting, moving the phone, etc.
//
dohx.add({
	name:"Instructions only",
	tests:[
		{
			name:"succeed: simple",
			instructions:"Click 'GO'",
			test:function(t){
				t.assertTrue(true);
			}
		},{
			name:"succeed: asynch",
			instructions:"Click 'GO'",
			test:function(t){
				setTimeout(function(){
					t.assertTrue(true);
				});
			}
		},{
			name:"fail: simple",
			instructions:"Click 'GO'",
			test:function(t){
				t.assertTrue(false);
			}
		},{
			name:"fail: asynch",
			instructions:"Click 'GO'",
			test:function(t){
				setTimeout(function(){
					t.assertTrue(false);
				}, 10);
			}
		},{
			name:"success: countdown 5secs and succeed then",
			instructions:"Click 'GO'",
			timeout:10000,
			test:function(t){
				setTimeout(function(){
					t.assertTrue(true);
				}, 5000);
			}
		}
	]
});

//
//	Test the user confirmation tests.
//
dohx.add({
	name:"User must say 'Yes' or 'No'.",
	tests:[
		{
			name:"success: Let user confirm.",
			instructions:"Click 'GO'! (test 1)",
			expectedResult:"Click 'Yes'! (test 1)",
			test:function(){
				// In here we actually just implement what the phone shall do,
				// the result is "entered" by the user, by hitting 'Yes' or 'No'.
			}
		},{
			name:"fail: Let user deny",
			instructions:"Click 'GO'! (test 2)",
			expectedResult:"Click 'No'! (test 2)",
			test:function(){
				// Like above ....
			}
		}
// TODO maybe one day t.assert() should be possible and overrule the expectedResult dialog?
	]
});

//
//	Mixed test cases, especially mixing instructions, expectedResult, etc. in various order.
//
dohx.add({
	name:"Mixed test cases.",
	tests:[
		{
			name:"success: simple",
			test:function(t){
				t.assertTrue(true);
			}
		},{
			name:"success: instruction",
			instructions:"Click 'GO'!",
			test:function(t){
				t.assertTrue(true);
			}
		},{
			name:"fail: user decline success",
			instructions:"Click 'GO'!",
			expectedResult:"Click 'No'!",
			test:function(){}
		},{
			name:"success: asynch",
			test:function(t){
				setTimeout(function(){t.assertTrue(true)});
			}
		},{
			name:"success: user confirms",
			instructions:"Click 'GO'!",
			expectedResult:"Click 'Yes'!",
			test:function(){}
		},{
			name:"success: prepare for following test...",
			instructions:"Click 'GO'!",
			expectedResult:"Click 'Yes'!",
			test:function(){}
		},{
			name:"success: user must click 'GO'",
			instructions:"Click 'GO'!",
			test:function(t){
				t.assertTrue(true);
				return "OK";
			}
		}
	]
});

//
//	requiredObjects test
//
dohx.add({
	name:"requiredObjects Tests",
	tests:[
		{
			name:"success: one",
			requiredObjects:["window"]
		},
		{
			name:"success: two",
			requiredObjects:["window", "document"]
		},
		{
			name:"fail: make second fail",
			requiredObjects:["window", "doCuMeNt"]
		},
		{
			name:"fail: make first fail",
			requiredObjects:["windoW", "document"]
		},
		{
			name:"fail: three, make 2nd fail",
			requiredObjects:["window", "window.gggggggggrrrrr.ouch", "document"]
		},
		{
			name:"success: all OK, test OK",
			requiredObjects:["window", "document"],
			test:function(t){
				t.assertTrue(true);
			}
		},
		{
			name:"fail: all OK, test FAIL",
			requiredObjects:["window", "document"],
			test:function(t){
				t.assertTrue(false);
			}
		}
	]
});

//
//	manual tests
//
(function(){
	var _setUpCalled = false;
	dohx.add({
		name:"Manual Tests",
		tests:[
			{
				name:"success: Make sure setUp is called AFTER 'GO' was clicked.",
				instructions:"Click 'GO'.",
				expectedResult:"Click 'YES'.",
				setUp:function(){
					_setUpCalled = true;
				},
				test:function(t){
					if(!_setUpCalled) throw new Error("setUp was not called.");
				}
			}
		]
	});
})();
