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
	var wddc = util.isObject("Widget.Device.DeviceStateInfo.Config") ? Widget.Device.DeviceStateInfo.Config : {};
	
	dohx.add({name:"Config",
		mqcExecutionOrderBaseOffset:140000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Device.DeviceStateInfo.Config"],
		tests:[
			//
			//	Properties
			//
			{
				id:100,
				name:"vibrationSetting - Is 'ON' or 'OFF'?",
				requiredObjects:["Widget.Device.DeviceStateInfo.Config.vibrationSetting"],
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="ON" || val=="OFF", "Value should be 'ON' or 'OFF'.");
					return val;
				}
			},{
				id:200,
				name:"vibrationSetting - Verify 'ON'?",
				requiredObjects:["Widget.Device.DeviceStateInfo.Config.vibrationSetting"],
				instructions:[
					'Make sure that your phone has turned ON the vibrate mode.',
					"Press 'GO'."
				],
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="ON");
					return val;
				}
			},{
				id:300,
				name:"vibrationSetting - Verify 'OFF'?",
				requiredObjects:["Widget.Device.DeviceStateInfo.Config.vibrationSetting"],
				instructions:[
					'Make sure that your phone has turned OFF the vibrate mode.',
					"Press 'GO'."
				],
				test:function(t){
					var val = wddc.vibrationSetting;
					t.assertTrue(val=="OFF");
					return val;
				}
			}
		]
	});
})();
