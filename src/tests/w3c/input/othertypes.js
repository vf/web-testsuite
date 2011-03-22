(function(){

/*
	These tests are for all non-date-related input types. The tests are based on my research at 
	http://www.quirksmode.org/blog/archives/2011/03/the_new_input_t.html,
	and they test the three distinct purposes of the new input types:
	
	1) INTERFACE purpose: interacting with the input should give the user an easy way of filling in 
	a valid value. The date types give the clearest example of this: the interface could take the 
	form of a calendar widget, such as Opera does, or a native control, such as RIM does.
	
	2) RESTRICTION purpose: ideally, users would be restricted from entering invalid value. This
	is most easily explained with the number type: user input should be restricted to numbers,
	decimal separators, and an 'e' for exponents. (1.324e10 or something).
	
	3) VALIDATION purpose: when the form is submitted, the browser should check if the value is
	valid. If it's not it should halt the submission and display an error message. The best example
	here is the pattern attribute: the browser should check if the value conforms to the pattern,
	and refuse form submission if it doesn't.
	
	In general, input fields that are restricted do not need validation, and vice versa. Still,
	most tests test for both, just to be on the safe side.
	
	The tests below test all three purposes for all non-date-related types, where applicable.
	
	The input type="number" tests are the most extensive ones; the other types generally cannot
	conform to the RESTRICTION purpose because it's fairly hard to define, for instance, URLs
	or email addresses.

	The tests do NOT test the INTERFACE purpose for email and url. A special interface 
	consists of popping up a specialised keyboard, and that is 	only possible on touchscreen 
	devices. This is tested separately in the touchscreen tests, which should only be executed
	on touchscreen devices.

	VALIDATION purpose tests are commented out until the test suite supports both expectedResult
	and t.failure() in the same test.

	- ppk

*/

	dohx.add({name:"Other input types",
		mqcExecutionOrderBaseOffset:600000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
		{

				/*
					Test INTERFACE purpose for input type="number"
				*/

				id:100,
				name:"Number type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as arrow buttons or an alternate keyboard?",
				test:function(t){
					dohx.showInfo('<form><input type="number" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="number".
					It does not in Safari and Chrome 9.
					This test may be removed if we're only studying mobile browsers.
				*/
		
				id:200,
				name:"Number type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				expectedResult:"Can you use the interface to easily select a number close to zero? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="number" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="number"
				*/

				id:300,
				name:"Number type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="number" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="number" with a pre-filled value
				*/

				id:400,
				name:"Number type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input400" type="number" /></form>');
					var e = embed.byId("_input400");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="number"
					Commented out until the test suite supports both expectedResult and t.failure()
				
				id:500,
				name:"Number type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form500"><input type="number" /><input type="submit" /></form>');
					embed.byId("_form500").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{

				/*
					Test RESTRICTION purpose for input type="email" with a pre-filled value
				*/

				id:600,
				name:"Email type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#e-mail-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input600" type="email" /></form>');
					var e = embed.byId("_input600");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="email"
					Commented out until the test suite supports both expectedResult and t.failure()
				
				id:700,
				name:"Email type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#e-mail-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc 123' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form700"><input type="email" /><input type="submit" /></form>');
					embed.byId("_form700").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{

				/*
					Test RESTRICTION purpose for input type="url" with a pre-filled value
				*/

				id:800,
				name:"URL type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#url-state"],
				expectedResult: "Do you NOT see 'abc 123' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input800" type="email" /></form>');
					var e = embed.byId("_input800");
					e.value = "abc 123";
				}
			},
		/*{

					Test VALIDATION purpose for input type="url"
					Commented out until the test suite supports both expectedResult and t.failure()
				
				id:900,
				name:"Email type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#url-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc 123' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form900"><input type="url" /><input type="submit" /></form>');
					embed.byId("_form900").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{

				/*
					Test INTERFACE purpose for input type="search"
				*/

				id:1000,
				name:"Search type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#text-state-and-search-state"],
				expectedResult: "Does the second input field look in any way different than the first?",
				test:function(t){
					dohx.showInfo('<form><input type="text" value="First field"  /><br><input type="search" value="Second field" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for input type="color"
				*/

				id:1100,
				name:"Color type - interface",
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#color-state"],
				expectedResult: "Do you see an interface that allows you to select a color?",
				test:function(t){
					dohx.showInfo('<form><input type="color" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for input type="range", and whether the interface works.
					(If it doesn't work, showing the interface is worse than useless.)
				*/

				id:1200,
				name:"Range type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#range-state"],
				expectedResult: "Do you see a slider? Can you slide it?",
				test:function(t){
					dohx.showInfo('<form id="slider"><input type="range" /></form>');
				}
			},
		{

				/*
					Test INTERFACE purpose for datalists
				*/

				id:1300,
				name:"Datalist - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/the-button-element.html#the-datalist-element"],
				instructions:[
					"Click 'GO'!",
					"Enter 'Test' in the input field."
				],
				expectedResult: "Does the input field suggest the values 'Test 1' and 'Test 2'?",
				test:function(t){
					dohx.showInfo('<input list="testlist" name="list" /><datalist id="testlist"><option label="Test 1" value="Test 1"></option><option label="Test 2" value="Test 2"></option></datalist>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="tel"
				*/

				id:1400,
				name:"Number type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#number-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="tel" /></form>');
				}
			}, 
		{
				/*
					Test RESTRICTION purpose for input type="tel" with a pre-filled value
				*/

				id:1500,
				name:"Tel type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#telephone-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input1500" type="tel" /></form>');
					var e = embed.byId("_input1500");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="tel"
					Commented out until the test suite supports both expectedResult and t.failure()
				
				id:1500,
				name:"Email type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#telephone-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc 123' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form1600"><input type="tel" /><input type="submit" /></form>');
					embed.byId("_form1600").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
//*/
		]
	});
})();


