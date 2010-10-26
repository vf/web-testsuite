(function(){
	
	var wdda = util.isObject("Widget.Device.DeviceStateInfo.AccelerometerInfo") ? Widget.Device.DeviceStateInfo.AccelerometerInfo : {};
	var intervals = [];
	
	function valuesToString(x, y, z){
		return "x=" + x + " y=" + y + " z=" + z;
	}

	// The ranges of values to expect for the initial position, this is as if the phone was laying on a table.
	var initialPosition = {
		// Make sure the values are sorted!!!
		// small, big
		x:[-0.8, 0.8],
		y:[-0.8, 0.8],
		z:[-10.5, -8.5] // we are very tolerant here, just for the nokia :( it currently ends at 8.5something, imho this range should be no more than 1) but we have test case 330 therefore
	};
	
	function waitForInitialPosition(callback){
		// summary:
		//		This method will give hints to the user how to move the phone
		//		to get it into the starting position, from where all tests start.
		var initInterval = setInterval(function(){
			wdda = Widget.Device.DeviceStateInfo.AccelerometerInfo;
			var vals = {x:wdda.xAxis, y:wdda.yAxis, z:wdda.zAxis};
			var xOk = [vals.x > initialPosition.x[0], vals.x < initialPosition.x[1]];
			var yOk = [vals.y > initialPosition.y[0], vals.y < initialPosition.y[1]];
			var zOk = [vals.z > initialPosition.z[0], vals.z < initialPosition.z[1]];
			if (xOk[0] && xOk[1] &&
				yOk[0] && yOk[1] &&
				zOk[0] && zOk[1]){
				clearInterval(initInterval);
				dohx.showInfo("Initial position - OK<br/>Follow steps listed above.");
				setTimeout(callback, 400)
			} else {
				var msgs = ["Initial position..."];
				if (!xOk[0]) msgs.push("Tilt the phone a bit to the LEFT &lt;=.");
				if (!xOk[1]) msgs.push("Tilt the phone a bit to the RIGHT =&gt;.");
				if (!yOk[0] || !yOk[1]){
					msgs.push("Move the phone FACING UPWARDS.");
//msgs.push(initialPosition.y+" ... "+vals.y);
				}
				if (!zOk[0] || !zOk[1]){
					msgs.push("Let the phone's display FACE UPWARDS.");
//msgs.push(initialPosition.z+" ... "+vals.z);
				}
				dohx.showInfo(msgs.join("<br />"));
			}
		}, 100);
		intervals.push(initInterval);
	}
	
	function checkForExpectedRange(t, axis, minValue, maxValue){
		// summary:
		// 		Check continuously if the value is in the given range.
		// t: The test object.
		// axis: "x", "y" or "z"
		// minValue: The minimum value (e.g. 8 or -9.82)
		// maxValue: The max value, e.g. (9.82 or 8)
		if (minValue>maxValue){
			var tmp = minValue;
			minValue = maxValue;
			maxValue = tmp;
		}
		var ret = setInterval(function(){
			wdda = Widget.Device.DeviceStateInfo.AccelerometerInfo;
			var vals = {x:wdda.xAxis, y:wdda.yAxis, z:wdda.zAxis}; // We HAVE TO read xAxis to "trigger" the setting of all acceleromter values.
			dohx.showInfo("Expecting range " + minValue + " ... " + maxValue + "<br/>actual value: " + vals[axis]);
			if (vals[axis] > minValue && vals[axis] < maxValue){
				t.success(axis + " value was "+ vals[axis] + " expected range "+minValue+".."+maxValue);
			}
		}, 100);
		intervals.push(ret);
	};
  
	function clearIntervals(){
		for (var i=0, l=intervals.length; i<l; i++){
			clearInterval(intervals[i]);
		}
	};

	function _setup() {
		/*
			The JIL specification defines that all accelerometer values
			are refreshed when the `x` axis is beeing queried.

			In order to get the latest sensor values, the `x` axis has to
			be read out before all other axes.
			
			Use this method as setUp() when using the accelerometer.
		*/
		var accelerometerInfo =	Widget.Device.DeviceStateInfo.AccelerometerInfo;
		return {
			x: accelerometerInfo.xAxis, // reading «xAxis« triggers refresh, always query first!
			y: accelerometerInfo.yAxis,
			z: accelerometerInfo.zAxis
		}
	};

	dohx.add({name:"AccelerometerInfo",
		mqcExecutionOrderBaseOffset:0, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo.AccelerometerInfo"],
		addIf: config.hasAccelerometer,
		tests:[
			{
				id: 100,
				name: "Is xAxis a number?",
				setUp:_setup,
				test: function(t) {
					t.assertFalse(isNaN(wdda.xAxis));
					return wdda.xAxis;
				}
			},
			{
				id: 200,
				name: "Is yAxis a number?",
				setUp:_setup,
				test: function(t) {
					t.assertFalse(isNaN(wdda.yAxis));
					return wdda.yAxis;
				}
			},
			{
				id: 300,
				name: "Is zAxis a number?",
				setUp:_setup,
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
				setUp:_setup,
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
			
			//
			//
			//
			{
				id: 320,
				name: "MUST SUCCEED. Initial position test - flat on the table.",
				instructions:[
					"Place the phone flat on the table, display facing upwards.",
					"Click 'GO'!"
				],
				setUp:_setup,
				test: function(t) {
					var vals = {x:wdda.xAxis, y:wdda.yAxis, z:wdda.zAxis};
					var xOk = vals.x > initialPosition.x[0] && vals.x < initialPosition.x[1];
					var yOk = vals.y > initialPosition.y[0] && vals.y < initialPosition.y[1];
					var zOk = vals.z > initialPosition.z[0] && vals.z < initialPosition.z[1];
					var msg = [];
					if (!xOk || !yOk || !zOk) msg.push("Successive tests might not be executable, make this test work first!");
					if (!xOk) msg.push("Expected x value to be in the range " + initialPosition.x[0] + ".." + initialPosition.x[1] + ", value is: " + vals.x);
					if (!yOk) msg.push("Expected y value to be in the range " + initialPosition.y[0] + ".." + initialPosition.y[1] + ", value is: " + vals.y);
					if (!zOk) msg.push("Expected z value to be in the range " + initialPosition.z[0] + ".." + initialPosition.z[1] + ", value is: " + vals.z);
					t.assertTrue(xOk && yOk && zOk, msg.join("<br/>"));
					return vals; // In the success case show the values.
				}
			},
			{
				id: 330,
				name: "Check tight range - flat on the table.",
				instructions:[
					"Place the phone flat on the table, display facing upwards.",
					"Make sure it's really on a flat table, may use a gauge to ensure so.",
					"This test will be very pedantic!",
					"Click 'GO'!"
				],
				setUp:_setup,
				test: function(t) {
					// Basically we expect x and y to be zero and z 9.81
					// we give it 0.4 range
					var vals = {x:wdda.xAxis, y:wdda.yAxis, z:wdda.zAxis};
					var expectedValues = {x:0, y:0, z:9.81};
					var allowedOffset = 0.2;
					var xOk = vals.x > expectedValues.x - allowedOffset && vals.x < expectedValues.x + allowedOffset;
					var yOk = vals.y > expectedValues.y - allowedOffset && vals.y < expectedValues.y + allowedOffset;
					var zOk = vals.z > expectedValues.z - allowedOffset && vals.z < expectedValues.z + allowedOffset;
					var msg = [];
					if (!xOk) msg.push("Expected x value to be in the range " + (expectedValues.x - allowedOffset) + ".." + (expectedValues.x + allowedOffset) + ", value is: " + vals.x);
					if (!yOk) msg.push("Expected y value to be in the range " + (expectedValues.y - allowedOffset) + ".." + (expectedValues.y + allowedOffset) + ", value is: " + vals.y);
					if (!zOk) msg.push("Expected z value to be in the range " + (expectedValues.z - allowedOffset) + ".." + (expectedValues.z + allowedOffset) + ", value is: " + vals.z);
					t.assertTrue(xOk && yOk && zOk, msg.join("<br/>"));
					return vals; // In the success case show the values.
				}
			},
			
			// The value, when tilting the phone right will go from 0..-9,81 and at 90¡ it will go form -9,81..0
			// So we just check if the value is smaller than -8 at some point, should catch it quite securely.
			{
				id: 400,
				name: "Tilt RIGHT, xAxis.",
				instructions: [
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, tilt phone 90 degrees to the RIGHT.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t){
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "x", 9.82, 8);
					});
				},
				tearDown:clearIntervals
			},
			{
				id: 500,
				name: "Tilt LEFT, xAxis.",
				instructions: [
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, tilt phone 90 degrees to the LEFT.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "x", -8, -9.82);
					});
				},
				tearDown:clearIntervals
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
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, tilt phone 90 degrees FORWARD.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "z", -1, 1);
					});
				},
				tearDown:clearIntervals
			},
			{
				id: 700,
				name: "Tilt BACKWARD, zAxis.",
				instructions: [
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, tilt phone 90 degrees BACKWARDS.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "z", -1, 1);
					});
				},
				tearDown:clearIntervals
			},
			{
				id: 800,
				name: "Tilt UPSIDE DOWN, zAxis.",
				instructions: [
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, hold the phone facing downwards.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "z", 8, 9.82);
					});
				},
				tearDown:clearIntervals
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
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, hold the phone facing towards you.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "y", -8, -9.82);
					});
				},
				tearDown:clearIntervals
			},
			{
				id: 1000,
				name: "Facing me upside down, yAxis.",
				instructions: [
					"Click 'Go'",
					"Move the phone to the initial position.",
					"Within 10 seconds, hold the phone facing towards you but upside down.",
				],
				timeout:11000,
				setUp:_setup,
				test: function(t) {
					waitForInitialPosition(function(){
						checkForExpectedRange(t, "y", 8, 9.82);
					});
				},
				tearDown:clearIntervals
			}
//*/
		]  
	});
})();