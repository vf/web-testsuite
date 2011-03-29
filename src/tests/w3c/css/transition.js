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
	
	__toggleActive = function(obj){
		if (/active/.test(obj.className)) {
			obj.className = obj.className.replace(/active/,'');
		}else{
			obj.className += ' active';
		}
	}

	
	dohx.add({name:"CSS transitions",
		mqcExecutionOrderBaseOffset:500000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"One step transition",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Did the box move to the right?",
				test:function(t){
					dohx.showInfo(
						'<div class="transition" onclick="__toggleActive(this)" id="test100">Click here</div>'
					);
				}
			},
//			{
//				id:200,
//				name:"animationstart event",
//				instructions:["Touch the element."],
//				test:function(t){
//					dohx.showInfo(
//						'<div class="transition" onclick="__toggleActive(this)" id="test200">This element should move</div>'
//					);
//window.onanimationstart =
//  window.onanimationiteration =
//  window.onanimationend =
//  window.ontransitionend = function (e) {
//	console.log('Pure ' + e.type);
//}
//				}
//			},
//*/
		]
	});

})();