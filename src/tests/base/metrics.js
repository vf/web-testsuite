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
				id: 100,
				name: "Millimeters",
				expectedResult: "Please measure the width of the box with a metric ruler. Is the width exactly 3&nbsp;cm? (1&nbsp;cm = 0.3937&nbsp;in)",
				test: function(){
					dohx.showInfo('<div style="width: 3cm">' + RULER_MM_HTML + '</div>');
				}
			},
			{
				id: 200,
				name: "Inches",
				expectedResult: "Please measure the width of the box with an inch-based ruler. Is the width exactly 1&nbsp;inch? (1&nbsp;in = 2.54&nbsp cm)",
				test: function(){
					dohx.showInfo('<div style="width: 1in">' + RULER_IN_HTML + '</div>');
				}
			},
			{
				id: 300,
				name: "Font in <code>mm</code>, width in <code>em</code>",
				expectedResult: "Please measure the width of the box with a metric ruler. Is the width exactly 3&nbsp;cm? (1&nbsp;cm = 0.3937&nbsp;in)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font-size: 3mm">' + RULER_MM_HTML + '</div>');
				}
			},
			{
				id: 400,
				name: "Font in <code>in</code>, width in <code>em</code>",
				expectedResult: "Please measure the width of the box with an inch-based ruler. Is the width exactly 1&nbsp;inch? (1&nbsp;in = 2.54&nbsp cm)",
				test: function(){
					dohx.showInfo('<div style="width: 10em; font-size: 0.1in">' + RULER_IN_HTML + '</div>');
				}
			}
		]

	})

}());
