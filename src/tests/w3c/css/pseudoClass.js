/*
	Copyright 2010-2011 uxebu Consulting Ltd. & Co. KG
	
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
	
	dohx.add({name:"CSS pseudo class",
		mqcExecutionOrderBaseOffset:800000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			//
			//	:active
			//
			//	Spec says:
			//		The :active pseudo-class applies while an element is being activated by the user. For example,
			//		between the times the user presses the mouse button and releases it. On systems with more than one
			//		mouse button, :active applies only to the primary or primary activation button (typically the "left" mouse button), and any aliases thereof.
			//
			{
				id:100,
				name:":active",
				definedInSpecs:["http://www.w3.org/TR/css3-selectors/#the-user-action-pseudo-classes-hover-act"],
				instructions:[
					"Click GO!",
					"Click and hold the button for about a second!",
				],
				expectedResult:"Did the button turn red?",
				test:function(t){
					dohx.showInfo(	'<button id="test100">CLICK ME</button>');
				}
			},
			{
				id:200,
				name:":hover",
				definedInSpecs:["http://www.w3.org/TR/css3-selectors/#the-user-action-pseudo-classes-hover-act"],
				instructions:[
					"Click GO!",
					"Move the mouse (pointer) over the button (on touch devices click once)!",
				],
				expectedResult:"Did the button turn red?",
				test:function(t){
					dohx.showInfo(	'<button id="test200">MOUSE OVER ME</button>');
				}
			},
//*/
		]
	});

})();