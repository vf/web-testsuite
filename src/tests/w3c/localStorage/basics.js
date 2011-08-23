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
	
	var obj = window.localStorage;
	// We are setting this to be a global function when needed, so our iframe that we test with can
	// call explicitly this function in its parent document.
	__tmpFunction = null; 
	
	dohx.add({name:"Basic localStorage tests",
		mqcExecutionOrderBaseOffset:920000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			// Existance and type checks upfront, and functional tests later, to be able to use dependsOn and not do tests in vain.
			
			_objectUtil.getExistsTest({id:100, object:window, property:"localStorage", specs:[]}),
			_objectUtil.getTypeCheckTest({id:101, object:window, property:"localStorage", expectedType:"object", dependsOn:[100], specs:[]}),
			_objectUtil.getInstanceOfCheckTest({id:102, object:window, property:"localStorage", expectedInstance:"Storage", dependsOn:[100], specs:[]}),
			// clear()
			_objectUtil.getExistsTest({id:110, object:obj, property:"clear", specs:[]}),
			_objectUtil.getTypeCheckTest({id:111, object:obj, property:"clear", expectedType:"function", dependsOn:[110], specs:[]}),
			// getItem()
			_objectUtil.getExistsTest({id:120, object:obj, property:"getItem", specs:[]}),
			_objectUtil.getTypeCheckTest({id:121, object:obj, property:"getItem", expectedType:"function", dependsOn:[120], specs:[]}),
			// key()
			_objectUtil.getExistsTest({id:130, object:obj, property:"key", specs:[]}),
			_objectUtil.getTypeCheckTest({id:131, object:obj, property:"key", expectedType:"function", dependsOn:[130], specs:[]}),
			// removeItem()
			_objectUtil.getExistsTest({id:140, object:obj, property:"removeItem", specs:[]}),
			_objectUtil.getTypeCheckTest({id:141, object:obj, property:"removeItem", expectedType:"function", dependsOn:[140], specs:[]}),
			// setItem()
			_objectUtil.getExistsTest({id:150, object:obj, property:"setItem", specs:[]}),
			_objectUtil.getTypeCheckTest({id:151, object:obj, property:"setItem", expectedType:"function", dependsOn:[150], specs:[]}),
//*/
		]
	});
})();
