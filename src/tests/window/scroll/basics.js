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

/*
We gonna test all the scroll related props such as: 
	scrollY
	scrollX
	scrollbars
	onscroll
	scrollBy()
	scrollTo()
	scroll()
	pageXOffset
	pageYOffset
*/

(function(){
	
	var obj = window;
	// We are setting this to be a global function when needed, so our iframe that we test with can
	// call explicitly this function in its parent document.
	__tmpFunction = null; 
	
	dohx.add({name:"Various scroll functions/properties",
		mqcExecutionOrderBaseOffset:930000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			// Existance and type checks upfront, and functional tests later, to be able to use dependsOn and not do tests in vain.
			
			// scrollTo
			_objectUtil.getExistsTest({id:100, object:window, property:"scrollTo", specs:[]}),
			_objectUtil.getTypeCheckTest({id:101, object:window, property:"scrollTo", expectedType:"function", dependsOn:[100], specs:[]}),
			// scrollBy
			_objectUtil.getExistsTest({id:110, object:window, property:"scrollBy", specs:[]}),
			_objectUtil.getTypeCheckTest({id:111, object:window, property:"scrollBy", expectedType:"function", dependsOn:[110], specs:[]}),
			// scroll
			_objectUtil.getExistsTest({id:120, object:window, property:"scroll", specs:[]}),
			_objectUtil.getTypeCheckTest({id:121, object:window, property:"scroll", expectedType:"function", dependsOn:[120], specs:[]}),
			// onscroll
			_objectUtil.getExistsTest({id:130, object:window, property:"onscroll", specs:[]}),
			//_objectUtil.getTypeCheckTest({id:131, object:window, property:"onscroll", expectedType:"number", dependsOn:[130], specs:[]}),
			// scrollX
			_objectUtil.getExistsTest({id:140, object:window, property:"scrollX", specs:[]}),
			_objectUtil.getTypeCheckTest({id:141, object:window, property:"scrollX", expectedType:"number", dependsOn:[140], specs:[]}),
			// scrollY
			_objectUtil.getExistsTest({id:150, object:window, property:"scrollY", specs:[]}),
			_objectUtil.getTypeCheckTest({id:151, object:window, property:"scrollY", expectedType:"number", dependsOn:[150], specs:[]}),
			// pageXOffset
			_objectUtil.getExistsTest({id:160, object:window, property:"pageXOffset", specs:[]}),
			_objectUtil.getTypeCheckTest({id:161, object:window, property:"pageXOffset", expectedType:"number", dependsOn:[160], specs:[]}),
			// pageYOffset
			_objectUtil.getExistsTest({id:170, object:window, property:"pageYOffset", specs:[]}),
			_objectUtil.getTypeCheckTest({id:171, object:window, property:"pageYOffset", expectedType:"number", dependsOn:[170], specs:[]}),
			// scrollbars
			_objectUtil.getExistsTest({id:180, object:window, property:"scrollbars", specs:[]}),
			//_objectUtil.getTypeCheckTest({id:181, object:window, property:"scrollbars", expectedType:"number", dependsOn:[180], specs:[]}),
			
			//
			// scrollTo, scrollX/Y
			//
			{
				id: 200,
				name: "Does scrollTo(), scrollX work?",
				definedInSpecs: [],
				dependsOn: [101, 141],
				test: function(t){
					window.scrollTo(3, 0);
					var actual = window.scrollX;
					t.assertEqual(3, actual);
					return actual;
				}
			},
			{
				id: 210,
				name: "Does scrollTo(), scrollY work?",
				definedInSpecs: [],
				dependsOn: [101, 151],
				test: function(t){
					window.scrollTo(0, 8);
					var actual = window.scrollY;
					t.assertEqual(8, actual);
					return actual;
				}
			},
			{
				id: 220,
				name: "Does scrollTo() and scrollY work with float numbers?",
				definedInSpecs: [],
				dependsOn: [101, 151],
				test: function(t){
					window.scrollTo(0, 11.45);
					var actual = window.scrollY;
					t.assertEqual(11, actual);
					return actual;
				}
			},
			{
				id: 221,
				name: "Does scrollTo() and scrollX work with float numbers?",
				definedInSpecs: [],
				dependsOn: [101, 151],
				test: function(t){
					window.scrollTo(13.45, 0);
					var actual = window.scrollX;
					t.assertEqual(13, actual);
					return actual;
				}
			},
			{
				id: 230,
				name: "Do two scrollTo()s work?",
				definedInSpecs: [],
				dependsOn: [101, 151],
				test: function(t){
					window.scrollTo(2, 0);
					window.scrollTo(3, 0);
					var actual = window.scrollX;
					t.assertEqual(3, actual);
					return actual;
				}
			},
			{
				id: 235,
				name: "Does a second scrollTo() using a timeout work?",
				definedInSpecs: [],
				dependsOn: [101, 151],
				test: function(t){
					window.scrollTo(2, 0);
					setTimeout(function(){
						window.scrollTo(5, 0);
						var actual = window.scrollX;
						t.assertEqual(5, actual);
						t.result = actual;
					}, 100);
				}
			},
			

// scrollBy
// scrollBy multiple times
// scrollBy with settimeout multiple times
			
			//
			// compare various scroll offset properties
			//
			{
				id: 300,
				name: "Is scrollX==pageXOffset?",
				definedInSpecs: [],
				dependsOn: [141, 161],
				test: function(t){
					window.scrollTo(5, 5);
					t.assertEqual(scrollX, pageXOffset);
					return [scrollX, pageXOffset];
				}
			},
			{
				id: 310,
				name: "Is scrollY==pageYOffset?",
				definedInSpecs: [151, 171],
				dependsOn: [110],
				test: function(t){
					window.scrollTo(0, 5);
					t.assertEqual(scrollY, pageYOffset);
					return [scrollY, pageYOffset];
				}
			},
			{
				// Just test it again, with a different scroll value, just to be sure.
				id: 311,
				name: "Is scrollY==pageYOffset (again)?",
				definedInSpecs: [151, 171],
				dependsOn: [110],
				test: function(t){
					window.scrollTo(0, 8);
					t.assertEqual(scrollY, pageYOffset);
					return [scrollY, pageYOffset];
				}
			},
//*/
		]
	});
})();
