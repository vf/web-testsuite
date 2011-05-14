(function(){
	
	eventUtil.EVENT_TYPE = "batterystatus";
	var SPEC_URL_ATTRIBUTES = "http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes";
	var _removeEventListener = embed.hitch(eventUtil, "removeEventListener");
	
	dohx.add({name:eventUtil.EVENT_TYPE,
		mqcExecutionOrderBaseOffset:720000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// General tests, is it available at all, etc.
			//
			{
				id:100,
				name:"Does 'BatteryStatusEvent' object exist?",
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#batterystatusevent-interface"],
				test:function(t){
					t.assertTrue(!!window.BatteryStatusEvent);
				}
			},
			{
				id:200,
				name:"Does addEventListener('batterystatus') fire at all?",
				timeout: 100,
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes"],
				test:function(t){
					eventUtil.addEventListener(function(e){
						t.success(true);
					});
				},
				tearDown: _removeEventListener
			},
			{
				id:300,
				name:"Does 'window.onbatterystatus' work?",
				timeout: 100,
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#the-batterystatus---------event"],
				test:function(t){
					window.onbatterystatus = function(e){
						t.success(true);
					};
				},
				tearDown:function(){
					window.onbatterystatus = null;
				}
			},
			
			
			//
			//	attributes
			//
			eventUtil.getPropertyExistTest({id: 1000, name: "isBattery", dependsOn: [200], specs:[SPEC_URL_ATTRIBUTES]}),
			eventUtil.getPropertyTypeTest({id: 1100, name: "isBattery", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_ATTRIBUTES]}),
			
			eventUtil.getPropertyExistTest({id: 1200, name: "isCharging", dependsOn: [200], specs:[SPEC_URL_ATTRIBUTES]}),
			eventUtil.getPropertyTypeTest({id: 1300, name: "isCharging", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_ATTRIBUTES]}),
			
			eventUtil.getPropertyExistTest({id: 1400, name: "level", dependsOn: [200], specs:[SPEC_URL_ATTRIBUTES]}),
			eventUtil.getPropertyTypeTest({id: 1500, name: "level", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_ATTRIBUTES]}),
			eventUtil.getRangeTest({id: 1600, name: "level", dependsOn: [200], range:[0, 100], specs:[SPEC_URL_ATTRIBUTES]}),
			
			eventUtil.getPropertyExistTest({id: 1700, name: "timeRemaining", dependsOn: [200], specs:[SPEC_URL_ATTRIBUTES]}),
			eventUtil.getPropertyTypeTest({id: 1800, name: "timeRemaining", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_ATTRIBUTES]}),
			
			//
			// isCharging
			//
			{
				id:2000,
				name:"Is 'isCharging' true after plugging in power?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#methods"],
				instructions:[
					"Unplug the power charger of your device!",
					"Click 'GO'!",
					"Plug in the power charger, the event should fire."
				],
				test:function(t){
					eventUtil.addEventListener(function(e){
						t.assertTrue(e.isCharging);
					});
				},
				tearDown: _removeEventListener
			},
			{
				id:2100,
				name:"Is 'isCharging' false after unplugging the power?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#methods"],
				instructions:[
					"Plug in in the power charger!",
					"Click 'GO'!",
					"Unplug the charger, event should fire.",
				],
				test:function(t){
					eventUtil.addEventListener(function(e){
						t.assertFalse(e.isCharging);
					});
				},
				tearDown: _removeEventListener
			},
			
			//
			// level
			//
			{
				id:3000,
				name:"Is the level correct?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#methods"],
				expectedResult: "Is the battery level correct?",
				test:function(t){
					eventUtil.addEventListener(function(e){
						dohx.showInfo("API reports battery level: " + e.level + "%");
					});
				},
				tearDown: _removeEventListener
			},
			{
				//
				//	"User Agents should dispatch a BatteryStatusEvent event when level varies by a 1% or more."
				//
				id:3100,
				name:"Does the battery level increase?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#methods"],
				instructions:[
					"Make sure the battery is LESS THAN 100% charged.",
					"Plug in the power charger!",
					"Click 'GO'!",
					"Wait ... (times out after 30min)"
				],
				timeout: 30 * 60 * 1000, // Wait for 10 minutes.
				test:function(t){
					var oldData = null;
					eventUtil.addEventListener(function(e){
						if (oldData === null){
							// Store the initial level when coming in here the first time.
							oldData = e;
						} else {
							// Check if another property has changed, then the event might not have fired because
							// "level" has changed.
							if (e.isCharging==oldData.isCharging && e.isBattery==oldData.isBattery && e.timeRemaining==oldData.timeRemaining){
								// The level must have changed, since no other property has changed.
								t.assertTrue(e.level > oldData.level);
							} else {
								if (e.level > oldData.level){
									t.success(true);
								}
								// If we get here, the level didnt change :(, we allow another trigger of this callback, we just
								// fail when the test times out.
							}
						}
					});
				},
				tearDown: _removeEventListener
			},
			{
				//
				//	"User Agents should dispatch a BatteryStatusEvent event when level varies by a 1% or more."
				//
				id:3200,
				name:"Does the battery level decrease?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#methods"],
				instructions:[
					"Make sure the battery is MORE THAN 0% charged.",
					"Unplug the power charger!",
					"Click 'GO'!",
					"Wait ... (times out after 30min)"
				],
				timeout: 30 * 60 * 1000, // Wait for 10 minutes.
				test:function(t){
					var oldData = null;
					eventUtil.addEventListener(function(e){
						if (oldData === null){
							// Store the initial level when coming in here the first time.
							oldData = e;
						} else {
							// Check if another property has changed, then the event might not have fired because
							// "level" has changed.
							if (e.isCharging==oldData.isCharging && e.isBattery==oldData.isBattery && e.timeRemaining==oldData.timeRemaining){
								// The level must have changed, since no other property has changed.
								t.assertTrue(e.level < oldData.level);
							} else {
								if (e.level < oldData.level){
									t.success(true);
								}
								// If we get here, the level didnt change :(, we allow another trigger of this callback, we just
								// fail when the test times out.
							}
						}
					});
				},
				tearDown: _removeEventListener
			},
			
//*/
		]
	});
})();
