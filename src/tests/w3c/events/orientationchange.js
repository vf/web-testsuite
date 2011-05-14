(function(){
	
	eventUtil.EVENT_TYPE = "orientationchange";
	var SPEC_URL_OBJECT = "???"; // is there a spec for this???
	
	var _removeEventListener = embed.hitch(eventUtil, "removeEventListener");
	
	dohx.add({name:eventUtil.EVENT_TYPE,
		mqcExecutionOrderBaseOffset:730000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// General tests, is it available at all, etc.
			//
// ??? is there any object for orientationchange?
			//{
			//	id:100,
			//	name:"Does 'DeviceMotionEvent' object exist?",
			//	definedInSpecs:[SPEC_URL_OBJECT],
			//	test:function(t){
			//		t.assertTrue(!!window.DeviceMotionEvent);
			//	}
			//},
			{
				id:200,
				name:"Does addEventListener('orientationchange') fire at all?",
				timeout: 100,
				definedInSpecs:[SPEC_URL_OBJECT],
				test:function(t){
					eventUtil.addEventListener(function(){
						t.success(true);
					});
				},
				tearDown: _removeEventListener
			},
			{
				id:300,
				name:"Does 'window.onorientationchange' work?",
				timeout: 100,
				definedInSpecs:[SPEC_URL_OBJECT],
				test:function(t){
					window.ondevicemotion = function(e){
						t.success(embed.toJson(e));
					};
				},
				tearDown:function(){
					window.ondevicemotion = null;
				}
			},
//*/
		]
	});
})();
