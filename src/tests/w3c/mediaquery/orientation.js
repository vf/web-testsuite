(function(){
	
	function getHtmlChunk(testId){
		return '<div id="test' + testId + '">'+
					'<p class="notsupported">The device failed this test; please answer No.</p>' +
					'<p class="landscape">Mediaquery reports the device is in LANDSCAPE orientation.</p>' +
					'<p class="portrait">Mediaquery reports the device is in PORTRAIT orientation.</p>' +
				'</div>';
	}
	
	dohx.add({name:"Mediaquery orientation",
		mqcExecutionOrderBaseOffset:520000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Portrait mode",
				instructions:[
					"Move the device into PORTRAIT mode.",
					"Click 'GO'!"
				],
				test:function(t){
					dohx.showInfo(getHtmlChunk(100));
					var computedStyle = document.defaultView.getComputedStyle(embed.query("#test100 .portrait")[0], null);
					t.assertEqual("block", computedStyle.display, "portrait DIV's computedStyle wrong");
				}
			},
			{
				id:200,
				name:"Landscape mode",
				instructions:[
					"Move the device into LANDSCAPE mode.",
					"Click 'GO'!"
				],
				test:function(t){
					dohx.showInfo(getHtmlChunk(200));
					var computedStyle = document.defaultView.getComputedStyle(embed.query("#test200 .landscape")[0], null);
					t.assertEqual("block", computedStyle.display, "landscape DIV's computedStyle wrong");
				}
			},
//*/
		]
	});

})();