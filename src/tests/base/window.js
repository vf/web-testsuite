(function(){
	
	dohx.add({name:"window",
		mqcExecutionOrderBaseOffset:330000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id: 100,
				name:"alert - simple",
				requiredObjects:["window.alert"],
				expectedResult:"Did you see an alert pop up, with a message in it?",
				test:function(t){
					window.alert("Hello, have a nice day!!!");
				}
			},
			{
				id: 200,
				name:"alert - two lines",
				requiredObjects:["window.alert"],
				expectedResult:"Did you see an alert pop up, with a TWO LINE message?",
				test:function(t){
					window.alert("Hello, have a nice day!!!\nA really nice day!");
				}
			},
			{
				id: 300,
				name:"confirm - positive",
				requiredObjects:["window.confirm"],
				timeout:2 * 60 *1000,
				test:function(t){
					t.assertTrue(window.confirm("Please click 'OK'."));
				}
			},
			{
				id: 400,
				name:"confirm - negative",
				requiredObjects:["window.confirm"],
				timeout:2 * 60 *1000,
				test:function(t){
					t.assertFalse(window.confirm("Please click 'Cancel'."));
				}
			},
			{
				id: 500,
				name:"prompt - type in 'yes'",
				requiredObjects:["window.prompt"],
				timeout:2 * 60 *1000,
				test:function(t){
					t.assertEqual("yes", window.prompt("Please enter 'yes' in the box below."));
				}
			},
			{
				id: 600,
				name:"prompt - click 'OK'",
				requiredObjects:["window.prompt"],
				timeout:2 * 60 *1000,
				test:function(t){
					t.assertEqual("", window.prompt("Please type nothing, just press 'OK'."));
				}
			},
			{
				id: 700,
				name:"prompt - click 'Cancel'",
				requiredObjects:["window.prompt"],
				timeout:2 * 60 *1000,
				test:function(t){
					t.assertEqual(null, window.prompt("Please type nothing, just press 'Cancel'."));
				}
			},
			{
				id: 800,
				name:"prompt - Hide virtual keyboard and re-open.",
				requiredObjects:["window.prompt"],
				timeout:2 * 60 *1000,
				test:function(t){
					var instructions = [
						"Type 'file.wav' (may have to scroll this popup).",
						"Hide the keyboard.",
						"Open the keyboard again",
						"Remove the text.",
						"Type 'new.wav' again.",
						"Press 'OK'"
					];
					t.assertEqual("new.wav", window.prompt("* " + instructions.join("\n* ")));
				}
			},
//*/
		]
	});
})();