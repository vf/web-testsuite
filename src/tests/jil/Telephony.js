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
	
	var wt = util.isObject("Widget.Telephony") ? Widget.Telephony : {};
	var wtcType = util.isObject("Widget.Telephony.CallRecordTypes") ? Widget.Telephony.CallRecordTypes : {};
	
	// Data used in the widgets.
	var _callRecords = {};
	
	var _testRecipients = {
		phoneNumber:undefined
	};
	
	var DEFAULT_TIMEOUT = 60 * 1000; // Wait about a minute for receiving/initiating a call.
	
	function _resetOnCallEvent(){
		// Actually we used to use "delete" but Nokia only understands setting onCallEvent to null.
		wt.onCallEvent = null;
	}
	
	dohx.add({name:"Telephony - Methods",
		mqcExecutionOrderBaseOffset:240000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Telephony"],
		tests:[
			{
				id:1,
				name:"Preconditions for this widget",
				instructions:[
					"Make sure all conditions listed here are fullfilled, this test widget depends on them!",
					"Make sure you have at least 2 calls in your call records for MISSED calls.",
					"Make sure you have at least 2 calls in your call records for OUTGOING calls.",
					"Make sure you have at least 2 calls in your call records for RECEIVED calls.",
				],
				test:function(t){
					var prefix = "Telephony.testRecipient.";
					var getPref = function(msg, key, defaultValue){
						var val = Widget.preferenceForKey(prefix + key);
						var ret = "";
						while(!ret.replace(" ", "")){ // Make sure we really get an input.
							ret = prompt(msg, val || (defaultValue || ""));
						}
						Widget.setPreferenceForKey(ret, prefix + key);
						return ret;
					}
					
					// Make sure there are no leading spaces, Nokia doesn't like that.
					_testRecipients.phoneNumber = embed.trim(getPref("Please enter a phone number to call for testing!", "phoneNumber"));
					t.success("Preconditions met, user confirmed. (phone number is '" + _testRecipients.phoneNumber + "')");
				}
			},
			//
			//	findCallRecords
			//	onCallRecordsFound
			//
			{
				id:100,
				name:"findCallRecords - Find all, '*'.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					wt.onCallRecordsFound = function(res){
						t.assertTrue(util.isArray(res));
						t.result = res && res.length;
					}
					var searchFor = new wt.CallRecord();
					searchFor.callRecordName = "*";
					wt.findCallRecords(searchFor, 0, 10);
				},
				tearDown:function(){
					wt.onCallRecordsFound = null;
				}
			},
			{
				id:110,
				name:"findCallRecords, onCallRecordsFound - Does callback fire at all?",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					wt.onCallRecordsFound = function(res){
						t.success("Callback 'onCallRecordsFound' fired.");
					}
					var searchFor = new wt.CallRecord();
					searchFor.callRecordName = "*";
					wt.findCallRecords(searchFor, 0, 10);
				},
				tearDown:function(){
					wt.onCallRecordsFound = null;
				}
			},
			{
				id:200,
				name:"findCallRecords - Throw INVALID_PARAMETER for no params.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					try{
						wt.findCallRecords();
						t.failure("Expected exception to be thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:300,
				name:"findCallRecords - Throw INVALID_PARAMETER for missing params.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					try{
						wt.findCallRecords(new wt.CallRecord());
						t.failure("Expected exception to be thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:400,
				name:"findCallRecords - Throw INVALID_PARAMETER for wrong param.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					try{
						wt.findCallRecords("", 0, 10);
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:500,
				name:"findCallRecords - Throw INVALID_PARAMETER for wrong param.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				test:function(t){
					try{
						var searchFor = new wt.CallRecord();
						searchFor.callRecordName = "*";
						wt.findCallRecords(searchFor, 0, "a");
						t.failure("Expected exception to be thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:600,
				name:"findCallRecords - Verify number of '" + wtcType.MISSED + "' calls.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				instructions:[
					"Make sure you have at least one MISSED call in your phone's call record.",
					"Click 'GO'."
				],
				expectedResult:"Is the number correct?",
				test:function(t){
					dohx.showInfo("Retreiving call records ...");
					wt.onCallRecordsFound = function(res){
						_callRecords[wtcType.MISSED] = res; // Store them for use in later tests.
						dohx.showInfo("API reports:", res.length);
						t.result = res.length;
					}
					var searchFor = new wt.CallRecord();
					searchFor.callRecordType = wtcType.MISSED;
					wt.findCallRecords(searchFor, 0, 10);
				},
				tearDown:function(){
					wt.onCallRecordsFound = null;
				}
			},
			{
				id:700,
				name:"findCallRecords - Verify number of '" + wtcType.OUTGOING + "' calls.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				instructions:[
					"Make sure you have at least one OUTGOING call in your phone's call record.",
					"Click 'GO'."
				],
				expectedResult:"Is the number correct?",
				test:function(t){
					dohx.showInfo("Retreiving call records ...");
					wt.onCallRecordsFound = function(res){
						_callRecords[wtcType.OUTGOING] = res; // Store them for use in later tests.
						dohx.showInfo("API reports:", res.length);
						t.result = res.length;
					}
					var searchFor = new wt.CallRecord();
					searchFor.callRecordType = wtcType.OUTGOING;
					wt.findCallRecords(searchFor, 0, 10);
				},
				tearDown:function(){
					wt.onCallRecordsFound = null;
				}
			},
			{
				id:800,
				name:"findCallRecords - Verify number of '" + wtcType.RECEIVED + "' calls.",
				requiredObjects:["Widget.Telephony.findCallRecords"],
				instructions:[
					"Make sure you have at least one RECEIVED call in your phone's call record.",
					"Click 'GO'."
				],
				expectedResult:"Is the number correct?",
				test:function(t){
					dohx.showInfo("Retreiving call records ...");
					wt.onCallRecordsFound = function(res){
						_callRecords[wtcType.RECEIVED] = res; // Store them for use in later tests.
						dohx.showInfo("API reports:", res.length);
						t.result = res.length;
					}
					var searchFor = new wt.CallRecord();
					searchFor.callRecordType = wtcType.RECEIVED;
					wt.findCallRecords(searchFor, 0, 10);
				},
				tearDown:function(){
					wt.onCallRecordsFound = null;
				}
			},
// TODO search in date ranges
			
			//
			//	getCallRecord
			//
			{
				id:900,
				name:"getCallRecord - Verify first MISSED call.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
// double check .... failed on H2
					var callType = wtcType.MISSED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					var record = wt.getCallRecord(callType, recs[0].callRecordId);
					t.assertEqual(record, recs[0]);
					return record;
				}
			},
			{
				id:1000,
				name:"getCallRecord - Verify first OUTGOING call.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
// double check .... failed on H2
					var callType = wtcType.OUTGOING;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					var record = wt.getCallRecord(callType, recs[0].callRecordId);
					t.assertEqual(record, recs[0]);
					return record;
				}
			},
			{
				id:1100,
				name:"getCallRecord - Verify first RECEIVED call.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
// double check ....
					var callType = wtcType.RECEIVED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					var record = wt.getCallRecord(callType, recs[0].callRecordId);
					t.assertEqual(record, recs[0]);
					return record;
				}
			},
			{
				id:1200,
				name:"getCallRecord - Throw INVALID_PARAMETER no params.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
					try{
						wt.getCallRecord();
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:1300,
				name:"getCallRecord - Throw INVALID_PARAMETER missing ID.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
					try{
						wt.getCallRecord(wtcType.MISSED);
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:1400,
				name:"getCallRecord - Throw INVALID_PARAMETER wrong type of ID.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
					try{
						wt.getCallRecord(wtcType.MISSED, "a is not there anyway");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id:1500,
				name:"getCallRecord - Throw INVALID_PARAMETER wrong call record type.",
				requiredObjects:["Widget.Telephony.getCallRecord"],
				test:function(t){
					try{
						wt.getCallRecord("wtf Doesnt exist ... so fail!!!", "1");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			
			//
			//	getCallRecordCnt
			//
			{
				id:1600,
				name:"getCallRecordCnt - Verify it returns a number.",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				test:function(t){
					var numCalls = wt.getCallRecordCnt(wtcType.MISSED);
					t.assertTrue(util.isNumber(numCalls));
					return numCalls;
				}
			},
			{
				id:1610,
				name:"getCallRecordCnt - Verify number of missed calls.",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				expectedResult:"Is the number of missed calls correct?",
				test:function(t){
					var numCalls = wt.getCallRecordCnt(wtcType.MISSED);
					dohx.showInfo("API reports:", numCalls);
					return numCalls;
				}
			},
			{
				id:1620,
				name:"getCallRecordCnt - Verify number of received calls.",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				expectedResult:"Is the number of received calls correct?",
				test:function(t){
					var numCalls = wt.getCallRecordCnt(wtcType.RECEIVED);
					dohx.showInfo("API reports:", numCalls);
					return numCalls;
				}
			},
			{
				id:1630,
				name:"getCallRecordCnt - Verify number of outgoing calls.",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				expectedResult:"Is the number of outgoing calls correct?",
				test:function(t){
					var numCalls = wt.getCallRecordCnt(wtcType.OUTGOING);
					dohx.showInfo("API reports:", numCalls);
					return numCalls;
				}
			},
			{
				id:1700,
				name:"getCallRecordCnt - Throws INVALID_PARAMETER for no parameter?",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				test:function(t){
					try{
						wt.getCallRecordCnt();
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				// Spec says explicitly: "0 is returned if the type is unknown".
				id:1800,
				name:"getCallRecordCnt - Retruns 0 for unknown parameter?",
				requiredObjects:["Widget.Telephony.getCallRecordCnt"],
				test:function(t){
					t.assertEqual(0, wt.getCallRecordCnt("unknown CALLRECORDTYPE, doesnt exist anyway ..."), "Expected 0 to be returned for unknown parameter.");
				}
			},
			
			//
			//	initiateVoiceCall
			//
			{
				id:1900,
				name:"initiateVoiceCall - Verify the method call works at all.",
				requiredObjects:["Widget.Telephony.initiateVoiceCall"],
				instructions:[
					"Click 'GO'.",
					"A phone call should be started."
				],
				expectedResult:"Did a phone call to the number "+ _testRecipients.phoneNumber +" get initiated?",
				test:function(){
					wt.initiateVoiceCall(_testRecipients.phoneNumber);
				}
			},
			//
			//	onCallEvent
			//
			{
				id:2500,
				name:"onCallEvent - Is callback invoked?",
				timeout: DEFAULT_TIMEOUT,
				instructions:[
					"Click 'GO'.",
					"Call this phone's number, make sure it rings.",
					"This widget should be triggered and make this test pass automatically (times out otherwise)."
				],
				test:function(t){
					wt.onCallEvent = function(){
						t.success("onCallEvent was called.");
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:2600,
				name:"onCallEvent - Verify call is '" + wtcType.MISSED + "'?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.MISSED"],
				timeout: DEFAULT_TIMEOUT,
				instructions:[
					"Click 'GO'.",
					"Call this phone's number, make sure it rings.",
					"Don't pick up the phone!",
					"Hang up the phone you are calling from.",
					"This widget should be triggered and make this test pass automatically (times out otherwise)."
				],
				test:function(t){
					wt.onCallEvent = function(recType){
						t.assertEqual(wtcType.MISSED, recType);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:2700,
				name:"onCallEvent - Verify call is '" + wtcType.RECEIVED + "'?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.RECEIVED"],
				timeout: DEFAULT_TIMEOUT,
				instructions:[
					"Click 'GO'.",
					"Call this phone's number, make sure it rings.",
					"Pick up the phone (to make sure call was received)!",
					"Hang up now.",
					"This widget should be triggered and make this test pass automatically (times out otherwise)."
				],
				test:function(t){
					wt.onCallEvent = function(recType){
						t.assertEqual(wtcType.RECEIVED, recType);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:2800,
				name:"onCallEvent - Verify call is '" + wtcType.OUTGOING + "'?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.OUTGOING"],
				timeout: DEFAULT_TIMEOUT,
				instructions:[
					"Click 'GO'.",
					"Put widget into mini/floating mode.",
					"Open the dialer and call any number.",
					"This widget should be triggered and make this test pass automatically (times out otherwise)."
				],
				test:function(t){
					wt.onCallEvent = function(recType){
						t.assertEqual(wtcType.OUTGOING, recType);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:2900,
				name:"onCallEvent - Verify caller number for '" + wtcType.MISSED + "' call?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.MISSED"],
				timeout: DEFAULT_TIMEOUT,
				instructions:[
					"Click 'GO'.",
					"Call this phone's number, make sure it rings.",
					"Don't pick up the phone!",
					"The number you called from should be shown."
				],
				expectedResult:"Is the above number the one you called this phone from?",
				test:function(t){
					dohx.showInfo("Waiting for incoming call...");
					wt.onCallEvent = function(recType, phoneNumber){
						dohx.showInfo("API reported: ", phoneNumber);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:3000,
				name:"onCallEvent - Verify caller number for '" + wtcType.RECEIVED + "' call?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.RECEIVED"],
				instructions:[
					"Click 'GO'.",
					"Call this phone's number, make sure it rings.",
					"Pick up the phone!",
					"The number you called from should be shown."
				],
				expectedResult:"Is the above number the one you called this phone from?",
				test:function(t){
					dohx.showInfo("Waiting for incoming call...");
					wt.onCallEvent = function(recType, phoneNumber){
						dohx.showInfo("API reported: ", phoneNumber);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:3100,
				name:"onCallEvent - Verify number for '" + wtcType.OUTGOING + "' call?",
				requiredObjects:["Widget.Telephony.CallRecordTypes.OUTGOING"],
				instructions:[
					"Click 'GO'.",
					"Put widget into mini/floating mode.",
					"Open the dialer and call any number.",
					"Hang up after it rang at least once.",
					"The number you dialed should be shown, confirm it please!"
				],
				expectedResult:"Is the above number the one you dialed?",
				test:function(t){
					dohx.showInfo("Waiting for outgoing call...");
					wt.onCallEvent = function(recType, phoneNumber){
						dohx.showInfo("API reported: ", phoneNumber);
					} 
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:3200,
				name:"onCallEvent - after initiateVoiceCall fires at all",
				timeout: DEFAULT_TIMEOUT,
				requiredObjects:["Widget.Telephony.initiateVoiceCall"],
				instructions:[
					"Click 'GO'.",
					"A call will be initiated.",
					"Hang up after a bit (if onCallEvent fires test will succeed, timeout otherwise)",
				],
				test:function(t){
					wt.onCallEvent = function(recType, phoneNumber){
						t.success("onCallEvent fired");
					}
					wt.initiateVoiceCall(_testRecipients.phoneNumber);
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:3210,
				name:"onCallEvent - after initiateVoiceCall gets correct CallRecordType",
				timeout: DEFAULT_TIMEOUT,
				requiredObjects:["Widget.Telephony.initiateVoiceCall"],
				instructions:[
					"Click 'GO'.",
					"A call will be initiated.",
					"Hang up after a bit (if onCallEvent fires test will succeed, timeout otherwise)",
				],
				test:function(t){
					wt.onCallEvent = function(recType, phoneNumber){
						t.assertEqual(wtcType.OUTGOING, recType);
						t.result = recType;
					}
					wt.initiateVoiceCall(_testRecipients.phoneNumber);
				},
				tearDown: _resetOnCallEvent
			},
			{
				id:3220,
				name:"onCallEvent - after initiateVoiceCall gets correct phoneNumber",
				timeout: DEFAULT_TIMEOUT,
				requiredObjects:["Widget.Telephony.initiateVoiceCall"],
				instructions:[
					"Click 'GO'.",
					"A call will be initiated.",
					"Hang up after a bit (if onCallEvent fires test will succeed, timeout otherwise)",
				],
				test:function(t){
					var num = _testRecipients.phoneNumber;
					wt.onCallEvent = function(recType, phoneNumber){
						t.assertEqual(num, phoneNumber);
						t.result = phoneNumber;
					}
					wt.initiateVoiceCall(num);
				},
				tearDown: _resetOnCallEvent
			},
			//
			//	deleteCallRecord 
			//
/*			{
TODO ... finish thos
				id:3300,
				name:"deleteCallRecord - Remove first MISSED call.",
				requiredObjects:["Widget.Telephony.deleteCallRecord"],
				test:function(t){
//double check ....
					var callType = wtcType.MISSED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					wt.deleteCallRecord(callType, recs[0].callRecordId);
				}
			},
			{
				id:3400,
				name:"deleteCallRecord - Remove first OUTGOING call.",
				requiredObjects:["Widget.Telephony.deleteCallRecord"],
				test:function(t){
//double check ....
					var callType = wtcType.OUTGOING;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					wt.deleteCallRecord(callType, recs[0].callRecordId);
				}
			},
			{
				id:3500,
				name:"deleteCallRecord - Remove first RECEIVED call.",
				requiredObjects:["Widget.Telephony.deleteCallRecord"],
				test:function(t){
//double check ....
					var callType = wtcType.RECEIVED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					var recs = _callRecords[callType];
					wt.deleteCallRecord(callType, recs[0].callRecordId);
				}
			},
			
// TODO add tests for INVALID_PARAMETER
			//
			//	deleteAllCallRecords 
			//
			{
				id:3600,
				name:"deleteAllCallRecords - Remove all MISSED calls.",
				requiredObjects:["Widget.Telephony.deleteAllCallRecords"],
				test:function(t){
//double check ....
					var callType = wtcType.MISSED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					wt.deleteAllCallRecords(callType);
					t.assertEqual(0, wt.getCallRecordCnt(callType));
				}
			},
			{
				id:3700,
				name:"deleteAllCallRecords - Remove all OUTGOING calls.",
				requiredObjects:["Widget.Telephony.deleteAllCallRecords"],
				test:function(t){
//double check ....
					var callType = wtcType.OUTGOING;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					wt.deleteAllCallRecords(callType);
					t.assertEqual(0, wt.getCallRecordCnt(callType));
				}
			},
			{
				id:3800,
				name:"deleteAllCallRecords - Remove all RECEIVED calls.",
				requiredObjects:["Widget.Telephony.deleteAllCallRecords"],
				test:function(t){
//double check ....
					var callType = wtcType.RECEIVED;
					if (typeof _callRecords[callType]=="undefined" || !_callRecords[callType].length){
						t.failure("Expected at least one '" + callType + "' call to find on the phone, none found.");
					}
					wt.deleteAllCallRecords(callType);
					t.assertEqual(0, wt.getCallRecordCnt(callType));
				}
			}
// TODO add tests for INVALID_PARAMETER
//*/
		]
	});
})()