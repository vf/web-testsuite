(function(){
	
	// The spec for that can be found at http://tools.ietf.org/html/rfc5724
	
	dohx.add({name:"SMS URI scheme",
		mqcExecutionOrderBaseOffset:540000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Recipient only",
				instructions:[
					"Click 'GO'",
					"Follow the instructions on the screen.",
					"The SMS app should open, close it and come back to this app"
				],
				expectedResult:"Did the SMS app open a new message to '12345'",
				test:function(t){
					// Remove the info node right after click, so the user can follow the instructions below and is not distracted.
					dohx.showInfo('<a class="sms" href="sms:12345" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
			{
				// In the spec specified as: <global-number-digits>
				id:200,
				name:"Global number",
				instructions:[
					"Click 'GO'",
					"Follow the instructions on the screen.",
					"The SMS app should open, close it and come back to this app"
				],
				expectedResult:"Did the SMS app open a new message to '+12345678'",
				test:function(t){
					// Remove the info node right after click, so the user can follow the instructions below and is not distracted.
					dohx.showInfo('<a class="sms" href="sms:+12345678" onclick="dohx.hideInfo()">Click here!</a>')
				}
			},
//*/
		]
	});

})();