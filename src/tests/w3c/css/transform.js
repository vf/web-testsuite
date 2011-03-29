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

	
	dohx.add({name:"CSS transforms",
		mqcExecutionOrderBaseOffset:490000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				summary:"Rotate 45° right",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Did the box rotate 45° to the right around it's center?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test100" onclick="__toggleActive(this)">Click here!</div>'
					);
				}
			},
			{
				id:200,
				summary:"Scale to half the size",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Did the box scale down to half it's size towards it's center?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test200" onclick="__toggleActive(this)">Click here!</div>'
					);
				}
			},
			{
				id:300,
				summary:"Skew around x and y axis",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Did the box skew around the X and the Y axis, left corner up and right corner down?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test300" onclick="__toggleActive(this)">Click here!</div>'
					);
				}
			},
			{
				id:400,
				summary:"Translate x and y axis",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Did the box translate a bit down right?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test400" onclick="__toggleActive(this)">Click here!</div>'
					);
				}
			},
			{
				id:500,
				summary:"Multiple values",
				instructions:[
					"Click 'GO'!",
					"Click the red box!"
				],
				expectedResult:"Does the box seem to stand on it's right side off to the right?",
				test:function(t){
					dohx.showInfo(
						'<div class="transform" id="test500" onclick="__toggleActive(this)">Click here!</div>'
					);
				}
			}
//*/
		]
	});

})();