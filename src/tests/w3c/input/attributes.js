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
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/association-of-controls-and-forms.html#autofocusing-a-form-control"],
				expectedResult:"Was the input field focused right away?",
				test:function(t){
					dohx.showInfo('<input type="text" autofocus="autofocus" />');
				}
			},
			{
				id:200,
				name:"placeholder",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/common-input-element-attributes.html#the-placeholder-attribute"],
				expectedResult:"Do you see placeholder text in the input field?",
				test:function(t){
					dohx.showInfo('<input type="text" placeholder="I am your placeholder" />');
				}
			},
			{
				id:300,
				name:"readonly",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/common-input-element-attributes.html#the-readonly-attribute"],
				expectedResult:"Is the input field NOT editable?",
				test:function(t){
					dohx.showInfo('<input type="text" value="Not editable" readonly />');
				}
			},
			{
				// spec says:
				// 		If the readonly attribute is specified on an input element, the element is barred from constraint validation.
				id:350,
				name:"readonly, set to false (but still readonly!)",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-html5-20110113/common-input-element-attributes.html#the-readonly-attribute"],
				expectedResult:"Is the input field NOT editable?",
				test:function(t){
					dohx.showInfo('<input type="text" value="Not editable" readonly="false" />');
				}
			},
			{
				id:400,
				name:"disabled, let user verify",
				definedInSpecs:["http://www.w3.org/TR/html5/association-of-controls-and-forms.html#enabling-and-disabling-form-controls"],
				expectedResult:"Is the input field disabled?",
				test:function(t){
					dohx.showInfo('<input type="text" value="Should be disabled" disabled />');
				}
			},
			{
				// spec says:
				// 		A form control that is disabled must prevent any click events that are queued on the user interaction task source from being dispatched on the element.
				id:500,
				name:"disabled, prevent firing events",
				definedInSpecs:["http://www.w3.org/TR/html5/association-of-controls-and-forms.html#enabling-and-disabling-form-controls"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Did clicking the input field NOT show 'FAIL'?",
				test:function(t){
					dohx.showInfo('<input id="_disabled500" type="text" value="Should be disabled" disabled />');
					embed.on(embed.byId("_disabled500"), "click", function(){
						dohx.showInfo("FAIL");
					});
				}
			},
			{
				id:600,
				name:"required, validate empty field doesn't submit",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-required-attribute"],
				instructions:[
					"Click 'GO'!",
					"Type nothing in the input field!",
					"Click the submit button!"
				],
				expectedResult:"Did the form NOT submit?",
				test:function(t){
					dohx.showInfo('<form id="_form600"><input type="text" required /><input type="submit" /></form>');
					embed.byId("_form600").onsubmit = function(){
						return false;
					}
				}
			},
			{
				id:700,
				name:"required, validate non-empty field does submit",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-required-attribute"],
				instructions:[
					"Click 'GO'!",
					"Type something in the input field!",
					"Click the submit button!"
				],
				test:function(t){
					dohx.showInfo('<form id="_form700"><input type="text" required /><input type="submit" /></form>');
					embed.byId("_form700").onsubmit = function(){
						t.success("Form did submit fine.");
						return false;
					};
				}
			},
			
			//
			//	"pattern" attribute
			//
			{
				id:800,
				name:"pattern, simple positive test",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-pattern-attribute"],
				test:function(t){
					dohx.showInfo('<input id="_pattern800" pattern="[a-z]+" title="Letters only accpeted." />');
					var e = embed.byId("_pattern800");
					e.value = "abcdefghijklmnopqrstuvwxyz";
					t.assertEqual(true, e.validity && e.validity.valid);
				}
			},
			{
				id:900,
				name:"pattern, match",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-pattern-attribute"],
				test:function(t){
					dohx.showInfo('<input id="_pattern900" pattern="[0-9]+" title="Letters only accpeted." />');
					var e = embed.byId("_pattern900");
					e.value = "123";
					t.assertEqual(true, e.validity && e.validity.valid);
				}
			},
			{
				id:1000,
				name:"pattern, user input should match",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-pattern-attribute"],
				instructions:[
					"Click 'GO'",
					"Type '123'!",
					"Click the submit button!"
				],
				test:function(t){
					dohx.showInfo('<form id="_form1000"><input id="_pattern1000" pattern="[0-9]+" title="Numbers only accpeted." /><input type="submit"></form>');
					var f = embed.byId("_form1000");
					var p = embed.byId("_pattern1000");
					f.onsubmit = function(){
						t.assertTrue(p.validity && p.validity.valid, "The form's property 'form.validity.valid' should be true.");
						return false;
					};
				}
			},
			{
				id:1100,
				name:"pattern, user input should NOT match",
				definedInSpecs:["http://www.w3.org/TR/html5/common-input-element-attributes.html#the-pattern-attribute"],
				instructions:[
					"Click 'GO'",
					"Type 'abc'!",
					"Click the submit button!"
				],
				expectedResult:"Was the form NOT submittable?",
				test:function(t){
					dohx.showInfo('<form id="_form1100"><input pattern="[0-9]+" title="Numbers only accpeted." /><input type="submit"></form>');
					embed.byId("_form1100").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					};
				}
			},
//*/
		]
	});
})();
