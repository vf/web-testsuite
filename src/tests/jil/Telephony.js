(function(){
	// Check the config stuff we need for the tests.
	if (!util.isConfigured(["validPhoneNumber"])){
		return;
	}
	
	var wt = util.isObject("Widget.Telephony") ? Widget.Telephony : {};
	
	dohx.add({name:"Telephony - Methods",
		mqcExecutionOrderBaseOffset:240000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Telephony"],
		tests:[
			{
				id:100,
				name:"initiateVoiceCall - Verify the method call works at all.",
				requiredObjects:[
					"Widget.Telephony.initiateVoiceCall"
				],
				instructions:[
					"Click 'GO'.",
					"A phone call should be started."
				],
				expectedResult:"Did a phone call to the number "+ config.validPhoneNumber +" get initiated?",
				test:function(){
					wt.initiateVoiceCall(config.validPhoneNumber);
				}
			}
		]
	});
})()