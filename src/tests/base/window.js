/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
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
				id: 210,
				name:"alert - long text",
				requiredObjects:["window.alert"],
				expectedResult:"Did you see an alert pop up, with a long message which was still completely readable (e.g. properly wrapped and not cut off)?",
				test:function(t){
					window.alert("Hello, have a nice day! A really nice day! Hello, have a nice day! A two really nice days :) !");
				}
			},
			{
				id: 300,
				name:"confirm - positive",
				requiredObjects:["window.confirm"],
				test:function(t){
					t.assertTrue(window.confirm("Please click 'OK'."));
				}
			},
			{
				id: 400,
				name:"confirm - negative",
				requiredObjects:["window.confirm"],
				test:function(t){
					t.assertFalse(window.confirm("Please click 'Cancel'."));
				}
			},
			{
				id: 410,
				name:"confirm - long text",
				requiredObjects:["window.confirm"],
				test:function(t){
					t.assertTrue(window.confirm("Is this readable? Multiple times? Is this readable? Multiple times? Is this readable? Multiple times?"));
				}
			},
			{
				id: 500,
				name:"prompt - type in 'yes'",
				timeout:2*60*1000,
				requiredObjects:["window.prompt"],
				test:function(t){
					t.assertEqual("yes", window.prompt("Please enter 'yes' in the box below."));
				}
			},
			{
				id: 600,
				name:"prompt - click 'OK'",
				requiredObjects:["window.prompt"],
				test:function(t){
					t.assertEqual("", window.prompt("Please type nothing, just press 'OK'."));
				}
			},
			{
				id: 610,
				// On the Nokia N8 long text was just floating out of the visible area, no wrapping took place.
				name:"prompt - long text",
				requiredObjects:["window.prompt"],
				expectedResult:"Was the text in the pop up completely readable?",
				test:function(t){
					window.prompt("This is a really long text, that should be well readable and wrapped in a nice way! Click any button.")
				}
			},
			{
				id: 620,
				// On the N8 multiple prompts in a row made the keyboard not appear anymore.
				name:"prompt - multiple prompts",
				timeout:2*60*1000,
				requiredObjects:["window.prompt"],
				test:function(t){
					for (var i=1; i<5; i++){
						if (i!=window.prompt("Prompt " + i + ", please type the digit '" + i + "'.")){
							t.failure("No text received in prompt " + i + ".");
							return;
						}
					}
					t.success("Four prompts in a row appeared and did contain text.");
				}
			},
			{
				// A pretty new version of HTML spec http://www.w3.org/TR/2010/WD-html5-20100624/author/timers.html#simple-dialogs
				// says:
				// 		"If the user cancels the prompt, then returns null instead."
				id: 700,
				name:"prompt - click 'Cancel'",
				requiredObjects:["window.prompt"],
				test:function(t){
					t.assertEqual(null, window.prompt("Please type nothing, just press 'Cancel'."));
				}
			},
			{
				id: 800,
				name:"prompt - Hide virtual keyboard and re-open.",
				timeout:2*60*1000,
				requiredObjects:["window.prompt"],
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
			}
//*/
		]
	});
})();