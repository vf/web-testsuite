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
	var widgetId = "http://widgets.vodafone.de/jil-api-tests-WidgetManager",
		widgetName = "JIL API Tests - WidgetManager",
		currentWidgetVersion = "0.2",
		ww = (window.Widget && window.Widget.WidgetManager) ? Widget.WidgetManager : {};
	
	dohx.add({name:"WidgetManager",
		mqcExecutionOrderBaseOffset:280000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.WidgetManager.checkWidgetInstallationStatus"],
		tests:[
			{
				id:100,
				name:"Check widgets status 'latest'.",
				test:function(t){
					var res = ww.checkWidgetInstallationStatus(widgetId, widgetName, currentWidgetVersion);
					t.assertEqual("latest", res);
				}
			},{
				id:200,
				name:"Check old version",
				test:function(t){
// TODO check how to install an old version of a widget with a version in the config.xml
throw new Error("Test not implemented yet.");
				}
			},{
				id:300,
				name:"Check widget status 'uninstalled'.",
				test:function(t){
					var res = ww.checkWidgetInstallationStatus("weird", "unknown", "100000.0000");
					t.assertEqual("uninstalled", res);
				}
			}
		]
	});
})();