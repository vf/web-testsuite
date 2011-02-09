/*
	Copyright 2010-2011 Vodafone Group Services GmbH
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
		http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){
	
	var wdd = util.isObject("Widget.Device.DataNetworkInfo") ? Widget.Device.DataNetworkInfo : {};
	
	dohx.add({
		mqcExecutionOrderBaseOffset:150000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		name:"DataNetworkInfo",
		requiredObjects:["Widget.Device.DataNetworkInfo"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"isDataNetworkConnected - Does it return a boolean value?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertTrue(val===true || val===false);
					return val;
				}
			},
			{
				id:200,
				name:"isDataNetworkConnected - Verify that 'false' is returned properly?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				instructions:[
					"Disconnect the phone from any network (WiFi, Bluetooth, Edge, IRDA, etc.)!",
					"Press 'GO'."
				],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertFalse(val);
					return val;
				}
			},
			{
				id:300,
				name:"isDataNetworkConnected - Verify that 'true' is returned properly?",
				requiredObjects:["Widget.Device.DataNetworkInfo.isDataNetworkConnected"],
				instructions:[
					"Connect the phone to some network (WiFi, Bluetooth, Edge, IRDA, etc.)!",
					"Press 'GO'."
				],
				test:function(t){
					var val = wdd.isDataNetworkConnected;
					t.assertTrue(val);
					return val;
				}
			},
			{
				id:400,
				name:"networkConnectionType - Verify it returns an array.",
				requiredObjects:["Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					var val = wdd.networkConnectionType;
					t.assertTrue(util.isArray(val), "Should be an array.");
					return val;
				}
			},
			{
				id:410,
				name:"networkConnectionType - Verify the values.",
				requiredObjects:["Widget.Device.DataNetworkInfo.networkConnectionType"],
				expectedResult:"Are the listed connection types those that the phone is connected to?",
				test:function(t){
					var val = wdd.networkConnectionType;
					dohx.showInfo("API reports: ", val);
					return val;
				}
			},
			//
			//	Methods
			//
			{
				id:500,
				name:"getNetworkConnectionName - Verify it is not '' (empty string).",
				requiredObjects:["Widget.Device.DataNetworkInfo.getNetworkConnectionName", "Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					var types = wdd.networkConnectionType;
					if (!util.isArray(types) || types.length==0){
						throw new Error("Property 'networkConnectionType' returned only '" + embed.toJson(types) + "', can not execute test.");
					}
					var val = wdd.getNetworkConnectionName(types[0]);
					t.assertNotEqual("", val, "Should not be empty.");
					return val;
				}
			},
			{
				id:510,
				name:"getNetworkConnectionName - Verify that each type returns a value.",
				requiredObjects:["Widget.Device.DataNetworkInfo.getNetworkConnectionName", "Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					var types = wdd.networkConnectionType;
					if (!util.isArray(types) || types.length==0){
						throw new Error("Property 'networkConnectionType' returned only '" + embed.toJson(types) + "', can't execute test.");
					}
					var success = true;
					var errors = [];
					var ret = [];
					for (var i=0, l=types.length; i<l; i++){
						var val = wdd.getNetworkConnectionName(types[i]);
						if (!val){
							success = false;
							errors.push(types[i] + "= '" + embed.toJson(val) + "'");
						}
						ret.push(types[i] + ": " + val);
					}
					t.assertTrue(success, "Invalid values returned for the following network connection types: " + errors.join(","));
					return ret;
				}
			},
			{
				id:520,
				name:"getNetworkConnectionName - missing parameter",
				requiredObjects:["Widget.Device.DataNetworkInfo.getNetworkConnectionName", "Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					try{
						wdd.getNetworkConnectionName()
						t.failure("Expected exception to be thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:530,
				name:"getNetworkConnectionName - invalid parameter",
				requiredObjects:["Widget.Device.DataNetworkInfo.getNetworkConnectionName", "Widget.Device.DataNetworkInfo.networkConnectionType"],
				test:function(t){
					try{
						var val = wdd.getNetworkConnectionName("invalid")
						t.failure("Expected exception to be thrown, but it returend: '" + val + "'.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:600,
				name:"onNetworkConnectionChanged - Verify that the callback fires.",
				mustSupportApis:["Widget.Device.DataNetworkInfo.onNetworkConnectionChanged"],
				instructions:[
					"Click 'GO'!",
					"Connect to a different data network, e.g. from 3G to WiFi (within 2 minutes)."
				],
				timeout:2 * 60 * 1000,
				test:function(t){
					wdd.onNetworkConnectionChanged = function(con){
						t.success(con);
					}
				},
				tearDown:function(){
					delete wdd.onNetworkConnectionChanged;
				}
			}
//*/
		]
	});
})();