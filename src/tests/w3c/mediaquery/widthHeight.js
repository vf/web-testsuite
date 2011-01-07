(function(){
	
	function makeTest(t, testProperty, expectedValue){
		var mq = '@media (min-' + testProperty + ': ' + expectedValue + 'px) and (max-' + testProperty + ': ' + (expectedValue+1) + 'px) '+
					'{ .widthHeightTest {display:none;} }';
		dohx.showInfo('<div class="widthHeightTest">should not be visible</div>' +
					  '<style type="text/css">' + mq + '</style>'+
					  '');
		var computedStyle = document.defaultView.getComputedStyle(embed.query(".widthHeightTest")[0], null);
		t.assertEqual("none", computedStyle.display, "media query didnt catch (media query: '" + mq + "')");
		return mq;
	}
	
	dohx.add({name:"Mediaquery widthHeight",
		mqcExecutionOrderBaseOffset:530000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Preconditions",
				instructions:[
					"Hold the device in PORTRAIT mode!",
					"For the next tests hold the device in PORTRAIT mode (until told otherwise)!",
					"Click 'GO'!"
				],
				test:function(t){
					t.success("User confirmed phone is in portrait mode.");
				}
			},
			{
				id:200,
				name:"Portrait mode, check min/max-width",
				test:function(t){
					return makeTest(t, "width", window.innerWidth);
				}
			},
			{
				id:300,
				name:"Portrait mode, check min/max-height",
				test:function(t){
					return makeTest(t, "height", window.innerHeight);
				}
			},
			{
				id:400,
				name:"Portrait mode, check min/max-device-width",
				test:function(t){
					return makeTest(t, "device-width", window.screen.width);
				}
			},
			{
				id:500,
				name:"Portrait mode, check min/max-device-height",
				test:function(t){
					return makeTest(t, "device-height", window.screen.height);
				}
			},
			
			
			{
				id:1100,
				name:"Preconditions",
				instructions:[
					"Hold the device in LANDSCAPE mode!",
					"For the next tests hold the device in LANDSCAPE mode (until told otherwise)!",
					"Click 'GO'!"
				],
				test:function(t){
					t.success("User confirmed phone is in landscape mode.");
				}
			},
			{
				id:1200,
				name:"Landscape mode, check min/max-width",
				test:function(t){
					return makeTest(t, "width", window.innerWidth);
				}
			},
			{
				id:1300,
				name:"Landscape mode, check min/max-height",
				test:function(t){
					return makeTest(t, "height", window.innerHeight);
				}
			},
			{
				id:1400,
				name:"Landscape mode, check min/max-device-width",
				test:function(t){
					return makeTest(t, "device-width", window.screen.width);
				}
			},
			{
				id:1500,
				name:"Landscape mode, check min/max-device-height",
				test:function(t){
					return makeTest(t, "device-height", window.screen.height);
				}
			}
//*/
		]
	});

})();