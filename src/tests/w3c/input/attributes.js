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
	
	dohx.add({name:"attributes",
		mqcExecutionOrderBaseOffset:600000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"autofocus",
				expectedResult:"Was the input field focused right away?",
				test:function(t){
					dohx.showInfo('<input type="text" autofocus="autofocus" />');
				}
			},
			{
				id:200,
				name:"placeholder",
				expectedResult:"Do you see placeholder text in the input field?",
				test:function(t){
					dohx.showInfo('<input type="text" placeholder="I am your placeholder" />');
				}
			},
			{
				id:300,
				name:"readonly",
				expectedResult:"Is the input field NOT editable?",
				test:function(t){
					dohx.showInfo('<input type="text" value="Not editable" readonly />');
				}
			},
			{
				id:400,
				name:"disabled, let user verify",
				expectedResult:"Is the input field disabled?",
				test:function(t){
					dohx.showInfo('<input type="text" value="Should be disabled" disabled />');
				}
			},
			{
				// spec says:
				// 		A form control that is disabled must prevent any click events that are queued on the user interaction task source from being dispatched on the element.
				// http://dev.w3.org/html5/spec/Overview.html#attr-fe-disabled
				id:500,
				name:"disabled, don't prevent events fired",
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Did clicking the input field NOT show 'FAIL'?",
				test:function(t){
					dohx.showInfo('<input id="_disabled" type="text" value="Should be disabled" disabled />');
					embed.on(embed.byId("_disabled"), "click", function(){
						dohx.showInfo("FAIL");
					});
				}
			},
			{
				// http://dev.w3.org/html5/spec/Overview.html#attr-input-required
				id:600,
				name:"required, validate empty field doesn't submit",
				instructions:[
					"Click 'GO'!",
					"Type nothing in the input field!",
					"Click the submit button!"
				],
				expectedResult:"Did the form NOT submit?",
				test:function(t){
					dohx.showInfo('<form id="_form"><input type="text" required /><input type="submit" /></form>');
					embed.byId("_form").onsubmit = function(){
						return false;
					}
				}
			},
			{
				id:700,
				name:"required, validate non-empty field does submit",
				instructions:[
					"Click 'GO'!",
					"Type something in the input field!",
					"Click the submit button!"
				],
				test:function(t){
					dohx.showInfo('<form id="_form"><input type="text" required /><input type="submit" /></form>');
					embed.byId("_form").onsubmit = function(){
						t.success("Form did submit fine.");
						return false;
					};
				}
			},
			{
				id:800,
				name:"pattern, simple positive test",
				test:function(t){
					dohx.showInfo('<input id="_pattern" pattern="[a-z]+" title="Letters only accpeted." />');
					var e = embed.byId("_pattern");
					e.value = "abcdefghijklmnopqrstuvwxyz";
					t.assertEqual(true, e.validity.valid);
				}
			},
			{
				id:900,
				name:"pattern, mismatch",
				test:function(t){
					dohx.showInfo('<input id="_pattern" pattern="[0-9]+" title="Letters only accpeted." />');
					var e = embed.byId("_pattern");
					e.value = "123";
					t.assertEqual(true, e.validity.valid);
				}
			},
//*/
		]
	});
})();
