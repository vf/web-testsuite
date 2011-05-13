(function(){
	
	function _removeListener(){
		window.removeEventListener("batterystatus");
	}
	
	dohx.add({name:"batterystatus",
		mqcExecutionOrderBaseOffset:720000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			// General, is it available at all, etc.
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
					window.addEventListener("batterystatus", function(e){
						t.success(true);
					}, true);
				},
				tearDown:_removeListener
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
			{
				id:1000,
				name:"Does attribute 'isBattery' exist?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes"],
				test:function(t){
					window.addEventListener("batterystatus", function(e){
						t.assertTrue(e.hasOwnProperty("isBattery"));
					}, true);
				},
				tearDown:_removeListener
			},
			{
				id:1100,
				name:"Does attribute 'isCharging' exist?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes"],
				test:function(t){
					window.addEventListener("batterystatus", function(e){
						t.assertTrue(e.hasOwnProperty("isCharging"));
					}, true);
				},
				tearDown:_removeListener
			},
			{
				id:1200,
				name:"Does attribute 'level' exist?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes"],
				test:function(t){
					window.addEventListener("batterystatus", function(e){
						t.assertTrue(e.hasOwnProperty("level"));
					}, true);
				},
				tearDown:_removeListener
			},
			{
				id:1300,
				name:"Does attribute 'timeRemaining' exist?",
				dependsOn: [200],
				definedInSpecs:["http://www.w3.org/TR/2011/WD-battery-status-20110426/#attributes"],
				test:function(t){
					window.addEventListener("batterystatus", function(e){
						t.assertTrue(e.hasOwnProperty("timeRemaining"));
					}, true);
				},
				tearDown:_removeListener
			},
//*/
		]
	});
})();
