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
	
	dohx.add({name:"update0",
		mqcExecutionOrderBaseOffset:390000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:100,
				name:"Updatable widget version 0",
				instructions:[
					"Make sure you have version 1 available on the server.",
					"Close this widget",
					"Reopen it, it should get updated"
				],
				test:function(t){
					widget.update();
					t.success("Please reopen this widget!");
				}
			}
		]
	});
})();