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
	
	//
	// Test AJAX calls on various ports.
	//
	dohx.add({name:"Basics",
		mqcExecutionOrderBaseOffset:90000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:'window.Widget',
				test:function(t){
					t.assertTrue(!!window.Widget);
				}
			},{
				id:200,
				name:"window['Widget']",
				test:function(t){
					t.assertTrue(!!window['Widget']);
				}
			},{
				id:300,
				name:"Widget",
				test:function(t){
					t.assertTrue(!!Widget);
				}
			},{
				id:400,
				name:'typeof window!="undefined"',
				test:function(t){
					t.assertTrue(typeof window!="undefined");
				}
			},{
				id:500,
				name:'typeof Widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof Widget!="undefined");
				}
			},{
				id:600,
				name:'typeof window.Widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof window.Widget!="undefined");
				}
			},{
				id:700,
				name:'typeof window.widget!="undefined"',
				test:function(t){
					t.assertTrue(typeof window.widget!="undefined");
				}
			},{
				id:800,
				name:'Is "Widget" in window?',
				test:function(t){
					var hasWidget = false;
					for (var key in window){
						if (key=="Widget"){
							hasWidget = true;
							break;
						}
					}
					t.assertTrue(hasWidget);
				}
			},{
				id:900,
				name:'!!Widget.Device',
				test:function(t){
					t.assertTrue(!!Widget.Device);
				}
			},{
				id:1000,
				name:'!!window.Widget.Device',
				test:function(t){
					t.assertTrue(!!window.Widget.Device);
				}
			}
		]
	});
})();
