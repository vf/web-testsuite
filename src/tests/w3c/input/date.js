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



	dohx.add({name:"Date inputs",
		mqcExecutionOrderBaseOffset:600000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
		{

				/*
					Test INTERFACE purpose for input type="date"
				*/

				id:100,
				name:"Date type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="date" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="date"
				*/
		
				id:200,
				name:"Date type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-state"],
				expectedResult:"Can you use the interface to easily select a date in the current year? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="date" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="date"
				*/

				id:300,
				name:"Date type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="date" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="date" with a pre-filled value
				*/

				id:400,
				name:"Date type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input400" type="date" /></form>');
					var e = embed.byId("_input400");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="date"
					Commented out until the test suite supports both expectedResult and t.failure()
				

				id:500,
				name:"Date type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form500"><input type="date" /><input type="submit" /></form>');
					embed.byId("_form500").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{
				/*
					Test INTERFACE purpose for input type="datetime"
				*/

				id:600,
				name:"Datetime type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="datetime"
				*/
		
				id:700,
				name:"Datetime type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				expectedResult:"Can you use the interface to easily select a date and time in the current year? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			},

				/*
					Test RESTRICTION purpose for input type="datetime"
				*/

		{
				id:800,
				name:"Datetime type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="datetime" with a pre-filled value
				*/

				id:900,
				name:"Datetime type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input900" type="datetime" /></form>');
					var e = embed.byId("_input900");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="datetime"
					Commented out until the test suite supports both expectedResult and t.failure()

				id:1000,
				name:"Datetime type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form1000"><input type="datetime" /><input type="submit" /></form>');
					embed.byId("_form1000").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{
				/*
					Test INTERFACE purpose for input type="month"
				*/

				id:1100,
				name:"Month type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#month-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="month" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="month"
				*/
		
				id:1200,
				name:"Month type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#month-state"],
				expectedResult:"Can you use the interface to easily select a month in the current year? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="month" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="month"
				*/

				id:1300,
				name:"Month type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#month-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="month" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="month" with a pre-filled value
				*/

				id:1400,
				name:"Month type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#month-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input1400" type="month" /></form>');
					var e = embed.byId("_input1400");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="month"
					Commented out until the test suite supports both expectedResult and t.failure()

				id:1500,
				name:"Month type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#month-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form1500"><input type="month" /><input type="submit" /></form>');
					embed.byId("_form1500").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{
				/*
					Test INTERFACE purpose for input type="week"
				*/

				id:1600,
				name:"Week type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#week-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="week" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="week"
				*/
		
				id:1700,
				name:"Week type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#week-state"],
				expectedResult:"Can you use the interface to easily select a week in the current year? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="week" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="week"
				*/

				id:1800,
				name:"Week type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#week-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="week" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="week" with a pre-filled value
				*/

				id:1900,
				name:"Week type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#week-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input1900" type="week" /></form>');
					var e = embed.byId("_input1900");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="week"
					Commented out until the test suite supports both expectedResult and t.failure()

				id:2000,
				name:"Week type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#week-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form2000"><input type="week" /><input type="submit" /></form>');
					embed.byId("_form2000").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
				/*
					Test INTERFACE purpose for input type="time"
				*/

		{
				id:2100,
				name:"Time type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#time-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="time" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="time"
				*/
		
				id:2200,
				name:"Time type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#time-state"],
				expectedResult:"Can you use the interface to easily select a time? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="time" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="time"
				*/

				id:2300,
				name:"Time type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="time" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="time" with a pre-filled value
				*/

				id:2400,
				name:"Time type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#time-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input2400" type="time" /></form>');
					var e = embed.byId("_input2400");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="time"
					Commented out until the test suite supports both expectedResult and t.failure()

				id:2500,
				name:"Time type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form2500"><input type="time" /><input type="submit" /></form>');
					embed.byId("_form2500").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
		{
				/*
					Test INTERFACE purpose for input type="datetime-local"
				*/

				id:2600,
				name:"Datetime local type - interface",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#local-date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Click the input element."
				],
				expectedResult:"Does the input field have special interface features, such as a calendar or arrow buttons?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime-local" /></form>');
				}
			},
		{
		
				/*
					Test if the INTERFACE makes sense for input type="datetime-local"
				*/
		
				id:2700,
				name:"Datetime local type - interface use",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#local-date-and-time-state"],
				expectedResult:"Can you use the interface to easily select a date in the current year? (If there is no interface, answer 'No'.)",
				test:function(t){
					dohx.showInfo('<form><input type="datetime-local" /></form>');
				}
			},
		{

				/*
					Test RESTRICTION purpose for input type="datetime-local"
				*/

				id:2800,
				name:"Datetime local type - input restriction",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#local-date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field"
				],
				expectedResult:"Does the input field NOT accept them?",
				test:function(t){
					dohx.showInfo('<form><input type="datetime-local" /></form>');
				}
			}, 
		{

				/*
					Test RESTRICTION purpose for input type="datetime-local" with a pre-filled value
				*/

				id:2900,
				name:"Datetime local type - wrong default value",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#local-date-and-time-state"],
				expectedResult: "Do you NOT see 'abc' in the field?",
				test:function(t){
					dohx.showInfo('<form><input  id="_input2900" type="datetime-local" /></form>');
					var e = embed.byId("_input2900");
					e.value = "abc";
				}
			},
		/*{

					Test VALIDATION purpose for input type="datetime-local"
					Commented out until the test suite supports both expectedResult and t.failure()

				id:3000,
				name:"Datetime local type - validation",
				definedInSpecs:["http://www.w3.org/TR/html5/states-of-the-type-attribute.html#local-date-and-time-state"],
				instructions:[
					"Click 'GO'!",
					"Enter 'abc' in the input field",
					"Submit the form"
				],
				test:function(t){
					dohx.showInfo('<form id="_form3000"><input type="datetime-local" /><input type="submit" /></form>');
					embed.byId("_form3000").onsubmit = function(){
						t.failure("Form should not have been submittable, but did submit.");
						return false;
					}
				}
			},*/
//*/
		]
	});
})();
