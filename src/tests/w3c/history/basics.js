/*
	uxebu Consulting Ltd. & Co. KG
	
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
	
	var obj = window.history;
	// We are setting this to be a global function when needed, so our iframe that we test with can
	// call explicitly this function in its parent document.
	__tmpFunction = null; 
	
	dohx.add({name:"Basic history tests",
		mqcExecutionOrderBaseOffset:910000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			_objectUtil.getExistsTest({id:100, object:window, property:"history", specs:[]}),
			_objectUtil.getTypeCheckTest({id:101, object:window, property:"history", expectedType:"object", dependsOn:[100], specs:[]}),
			_objectUtil.getInstanceOfCheckTest({id:102, object:window, property:"history", expectedInstance:"History", dependsOn:[100], specs:[]}),
			
			//
			// back()
			//
			_objectUtil.getExistsTest({id:200, object:obj, property:"back", specs:[]}),
			_objectUtil.getTypeCheckTest({id:201, object:obj, property:"back", expectedType:"function", dependsOn:[200], specs:[]}),
			//{
			//	id: 210,
			//	name: "Does back() go to the previous location?",
			//	dependsOn: [201],
			//	test: function(t){
			//		var win = document.getElementById("_iframe_").contentWindow;
			//		__tmpFunction = function(){
			//			win.history.back();
			//			t.assertEqual("dummy.html", win.location.href);
			//		}
			//		win.location.href = "dummy1.html";
			//	}
			//},
			
			//
			// forward()
			//
			_objectUtil.getExistsTest({id:300, object:obj, property:"forward", specs:[]}),
			_objectUtil.getTypeCheckTest({id:301, object:obj, property:"forward", expectedType:"function", dependsOn:[300], specs:[]}),
			
			//
			// go()
			//
			_objectUtil.getExistsTest({id:400, object:obj, property:"go", specs:[]}),
			_objectUtil.getTypeCheckTest({id:401, object:obj, property:"go", expectedType:"function", dependsOn:[400], specs:[]}),
			
			//
			// pushState()
			//
			_objectUtil.getExistsTest({id:500, object:obj, property:"pushState", specs:[]}),
			_objectUtil.getTypeCheckTest({id:501, object:obj, property:"pushState", expectedType:"function", dependsOn:[500], specs:[]}),
			
			//
			// replaceState()
			//
			_objectUtil.getExistsTest({id:600, object:obj, property:"replaceState", specs:[]}),
			_objectUtil.getTypeCheckTest({id:601, object:obj, property:"replaceState", expectedType:"function", dependsOn:[600], specs:[]}),
//*/
		]
	});
})();
