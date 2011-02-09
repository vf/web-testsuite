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
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	var wmf = util.isObject("Widget.Messaging.MessageFolderTypes") ? Widget.Messaging.MessageFolderTypes : {};
	var wmq = util.isObject("Widget.Messaging.MessageQuantities") ? Widget.Messaging.MessageQuantities : {};
	
	function messageCountToString(msgCount){
		var ret = [];
		for (var i in msgCount){
			ret.push(i + "=" + msgCount[i]);
		}
		return ret.join(", ");
	}
	
	var testCases = [];
	var count = 1;
	var combinations = [];
	for (var msgType in wmt){
		for (var folderType in wmf){
			testCases.push({
				messageType:wmt[msgType],
				folderType:wmf[folderType]
			});
			combinations.push(wmt[msgType] + "-" + wmf[folderType]);
		}
	}
	var defaultTestObject = {
		name:"MessageQuantities",
		mqcExecutionOrderBaseOffset:300000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Messaging.getMessageQuantities",
			"Widget.Messaging.MessageQuantities"
		]
	};
	
	dohx.add(doh.util.mixin(defaultTestObject,{
		tests:[
			{
				id:1,
				name:"Preconditions for this widget",
				instructions:[
					"Make sure all conditions listed here are fullfilled, this test widget depends on them!",
					"Make sure you have set up an email account.",
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			}
		]
	}));
	
	for (var i=0, l=testCases.length; i<l; i++){
		(function(testCase){
			dohx.add(doh.util.mixin(defaultTestObject,{
				tests:[
					{
						id:count++ * 100,
						name: "getMessageQuantities - '" + testCase.messageType + "' in '" + testCase.folderType + "'.",
						requiredObjects:["Widget.MessageQuantities.getMessageQuantities"],
						instructions:[
							"Minimize the widget and look up the according quantities.",
							"Click 'GO'."
						],
						expectedResult:"Are the reported numbers correct?",
						test: function(t){
							var counts = wm.getMessageQuantities(testCase.messageType, testCase.folderType);
							var s = messageCountToString(counts);
							dohx.showInfo("API reports: " + s);
							return s;
						}
					}
				]})
			);
		})(testCases[i]);
	}
	
	dohx.add(doh.util.mixin(defaultTestObject,{
		tests:[
			{
				id:count++ * 100,
				name:"Change the data to be tested.",
				instructions:[
					"Minimize widget.",
					"Please add a message into all the following categories: " + combinations.join(", "),
					"Click 'GO'."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			}
		]
	}));
	
	for (var i=0, l=testCases.length; i<l; i++){
		(function(testCase){
			dohx.add(doh.util.mixin(defaultTestObject,{
				tests:[
					{
						id:testCase.id,
						name: "getMessageQuantities - '" + testCase.messageType + "' in '" + testCase.folderType + "'.",
						requiredObjects:["Widget.MessageQuantities.getMessageQuantities"],
						instructions:[
							"Minimize the widget and look up the according quantities.",
							"Click 'GO'."
						],
						expectedResult:"Are the reported numbers correct?",
						test: function(t){
							var counts = wm.getMessageQuantities(testCase.messageType, testCase.folderType);
							var s = messageCountToString(counts);
							dohx.showInfo("API reports: " + s);
							return s;
						}
					}
				]})
			);
		})(testCases[i]);
	}
		//EmailMessage:"EmailMessage",
		//MMSMessage:"MMSMessage",
		//SMSMessage:"SMSMessage"
			
		//DRAFTS:"DRAFTS",
		//INBOX:"INBOX",
		//OUTBOX:"OUTBOX",
		//SENTBOX:"SENTBOX"

			
	//		{
	//			id: 200,
	//			name: "totalMessageCnt - Add message and verify number.",
	//			instructions:[
	//				"Minimize the widget.",
	//				"Add a message using the messaging app.",
	//				"Look up the total message count (should be 1 more than in the test before).",
	//				"Click 'GO'."
	//			],
	//			expectedResult:"Is the reported number correct?",
	//			test: function(t) {
	//				var ret = wmq.totalMessageCnt;
	//				dohx.showInfo("API reports: " + ret);
	//				return ret;
	//			}
	//		},
	//		{
	//			id: 300,
	//			name: "totalMessageCnt - Remove 2 messages and verify number.",
	//			instructions:[
	//				"Minimize the widget.",
	//				"Remove two messages using the messaging app.",
	//				"Look up the total message count (should be 2 less than in the test before).",
	//				"Click 'GO'."
	//			],
	//			expectedResult:"Is the reported number correct?",
	//			test: function(t) {
	//				var ret = wmq.totalMessageCnt;
	//				dohx.showInfo("API reports: " + ret);
	//				return ret;
	//			}
	//		},
	//		
	//		//
	//		//	totalMessageReadCnt
	//		//
	//		
	//		//
	//		//	totalMessageUnreadCnt
	//		//
	//	]
	//});
})();
