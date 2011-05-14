(function(){
	
	eventUtil.EVENT_TYPE = "deviceorientation";
	var SPEC_URL_OBJECT = "http://dev.w3.org/geo/api/spec-source-orientation.html#device_orientation_event";
	
	var _removeEventListener = embed.hitch(eventUtil, "removeEventListener");
	
	dohx.add({name:eventUtil.EVENT_TYPE,
		mqcExecutionOrderBaseOffset:710000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// General tests, is it available at all, etc.
			//
			{
				id:100,
				name:"Does 'DeviceOrientationEvent' object exist?",
				definedInSpecs:["http://dev.w3.org/geo/api/spec-source-orientation.html#device_orientation_event"],
				test:function(t){
					t.assertTrue(!!window.DeviceOrientationEvent);
				}
			},
			{
				id:200,
				name:"Does addEventListener('deviceorientation') fire at all?",
				timeout: 100,
				definedInSpecs:["http://dev.w3.org/geo/api/spec-source-orientation.html"],
				test:function(t){
					eventUtil.addEventListener(function(){
						t.success(true);
					});
				},
				tearDown: _removeEventListener
			},
			{
				id:300,
				name:"Does 'window.ondeviceorientation' work?",
				timeout: 100,
				definedInSpecs:["http://dev.w3.org/geo/api/spec-source-orientation.html"],
				test:function(t){
					window.ondeviceorientation = function(e){
						t.success(true);
					};
				},
				tearDown:function(){
					window.ondeviceorientation = null;
				}
			},
			
			//
			// attributes
			//
			eventUtil.getPropertyExistTest({id: 1000, name: "alpha", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 1100, name: "alpha", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getRangeTest({id: 1200, name: "alpha", dependsOn: [200], range:[-90, 90], specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 2000, name: "beta", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 2100, name: "beta", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getRangeTest({id: 2200, name: "beta", dependsOn: [200], range:[-90, 90], specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 3000, name: "gamma", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 3100, name: "gamma", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getRangeTest({id: 3200, name: "gamma", dependsOn: [200], range:[-90, 90], specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 4000, name: "absolute", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 4100, name: "absolute", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 5000, name: "compassCalibrated", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 5100, name: "compassCalibrated", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_OBJECT]}),
			
			//
			// real tests
			//
			{
				id:6000,
				name:"Initial position?",
				definedInSpecs:["http://dev.w3.org/geo/api/spec-source-orientation.html"],
				instructions:[
					"Click 'GO'!",
					"Place the phone 1) flat on the table 2) pointing north!"
				],
				test:function(t){
					eventUtil.addEventListener(function(e){
						dohx.showInfo("alpha: " + e.alpha + "<br />beta: " + e.beta + "<br />gamma: " + e.gamma);
					});
				},
				tearDown: _removeEventListener
			},
			
// TODO let user move device a bit, to find out that the value is always in range

//*/
		]
	});
})();
