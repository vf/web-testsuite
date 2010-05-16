(function(){
	
	var wdda = util.isObject("Widget.Device.DeviceStateInfo.AccelerometerInfo") ? Widget.Device.DeviceStateInfo.AccelerometerInfo : {};
	var interval = null;
	
	function valuesToString(x, y, z){
		return "x=" + x + " y=" + y + " z=" + z;
	}
	
	function checkForExpectedRange(t, axis, minValue, maxValue){
		// summary:
		// 		Check continuously if the value is in the given range.
		// t: The test object.
		// axis: "x", "y" or "z"
		// minValue: The minimum value (e.g. 8 or -9.82)
		// maxValue: The max value, e.g. (9.82 or 8)
		var ret = setInterval(function(){
			dohx.showInfo(axis+" value is:", wdda[axis+"Axis"], "Expect: "+minValue+".."+maxValue);
			if (wdda[axis+"Axis"] > minValue && wdda[axis+"Axis"] < maxValue){
				t.success(axis + " value was "+ wdda[axis+"Axis"] + " expected range "+minValue+".."+maxValue);
			}
		}, 100);
		return ret;
	}
  
	dohx.add({name:"AccelerometerInfo",
		mqcExecutionOrderBaseOffset:0, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo.AccelerometerInfo"],
		addIf: config.hasAccelerometer,
		tests:[
			{
				id: 100,
				name: "Is xAxis a number?",
				test: function(t) {
					t.assertFalse(isNaN(wdda.xAxis));
					return wdda.xAxis;
				}
			},
			{
				id: 200,
				name: "Is yAxis a number?",
				test: function(t) {
					t.assertFalse(isNaN(wdda.yAxis));
					return wdda.yAxis;
				}
			},
			{
				id: 300,
				name: "Is zAxis a number?",
				test: function(t) {
					t.assertFalse(isNaN(wdda.zAxis));
					return wdda.zAxis;
				}
			},
			{
				id: 310,
				// This tests a fixed bug where x and z used to be equal (in Opera's Android WRT).
				name: "Verify the values for x, z and y are different.",
				instructions:[
					"Click 'GO'!",
					"Move the phone while the test is running, to generate different values."
				],
				test: function(t) {
					setTimeout(function(){
						var x = wdda.xAxis;
						var y = wdda.yAxis;
						var z = wdda.zAxis;
						t.assertTrue(x!=z);
						t.result = valuesToString(x, y, z);
					}, 1000);
				}
			},
			
			// The value, when tilting the phone right will go from 0..-9,81 and at 90¡ it will go form -9,81..0
			// So we just check if the value is smaller than -8 at some point, should catch it quite securely.
			{
				id: 400,
				name: "Tilt RIGHT, xAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, tilt phone 90 degrees to the RIGHT.",
					"Return to normal position.",
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "x", -9.82, -8);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			{
				id: 500,
				name: "Tilt LEFT, xAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, tilt phone 90 degrees to the LEFT.",
					"Return to normal position."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "x", 8, 9.82);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			//
			//	z axis
			//
			// When moving forward, so the display faces me the zvalue is 0, same when it is facing aways from me.
			// When the phone lays on the table facing display up the value is 9.82. Accordingly its -9.82
			// when facing downwards.
			{
				id: 600,
				name: "Tilt FORWARD, zAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, tilt phone 90 degrees FORWARD.",
					"Return to normal position afterwards."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "z", -1, 1);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			{
				id: 700,
				name: "Tilt BACKWARD, zAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, tilt phone 90 degrees BACKWARDS.",
					"Return to normal position afterwards."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "z", -1, 1);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			{
				id: 800,
				name: "Tilt UPSIDE DOWN, zAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, hold the phone facing downwards.",
					"Return to normal position afterwards."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "z", -9.82, -8);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			//
			//	y axis
			//
			// When the phone display is facing towards me the y axis is 9.81, if I hold it upside down, the
			// display still facing me its -9.81.
			{
				id: 900,
				name: "Facing me, yAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, hold the phone facing towards you.",
					"Return to normal position afterwards."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "y", 8, 9.82);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			},
			{
				id: 1000,
				name: "Facing me upside down, yAxis.",
				instructions: [
					"Hold the phone facing upwards.",
					"Click 'Go'",
					"Within 10 seconds, hold the phone facing towards you but upside down.",
					"Return to normal position afterwards."
				],
				timeout:11000,
				test: function(t) {
					interval = checkForExpectedRange(t, "y", -9.82, -8);
				},
				tearDown:function(){
					clearInterval(interval);
				}
			}
//*/
		]  
	});
})();