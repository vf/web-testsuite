(function(){

/*
	These tests are for all date-related input types. The tests are based on my research at 
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
	
	The tests below test all three purposes for all date-related types.
	
	VALIDATION purpose tests are commented out until the test suite supports both expectedResult
	and t.failure() in the same test.

	In addition they test if the interface that the browser offers makes sense. In Safari and Chrome 
	9 it does not: clicking on the provided arrows gives you a date in the year 0 (which does not
	exist) or somewhere in the 2,760th century, which is rather useless.
	
	- ppk

*/
	dohx.add({name:"Date inputs (type=datetime)",
		mqcExecutionOrderBaseOffset:620000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				//
				// Test INTERFACE purpose for input type="datetime"
				// Spec says:
				// 		The input element represents a control for setting the element's value to a string representing a specific global date and time.
				// I know this is not a STRICT requirement though.
				//
				id:100,
				name:"Verify date input interface.",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Did you get a date and time selector (or any other special interface)?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			},
			{
				//
				// Test if the INTERFACE makes sense for input type="datetime"
				// We focus on selecting the current date and time easily, to be as objective as possible.
				//
				id:200,
				name:"Interface usability/usefullness",
				dependsOn: [100],
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				expectedResult:"Can you select the current date and time with one or two clicks?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			},
			{
				//
				// Test RESTRICTION purpose for input type="datetime"
				// Spec says:
				// 		User agents must not allow the user to set the value to a non-empty string that is not a valid global date and time string expressed in UTC
				//
				id:300,
				name:"Don't allow invalid non-empty string!",
				dependsOn: [100],
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept your input?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			}, 
			{
				//
				// Test RESTRICTION purpose for input type="datetime" with a pre-filled value
				// Spec says:
				// 		User agents must not allow the user to set the value to a non-empty string that is not a valid global date and time string expressed in UTC
				//
				id:400,
				name:"Disallow invalid value",
				dependsOn: [100],
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input400" type="datetime" /></form>');
					var e = embed.byId("_input400");
					e.value = "abc";
				}
			},
// This test case doesnt work on a device where you get a date selector (opera, bb), there is no way to enter "abc" ... is this test obsolete?
//			{
//				// Test VALIDATION purpose for input type="datetime"
//// Commented out until the test suite supports both expectedResult and t.failure()
//				id:500,
//				name:"Validation",
//				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
//				instructions:[
//					"Click 'GO'!",
//					"Enter 'abc' in the input field",
//					"Submit the form"
//				],
//				test:function(t){
//					dohx.showInfo('<form id="_form500"><input type="datetime" /><input type="submit" /></form>');
//					embed.byId("_form500").onsubmit = function(){
//						t.failure("Form should not have been submittable, but did submit.");
//						return false;
//					}
//				}
//			}
			{
				//
				//
				//
				id:600,
				name:"Disallow invalid value set as parameter",
				dependsOn: [100],
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" value="abc" /></form>');
				}
			},
//*/
		]
	});
})();
