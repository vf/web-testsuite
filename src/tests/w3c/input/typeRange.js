(function(){

	dohx.add({name:"Range inputs (type=range)",
		mqcExecutionOrderBaseOffset:680000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				summary:"Range slides/interface available?",
				description: "Test if a UI component is available at all.\
					Spec says:\
						The input element represents a control for setting the element's value to a string representing a number",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#range-state"],
				expectedResult:"Did you get a range control (i.e. a slider)?",
				test:function(t){
					dohx.showInfo('<form><input type=range /></form>');
				}
			},
			{
				id:200,
				summary:"Three values selectable?",
				dependsOn: [100],
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#range-state"],
				instrutions:[
					'Click "GO"!',
					'Change the slider from left to right.'
				],
				expectedResult:"Are only three values selectable?",
				test:function(t){
					dohx.showInfo("<form><input type=range step=1 max=3 min=1 value=1 /></form>");
				}
			},
			{
				id:300,
				summary:"Does the initial value get rounded properly (from 0.5 to 2)?",
				dependsOn: [100],
				description:"Verify the auto-correction of the initial value.\
					Spec says:\
						When the element is suffering from a step mismatch, the user agent must round the element's\
						value to the nearest number for which the element would not suffer from a step mismatch,\
						and which is greater than or equal to the minimum, and, if the maximum is not less than\
						the minimum, which is less than or equal to the maximum.",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#range-state"],
				test:function(t){
					dohx.showInfo('<input id="_input300" type="range" min=2 value=0.5 />');
					var node = embed.byId("_input300");
					t.assertEqual(2, node.value);
					return node.value;
				}
			},
			{
				id:400,
				dependsOn: [100],
				summary:"Does the initial value get rounded properly inside a range (from 1.5 to 2)?",
				description:"If the min=0, step=1 then a value of 1.5 should be rounded to 2.\
					Verify the auto-correction of the initial value.\
					Spec says:\
						When the element is suffering from a step mismatch, the user agent must round the element's\
						value to the nearest number for which the element would not suffer from a step mismatch,\
						and which is greater than or equal to the minimum, and, if the maximum is not less than\
						the minimum, which is less than or equal to the maximum.",
				definedInSpecs:["http://www.w3.org/TR/html5/number-state.html#range-state"],
				test:function(t){
					dohx.showInfo('<input id="_input400" type="range" step=1 min=0 value=1.5 />');
					var node = embed.byId("_input400");
					t.assertEqual(2, node.value);
				}
			},
//*/
		]
	});
})();
