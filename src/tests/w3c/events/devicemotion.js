(function(){
	
	eventUtil.EVENT_TYPE = "devicemotion";
	var SPEC_URL_OBJECT = "http://dev.w3.org/geo/api/spec-source-orientation.html#motion_event";
	
	var _removeEventListener = embed.hitch(eventUtil, "removeEventListener");
	
	dohx.add({name:eventUtil.EVENT_TYPE,
		mqcExecutionOrderBaseOffset:740000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// General tests, is it available at all, etc.
			//
			{
				id:100,
				name:"Does 'DeviceMotionEvent' object exist?",
				definedInSpecs:[SPEC_URL_OBJECT],
				test:function(t){
					t.assertTrue(!!window.DeviceMotionEvent);
				}
			},
			{
				id:200,
				name:"Does addEventListener('devicemotion') fire at all?",
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
				name:"Does 'window.ondevicemotion' work?",
				timeout: 100,
				definedInSpecs:[SPEC_URL_OBJECT],
				test:function(t){
					window.ondevicemotion = function(e){
						t.success(true);
					};
				},
				tearDown:function(){
					window.ondevicemotion = null;
				}
			},
			
			//
			// attributes
			// 		event.acceleration, event.accelerationIncludingGravity,
			//		event.rotationRate and event.interval
			eventUtil.getPropertyExistTest({id: 1000, name: "acceleration", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 1100, name: "acceleration", dependsOn: [200], expectedType: "object", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 1200, name: "acceleration.x", dependsOn: [1100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 1300, name: "acceleration.x", dependsOn: [1100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 1400, name: "acceleration.y", dependsOn: [1100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 1500, name: "acceleration.y", dependsOn: [1100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 1600, name: "acceleration.z", dependsOn: [1100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 1700, name: "acceleration.z", dependsOn: [1100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 2000, name: "accelerationIncludingGravity", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 2100, name: "accelerationIncludingGravity", dependsOn: [200], expectedType: "object", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 2200, name: "accelerationIncludingGravity.x", dependsOn: [2100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 2300, name: "accelerationIncludingGravity.x", dependsOn: [2100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 2400, name: "accelerationIncludingGravity.y", dependsOn: [2100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 2500, name: "accelerationIncludingGravity.y", dependsOn: [2100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 2600, name: "accelerationIncludingGravity.z", dependsOn: [2100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 2700, name: "accelerationIncludingGravity.z", dependsOn: [2100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 3000, name: "rotationRate", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 3100, name: "rotationRate", dependsOn: [200], expectedType: "object", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 3200, name: "rotationRate.alpha", dependsOn: [3100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 3300, name: "rotationRate.alpha", dependsOn: [3100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 3400, name: "rotationRate.beta", dependsOn: [3100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 3500, name: "rotationRate.beta", dependsOn: [3100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyExistTest({id: 3600, name: "rotationRate.gamma", dependsOn: [3100], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 3700, name: "rotationRate.gamma", dependsOn: [3100], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			
			eventUtil.getPropertyExistTest({id: 4000, name: "interval", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			eventUtil.getPropertyTypeTest({id: 4100, name: "interval", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			
			//
			// Do some real tests now!
			//
//*/
		]
	});
})();
