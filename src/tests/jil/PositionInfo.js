(function(){
	var wd = util.isObject("Widget.Device") ? Widget.Device : {},
		wdd = util.isObject("DeviceStateInfo", wd) ? wd.DeviceStateInfo : {},
		positionProperties = ["accuracy", "altitude", "altitudeAccuracy", "cellID", "latitude", "longitude", "timeStamp"];
	
	function showPosInfo(posInfo){
		var ret = [];
		for (var i=0, l=positionProperties.length; i<l; i++){
			var p = positionProperties[i];
			ret.push(p+": "+util.toJson(posInfo[p]));
		}
		return ret.join(", ");
	}
	
	dohx.add({name:"PositionInfo",
		mqcExecutionOrderBaseOffset:210000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo"],
		tests:[
			{
				id:100,
				name:"Widget.Device.DeviceStateInfo.onPositionRetrieved - Verify that callback fires.",
				addIf:config.canGetPositionByCellid || config.canGetPositionByGps || config.canGetPositionByAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO', to retreive your location.",
				timeout:30 * 1000,
				test:function(t){
					wdd.onPositionRetrieved = function(posInfo, method){
						t.success("Callback fired.");
						t.result = showPosInfo(posInfo);
					};
					var method = config.canGetPositionByGps ? "gps" : (config.canGetPositionByAgps ? "agps" : "cellid");
					wdd.requestPositionInfo(method);
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
			},{
				id:200,
				name:"requestPositionInfo('cellid') - Verify return value is of type 'PositionInfo'.",
				addIf:config.canGetPositionByCellid,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:10 * 1000,
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
			},{
				id:300,
				name:"requestPositionInfo('gps') - Verify return value is of type 'PositionInfo'.",
				addIf:config.canGetPositionByGps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:60 * 1000,
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
			},{
				id:400,
				name:"requestPositionInfo('agps') - Verify return value is of type 'PositionInfo'.",
				addIf:config.canGetPositionByAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO' to get position!",
				timeout:30 * 1000,
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
			},{//*/
				id:500,
				name:"requestPositionInfo - Let user verify position.",
				addIf:config.canGetPositionByCellid || config.canGetPositionByGps || config.canGetPositionByAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				instructions:"Click 'GO', to retreive your location.",
//// TODO  ... the following is not too cool, but this way we can make the user confirm the data.
				expectedResult:"Is the above your current position?",
				timeout:30 * 1000,
				test:function(t){
					dohx.showInfo('Retreiving coordinates...');
					// Find most accurate available method to get position.
					var method = config.canGetPositionByGps ? "gps" : (config.canGetPositionByAgps ? "agps" : "cellid");
					// Get the position.
					wdd.onPositionRetrieved = function(posInfo){
						var latLng = posInfo.latitude + "," + posInfo.longitude;
						var url = "http://maps.google.com/staticmap?center="+latLng+"&zoom=16&size=250x100&maptype=mobile\&markers="+latLng;
						dohx.showInfo('<img src="'+url+'" />');
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
				addIf:config.canGetPositionByCellid || config.canGetPositionByGps || config.canGetPositionByAgps,
				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
				timeout:30 * 1000, // Wait max. 10sec.
				test:function(t){
					// Find most accurate available method to get position.
					var method = config.canGetPositionByAgps ? "agps" : (config.canGetPositionByGps ? "gps" : "cellid");
					// Get the position.
					wdd.onPositionRetrieved = function(posInfo){
						var check = util.checkProperties(posInfo, positionProperties);
						t.assertTrue(check.missing.length==0, "Missing properties: " + check.missing.join(", ") + "!");
						t.result = showPosInfo(posInfo);
					};
					wdd.requestPositionInfo(method);
				},
				tearDown:function(){
					delete wdd.onPositionRetrieved;
				}
//			},{
//				id:700,
//				name:"requestPositionInfo - Verify types of properties of returned 'PositionInfo' object.",
//				addIf:config.canGetPositionByCellid || config.canGetPositionByGps || config.canGetPositionByAgps,
//				requiredObjects:["Widget.Device.DeviceStateInfo.requestPositionInfo"],
//				//timeout:30 * 1000, // Wait max. 10sec.
//				test:function(t){
//throw new Error("TODO to implement");
//				}
			}
		]
	});
})();
