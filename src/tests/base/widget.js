(function(){
	
	dohx.add({name:"window",
		mqcExecutionOrderBaseOffset:340000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id: 100,
				name:"showNotification - simple",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a popup telling you something nice?",
				test:function(t){
					widget.showNotification("Hello, have a nice day!!!");
				}
			},
			{
				id: 200,
				name:"showNotification - two lines",
				requiredObjects:["widget.showNotification"],
				expectedResult:"Did you see a popup, with a TWO LINE message?",
				test:function(t){
					widget.showNotification("Hello, have a nice day!!!\nA really nice day!");
				}
			},
			{
				id: 300,
				name:"showNotification - callback",
				requiredObjects:["widget.showNotification"],
				timeout:30 * 1000, // Give the user 30secs
				test:function(t){
					widget.showNotification("Just click me away, thanks.", function(){
						t.success("Callback fired.");
					});
				}
			},
			{
				id: 400,
				name:"showNotification - Missing params",
				requiredObjects:["widget.showNotification"],
				test:function(t){
					try{
						widget.showNotification();
						t.failure("Exception should have been thrown.");
					}catch(e){
						t.success("Exception caught: " + e);
					}
				}
			},
		]
	});
})();