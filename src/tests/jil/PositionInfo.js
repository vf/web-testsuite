(function(){
	var wd = util.isObject("Widget.Device") ? Widget.Device : {};
	var wdd = util.isObject("DeviceStateInfo", wd) ? wd.DeviceStateInfo : {};
	var positionProperties = ["accuracy", "altitude", "altitudeAccuracy", "cellID", "latitude", "longitude", "timeStamp"];
	var locationTimeouts = config.geolocation.timeouts;
	
	function showPosInfo(posInfo){
		var ret = [];
		for (var i=0, l=positionProperties.length; i<l; i++){
			var p = positionProperties[i];
			ret.push(p+": "+util.toJson(posInfo[p]));
		}
		return ret.join(", ");
	}
	
	var _fastestMethod = config.geolocation.supportsCellId ? "cellid" : (config.geolocation.supportsAgps ? "agps" : "gps");
	
	dohx.add({name:"PositionInfo",
		mqcExecutionOrderBaseOffset:210000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo"],
		tests:[
			//
			// Preconditions
			//
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure you have good GPS reception (best done outside).",
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			},
			{
				id:100,
				name:"Widget.Device.DeviceStateInfo.onPositionRetrieved - Verify that callback fires.",
				addIf:config.geolocation.supportsCellId || config.geolocation.supportsGps || config.geolocation.supportsAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO', to retreive your location.",
//fails now, didnt in v1.2
				timeout:locationTimeouts.gps,
				test:function(t){
					wdd.onPositionRetrieved = function(posInfo, method){
						t.success("Callback fired.");
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo(_fastestMethod);
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},
			{
				id:200,
				name:"requestPositionInfo('cellid') - Verify return value is of type 'PositionInfo'.",
				addIf:config.geolocation.supportsCellId,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:locationTimeouts.cellId,
				test:function(t){
					wdd.onPositionRetrieved = function(posInfo, method){
						t.assertTrue(posInfo instanceof wd.PositionInfo);
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo("cellid");
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},
			{
				id:300,
				name:"requestPositionInfo('gps') - Verify return value is of type 'PositionInfo'.",
				addIf:config.geolocation.supportsGps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:locationTimeouts.gps,
				test:function(t){
					wdd.onPositionRetrieved = function(posInfo, method){
						t.assertTrue(posInfo instanceof wd.PositionInfo);
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo("gps");
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},
			{
				id:400,
				name:"requestPositionInfo('agps') - Verify return value is of type 'PositionInfo'.",
				addIf:config.geolocation.supportsAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:locationTimeouts.agps,
				test:function(t){
					wdd.onPositionRetrieved = function(posInfo, method){
						t.assertTrue(posInfo instanceof wd.PositionInfo);
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo("agps");
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},
			{
				id:500,
				name:"requestPositionInfo - Let user verify position.",
				addIf:config.geolocation.supportsCellId || config.geolocation.supportsGps || config.geolocation.supportsAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO', to retreive your location.",
				expectedResult:"Is the above your current position?",
				timeout:locationTimeouts.gps,
				test:function(t){
					dohx.showInfo('Retreiving coordinates...');
					// Find most accurate available method to get position.
					var method = config.geolocation.supportsGps ? "gps" : (config.geolocation.supportsAgps ? "agps" : "cellid");
					// Get the position.
					wdd.onPositionRetrieved = function(posInfo){
						var latLng = posInfo.latitude + "," + posInfo.longitude;
						var url = "http://maps.google.com/staticmap?center="+latLng+"&zoom=16&size=500x500&maptype=mobile\&markers="+latLng;
						dohx.showInfo('lat, lng:'+ latLng +'<br /><img src="'+url+'" />');
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo(method);
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},{
				id:600,
				name:"requestPositionInfo - Verify properties of returned 'PositionInfo' object.",
				addIf:config.geolocation.supportsCellId || config.geolocation.supportsGps || config.geolocation.supportsAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				timeout:locationTimeouts.gps,
				test:function(t){
					// Get the position.
					wdd.onPositionRetrieved = function(posInfo){
						var check = util.checkProperties(posInfo, positionProperties);
						t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "! (Return value was: "+util.toJson(posInfo)+")");
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo(_fastestMethod);
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
//			},{
//				id:700,
//				name:"requestPositionInfo - Verify types of properties of returned 'PositionInfo' object.",
//				addIf:config.geolocation.supportsCellId || config.geolocation.supportsGps || config.geolocation.supportsAgps,
//				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
//				//timeout:30 * 1000, // Wait max. 10sec.
//				test:function(t){
//throw new Error("TODO to implement");
//				}
			}
		]
	});
})();
