(function(){
	
	var EVENT_TYPE = "deviceorientation";
	var SPEC_URL_OBJECT = "http://dev.w3.org/geo/api/spec-source-orientation.html#device_orientation_event";
	
	var _f;
	function _removeListener(){
		window.removeEventListener(EVENT_TYPE, _f, true);
	}
	
	function _getPropertyExistTest(obj){
		// Returns a test object that can be passed into dohx.add().
		// This funcitons is for convinience to make writing property-exists tests less verbose.
		var ret = {
			id: obj.id,
			name: "Does attribute '" + obj.name + "' exist?",
			definedInSpecs: obj.specs,
			test:function(t){
				_f = function(e){
					t.assertTrue(e.hasOwnProperty(obj.name));
					t.result = "" + e[obj.name]; // Show the value to the user too. (It's always nice to see details :).)
				};
				window.addEventListener(EVENT_TYPE, _f, true);
			},
			tearDown:_removeListener
		};
		if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
		return ret;
	}
	
	function _getPropertyTypeTest(obj){
		// Returns a test object that can be passed into dohx.add().
		// This functons is for convinience to make writing property-type checks tests less verbose.
		var ret = {
			id: obj.id,
			name: "Is attribute '" + obj.name + "' of type '" + obj.expectedType + "'?",
			definedInSpecs: obj.specs,
			test:function(t){
				_f = function(e){
					// If the value is null its ok too, this is allowed by spec.
					if (e[obj.name] === null){
						t.success("Value is 'null', which is valid too.");
						return;
					}
					t.assertEqual(obj.expectedType, typeof e[obj.name]);
				};
				window.addEventListener(EVENT_TYPE, _f, true);
			},
			tearDown:_removeListener
		};
		if (obj.dependsOn) ret.dependsOn = obj.dependsOn;
		return ret;
	}
	
	dohx.add({name:"deviceorientation",
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
					_f = function(e){ t.success(true); }
					window.addEventListener(EVENT_TYPE, _f , true);
				},
				tearDown:_removeListener
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
			_getPropertyExistTest({id: 1000, name: "alpha", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			_getPropertyTypeTest({id: 1100, name: "alpha", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			_getPropertyExistTest({id: 1200, name: "beta", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			_getPropertyTypeTest({id: 1300, name: "beta", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			_getPropertyExistTest({id: 1400, name: "gamma", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			_getPropertyTypeTest({id: 1500, name: "gamma", dependsOn: [200], expectedType: "number", specs:[SPEC_URL_OBJECT]}),
			_getPropertyExistTest({id: 1600, name: "absolute", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			_getPropertyTypeTest({id: 1700, name: "absolute", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_OBJECT]}),
			_getPropertyExistTest({id: 1800, name: "compassCalibrated", dependsOn: [200], specs:[SPEC_URL_OBJECT]}),
			_getPropertyTypeTest({id: 1900, name: "compassCalibrated", dependsOn: [200], expectedType: "boolean", specs:[SPEC_URL_OBJECT]}),
			
			//
			// real tests
			//
			{
				id:3000,
				name:"Initial position?",
				definedInSpecs:["http://dev.w3.org/geo/api/spec-source-orientation.html"],
				instructions:[
					"Click 'GO'!",
					"Place the phone 1) flat on the table 2) pointing north!"
				],
				test:function(t){
					window.ondeviceorientation = function(e){
						dohx.showInfo("alpha: " + e.alpha + "<br />beta: " + e.beta + "<br />gamma: " + e.gamma);
					};
				},
				tearDown:function(){
					window.ondeviceorientation = null;
				}
			},

//*/
		]
	});
})();
