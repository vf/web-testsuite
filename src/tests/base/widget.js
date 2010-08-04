(function(){
	
	dohx.add({name:"window",
		mqcExecutionOrderBaseOffset:340000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			//	showNotification
			//	spec: http://www.w3.org/TR/2009/WD-widgets-apis-20090423/#the-shownotification-method
			//
			{
				id: 100,
				name:"showNotification - simple",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a popup with 1) headline 'Hello headline' and 2) the message telling you something nice?",
				test:function(t){
					widget.showNotification("Hello headline", "Hello, have a nice day!!!");
				}
			},
			{
				id: 200,
				name:"showNotification - two lines",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a popup, with 1) the headline and 2) a TWO LINE message?",
				test:function(t){
					widget.showNotification("Hello headline", "Hello, have a nice day!!!\nA really nice day!");
				}
			},
			{
				id: 300,
				name:"showNotification - callback",
				requiredObjects:["widget.showNotification"],
				timeout:30 * 1000, // Give the user 30secs
				test:function(t){
					widget.showNotification("Hello headline", "Just click me away, thanks.", function(){
						t.success("Callback fired.");
					});
				}
			},
			{
				id: 400,
				name:"showNotification - Missing params",
				requiredObjects:["widget.showNotification"],
				test:function(t){
					widget.showNotification(); // Should be no problem, also no excpetion should be thrown.
				}
			},
		]
	});
})();