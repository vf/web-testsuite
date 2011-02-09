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
	RULER_MM_HTML =
		'<div style="height: 40px; background: #678; color: white; border: 1px solid #8dadd2; border-width: 1px 0; position: relative">' +
			'<span style="position: absolute; left: 0; border-left: 1px solid #8dadd2; height: 100%;">0</span>' +
			'<span style="position: absolute; right: 2cm; border-right: 1px solid #8dadd2; height: 100%;">1cm</span>' +
			'<span style="position: absolute; right: 1cm; border-right: 1px solid #8dadd2; height: 100%;">2cm</span>' +
			'<span style="position: absolute; right: 0; border-right: 1px solid #8dadd2; height: 100%;">3cm</span>' +
		'</div>';

	RULER_IN_HTML =
		'<div style="height: 40px; background: #678; color: white; border: 1px solid #8dadd2; border-width: 1px 0; position: relative">' +
			'<span style="position: absolute; left: 0; border-left: 1px solid #8dadd2; height: 100%;">0</span>' +
			'<span style="position: absolute; right: 0.5in; border-right: 1px solid #8dadd2; height: 100%;">0.5in</span>' +
			'<span style="position: absolute; right: 0; border-right: 1px solid #8dadd2; height: 100%;">1in</span>' +
		'</div>';




	dohx.add({
		name: "Metrics",
		mqcExecutionOrderBaseOffset:370000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects: [],
		tests: [
			{
				id: 1,
				name: "Instructions",
				instructions: [
						"This series of tests checks whether physical lengths are displayed correctly on the device.",
						"You will need a ruler to measure objects on the screen.",
						"For each test, please check whether the size of the box displayed matches the expected result."
					].join("<br><br>"),
				test: function(t){
					t.success()
				}
			},
			{
				id: 100,
				name: "Millimeters",
				instructions: "This test displays a box with <code>width</code> set to <code>3cm</code>. <br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width of the box exactly 3&nbsp;cm? (1&nbsp;cm = 0.3937&nbsp;in)",
				test: function(){
					dohx.showInfo('<div style="width: 3cm">' + RULER_MM_HTML + '</div>');
				}
			},
			{
				id: 200,
				name: "Inches",
				instructions: "This test displays a box with <code>width</code> set to <code>1in</code>. <br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width of the box exactly 1&nbsp;inch? (1&nbsp;in = 2.54&nbsp cm)",
				test: function(){
					dohx.showInfo('<div style="width: 1in">' + RULER_IN_HTML + '</div>');
				}
			},
			{
				id: 300,
				name: "Font in <code>mm</code>, width in <code>em</code>",
				instructions: "This test displays a box with <code>width:10 em; font-size: 3mm;</code>.<br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width of the box exactly 3&nbsp;cm? (1&nbsp;cm = 0.3937&nbsp;in)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font-size: 3mm">' + RULER_MM_HTML + '</div>');
				}
			},
			{
				id: 400,
				name: "Font in <code>in</code>, width in <code>em</code>",
				instructions: "This test displays a box with <code>width:10 em; font-size: 0.1in;</code>.<br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width of the box exactly 1&nbsp;inch? (1&nbsp;in = 2.54&nbsp cm)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font-size: 0.1in">' + RULER_IN_HTML + '</div>');
				}
			},
			{
				id: 500,
				name: "Font in <code>mm</code> (CSS shorthand syntax), width in <code>em</code>",
				instructions: "This test displays a box with <code>width: 10em; font: 3mm/1.5 sans-serif;</code> to test the <code>font</code> shorthand syntax.<br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width of the box exactly 3&nbsp;cm? (1&nbsp;cm = 0.3937&nbsp;in)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font: 3mm/1.5 sans-serif">' + RULER_MM_HTML + '</div>');
				}
			},
			{
				id: 600,
				name: "Font in <code>in</code> (CSS shorthand syntax), width in <code>em</code>",
				instructions: "This test displays a box with <code>width: 10em; font: 0.1in/1.5 sans-serif;</code> to test the <code>font</code> shorthand syntax.<br><br>Please measure the width with the ruler.",
				expectedResult: "Is the width exactly 1&nbsp;inch? (1&nbsp;in = 2.54&nbsp cm)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font: 0.1in/1.5 sans-serif">' + RULER_IN_HTML + '</div>');
				}
			}
		]

	})

}());
