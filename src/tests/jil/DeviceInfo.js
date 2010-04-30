(function(){
	var wdd = util.isObject("Widget.Device.DeviceInfo") ? Widget.Device.DeviceInfo : {};
	
	dohx.add({name:"DeviceInfo",
		mqcExecutionOrderBaseOffset:170000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"ownerInfo",
				requiredObjects:["Widget.Device.DeviceInfo.ownerInfo"],
				test:function(t){
					t.assertTrue(wdd.ownerInfo instanceof Widget.PIM.AddressBookItem,
								 "'ownerInfo' is not an instance of 'Widget.PIM.AddressBookItem'.");
					return wdd.ownerInfo;
				}
			},{
				id:200,
				name:"phoneColorDepthDefault",
				requiredObjects:["Widget.Device.DeviceInfo.phoneColorDepthDefault"],
				test:function(t){
					var value = wdd.phoneColorDepthDefault;
					t.assertTrue(util.isNumber(value));
					return value;
				}
			},{
				id:300,
				name:"phoneFirmware",
				requiredObjects:["Widget.Device.DeviceInfo.phoneFirmware"],
				test:function(t){
					var ret = wdd.phoneFirmware;
					t.assertNotEqual("", ret);
					return ret; // Return it, so the user sees the positive result.
				}
			},{
				id:400,
				name:"phoneManufacturer",
				requiredObjects:["Widget.Device.DeviceInfo.phoneManufacturer"],
				test:function(t){
					var ret = wdd.phoneManufacturer;
					t.assertNotEqual("", ret);
					return ret; // Return it, so the user sees the positive result.
				}
			},{
				id:500,
				name:"phoneModel",
				requiredObjects:["Widget.Device.DeviceInfo.phoneModel"],
				test:function(t){
					var ret = wdd.phoneModel;
					t.assertNotEqual("", ret);
					return ret; // Return it, so the user sees the positive result.
				}
			},{
				id:600,
				name:"phoneOS",
				requiredObjects:["Widget.Device.DeviceInfo.phoneOS"],
				test:function(t){
					var ret = wdd.phoneOS;
					t.assertNotEqual("", ret);
					return ret; // Return it, so the user sees the positive result.
				}
			},{
				id:700,
				name:"phoneScreenHeightDefault",
				requiredObjects:["Widget.Device.DeviceInfo.phoneScreenHeightDefault"],
				test:function(t){
					var value = wdd.phoneScreenHeightDefault;
					t.assertTrue(util.isNumber(value));
					return value;
				}
			},{
				id:800,
				name:"phoneScreenWidthDefault",
				requiredObjects:["Widget.Device.DeviceInfo.phoneScreenWidthDefault"],
				test:function(t){
					var value = wdd.phoneScreenWidthDefault;
					t.assertTrue(util.isNumber(value));
					return value;
				}
			},{
				id:900,
				name:"phoneSoftware",
				requiredObjects:["Widget.Device.DeviceInfo.phoneSoftware"],
				test:function(t){
					var value = wdd.phoneSoftware;
					t.assertNotEqual("", value);
					return value;
				}
			},{
				id:1000,
				name:"totalMemory",
				requiredObjects:["Widget.Device.DeviceInfo.totalMemory"],
				test:function(t){
					var value = wdd.totalMemory;
// TODO when multiple asserts work uncomment the following line
					t.assertTrue(util.isNumber(value), "Return value is not a number.");
					//t.assertTrue(value>0, "Total memory is 0, doesn't sound right.");
					return value;
				}
			}
		]
	});
})()