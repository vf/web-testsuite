(function(){

	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	var wmft = util.isObject("Widget.Messaging.MessageFolderTypes") ? Widget.Messaging.MessageFolderTypes : {}

	var _testMessage = {
		subject:"test subject " + new Date().getTime(),
		body:"test body " + new Date().getTime()
	};

	var supports = config.supports.Messaging;
	var _folderName = supports.editFolder ? "test-messaging-" + new Date().getTime() : wmft.DRAFTS;
	// The following will be requested from the user in the preconditions.
	var _testRecipients = {
		sms:undefined,
		mms:undefined,
		email:undefined
	};

	var _createdMessages = {}; // Store the messages in here, so we have a ref to delete them later.
	function _createTestMessage(msgType, overrideValues){
		// summary:
		//		Creates a test message of the given type and returns it.
		
		var typeData = {
			"sms":wmt.SMSMessage,
			"mms":wmt.MMSMessage,
			"email":wmt.EmailMessage
		};
		var msg = wm.createMessage(typeData[msgType]);
		for (var prop in _testMessage){
			msg[prop] = _testMessage[prop];
		}
		if (overrideValues){
			for (var key in overrideValues){
				msg[key] = overrideValues[key];
			}
		}
		msg.addAddress("destination", _testRecipients[msgType]);
		_createdMessages[msgType] = msg;
		return msg;
	}
	
	dohx.add({name:"Messaging",
		mqcExecutionOrderBaseOffset:200000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:[
			"Widget.Messaging",
			"Widget.Messaging.createMessage"
		],
		tests:[
			//
			// Preconditions
			//
			{
				id: 1,
				name:"Verify Preconditions",
				instructions:[
					"You will requested some phone numbers to use for sending SMS, MMS, etc.",
					"Click 'GO' to start."
				],
				timeout: 2 * 60 * 1000, // 2mins should be enough, I hope
				test:function(t){
					var prefix = "Messaging.testRecipient.";
					var getPref = function(msg, key, defaultValue){
						var val = Widget.preferenceForKey(prefix + key);
						var ret = "";
						while(!ret.replace(" ", "")){ // Make sure we really get an input.
							ret = prompt(msg, val || (defaultValue || ""));
						}
						Widget.setPreferenceForKey(ret, prefix + key);
						return ret;
					}
					
					_testRecipients.sms = getPref("Please enter a phone number to send test SMS to!", "sms");
					_testRecipients.mms = getPref("Please enter a phone number to send test MMS to!", "mms", _testRecipients.sms);
					_testRecipients.email = getPref("Please enter an email address to send test Emails to!", "email");
					//_testRecipients.sms = "01743004595";
					//_testRecipients.mms = "01743004595";
					//_testRecipients.email = "wk@uxebu.com";
					t.success("Preconditions met, user confirmed.");
				}
			},
			
			//
			// createMessage
			//
			{
				id: 100,
				name: "createMessage - Create SMS (and send it).",
				requiredObjects:["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage"],
				test: function(t) {
					var msg = _createTestMessage("sms");
					wm.sendMessage(msg);
					t.success("Message created without any error (and sent)");
				}
			},
			{
				id: 200,
				name: "createMessage - Create MMS (and send it).",
				requiredObjects:["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage"],
				test: function(t) {
					var msg = _createTestMessage("mms");
					wm.sendMessage(msg);
					t.success("Message created without any error (and sent)");
				}
			},
			{
				id: 300,
				name: "createMessage - Create Email (and send it).",
				requiredObjects:["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage"],
				test: function(t) {
					var msg = _createTestMessage("email");
					wm.sendMessage(msg);
					t.success("Message created without any error (and sent)");
				}
			},
			{
				id: 400,
				name: "createMessage - Throws INVALID_PARAMETER for missing param?",
				requiredObjects:["Widget.Messaging.createMessage"],
				test: function(t) {
					try{
						wm.createMessage();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 500,
				name: "createMessage - Throws INVALID_PARAMETER for invalid param?",
				requiredObjects:["Widget.Messaging.createMessage"],
				test: function(t) {
					try{
						wm.createMessage("INVALID msg type");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			
			//
			// findMessages, onMessagesFound
			//
			{
				id: 600,
				name: "findMessages - Does callback fire?",
				requiredObjects:["Widget.Messaging.createMessage", "Widget.Messaging.findMessages"],
				test: function(t) {
					wm.onMessagesFound = function(){
						t.success("Callback fired.");
					}
					var msg = wm.createMessage(wmt.EmailMessage);
					msg.subject = "*";
					wm.findMessages(msg, wmft.INBOX, 0, 10);
				},
				tearDown:function(){
					delete wm.onMessagesFound;
				}
			},
			{
				id: 700,
				name: "findMessages - Find message created (and sent) before.",
				requiredObjects:["Widget.Messaging.createMessage", "Widget.Messaging.findMessages"],
				test: function(t) {
					wm.onMessagesFound = function(msgs){
						t.assertEqual(1, msgs.length, "Expected to find ONE message.");
					}
					var msg = wm.createMessage(wmt.EmailMessage);
					msg.subject = _testMessage.subject;
					wm.findMessages(msg, wmft.OUTBOX, 0, 10);
				},
				tearDown:function(){
					delete wm.onMessagesFound;
				}
			},
			
			//
			// getMessage
			//
			{
				id: 800,
				name: "getMessage - Verify SMS with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.getMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				instructions:"Please verify that at least one SMS had been sent.",
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.SMSMessage, wmft.SENTBOX, 0);
					t.assertEqual(msg.subject, _testMessage.subject);
				}
			},
			{
				id: 900,
				name: "getMessage - Verify EMail with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.getMessage", "Widget.Messaging.MessageTypes.EmailMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.EmailMessage, wmft.SENTBOX, 0);
					t.assertEqual(msg.subject, _testMessage.subject);
				}
			},
			{
				id: 1000,
				name: "getMessage - Verify MMS with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.getMessage", "Widget.Messaging.MessageTypes.MMSMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.MMSMessage, wmft.SENTBOX, 0);
					t.assertEqual(msg.subject, _testMessage.subject);
				}
			},
			{
				id: 1010,
				name: "getMessage - Throws INVALID_PARAMETER for missing param?",
				requiredObjects:["Widget.Messaging.getMessage"],
				test: function(t) {
					try{
						wm.getMessage();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1020,
				name: "getMessage - Throws INVALID_PARAMETER for invalid param?",
				requiredObjects:["Widget.Messaging.getMessage"],
				test: function(t) {
					try{
						wm.getMessage("INVALID msg type");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},

			
			//
			// deleteMessage
			//
 //TODO: Wrong Params
			{
				id: 1100,
				name: "deleteMessage - Delete MMS with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.SMSMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t){
					wm.deleteMessage(wmt.MMSMessage, wmft.SENTBOX, _createdMessages["mms"].messageId);
				}
			},
			{
				id: 1200,
				name: "deleteMessage - Delete SMS with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.MMSMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t){
					wm.deleteMessage(wmt.SMSMessage, wmft.SENTBOX, _createdMessages["sms"].messageId);
				}
			},
			{
				id: 1300,
				name: "deleteMessage - Delete EMail with subject '" + _testMessage.subject + "'.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.EmailMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t){
					wm.deleteMessage(wmt.EmailMessage, wmft.SENTBOX, _createdMessages["email"].messageId);
				}
			},
			{
				id: 1400,
				name: "deleteMessage - Delete already deleted MMS again.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.MMSMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t) {
					try{
						wm.deleteMessage(wmt.MMSMessage, wmft.SENTBOX, _createdMessages["mms"].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1500,
				name: "deleteMessage - Delete already deleted SMS again.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.SMSMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t) {
					try{
						wm.deleteMessage(wmt.SMSMessage, wmft.SENTBOX, _createdMessages["sms"].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1600,
				name: "deleteMessage - Delete already deleted EMail again.",
				requiredObjects:["Widget.Messaging.deleteMessage", "Widget.Messaging.MessageTypes.EmailMessage", "Widget.Messaging.MessageFolderTypes.SENTBOX"],
				test: function(t) {
					try{
						wm.deleteMessage(wmt.EmailMessage, wmft.SENTBOX, _createdMessages["email"].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			//
			// sendMessage
			//
			{
				id: 1700,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "sendMessage - Send SMS to '"+ _testRecipients.sms +"'"}},
				expectedResult: "Please verify that you received the SMS with the subject '" + _testMessage.subject + "'",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				test: function(t){
					var msg = _createTestMessage("sms");
					wm.sendMessage(msg);
				}
			},
			{
				id: 1800,
				name: "sendMessage - Throw INVALID_PARAMETER missing parameter.",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage"],
				test: function(t) {
					try{
						wm.sendMessage();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1900,
				name: "sendMessage - Throw UNKNOWN for SMS to 000000000000UNKNOWN",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.SMSMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.addAddress("destination", "000000000000UNKNOWN");
						wm.sendMessage(msg);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNKNOWN);
					}
				}
			},
			// MMS
			{
				id: 2000,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "sendMessage - Send MMS to '" + _testRecipients.mms + "'"}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.MMSMessage"],
				expectedResult: "Please verify that you received the MMS with the subject '" + _testMessage.subject + "'",
				test: function(t){
					var msg = _createTestMessage("mms");
					wm.sendMessage(msg);
				}
			},
			{
				id: 2100,
				name: "sendMessage - Throw UNKNOWN for MMS to 000000000000UNKNOWN",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.MMSMessage"],
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.MMSMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.addAddress("destination", "000000000000UNKNOWN");
						wm.sendMessage(msg);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNKNOWN);
					}
				}
			},
			// Email
			{
				id: 2200,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "sendMessage - Send Email to '" + _testRecipients.email + "'"}},
				expectedResult: "Please verify that you received the Email with the subject '" + _testMessage.subject + "'",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.EmailMessage"],
				test: function(t){
					var msg = _createTestMessage("email");
					wm.sendMessage(msg);
				}
			},
			{
				id: 2300,
				name: "sendMessage - Throw UNKNOWN for Email to unknown@vf.commmmmm",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.EmailMessage"],
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.EmailMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.addAddress("destination", "unknown@vf.commmmmm");
						wm.sendMessage(msg);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNKNOWN);
					}
				}
			},
			//
			// onMessageSendingFailure
			//
			{
				id: 2400,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "onMessageSendingFailure - Test SMS to '" + _testRecipients.sms + "'."}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				mustSupportApis:["Widget.MessageTypes.onMessageSendingFailure"],
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = _createTestMessage("sms");
					wm.onMessageSendingFailure = function(msg, error){
						t.success("OK, onMessageSendingFailure got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageSendingFailure;
				}
			},
			{
				id: 2500,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "onMessageSendingFailure - Test MMS to '" + _testRecipients.mms + "'."}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.MMSMessage"],
				mustSupportApis:["Widget.MessageTypes.onMessageSendingFailure"],
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = _createTestMessage("mms");
					wm.onMessageSendingFailure = function(msg, error){
						t.success("OK, onMessageSendingFailure got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageSendingFailure;
				}
			},
			{
				id: 2600,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "onMessageSendingFailure - Test Email to '" + _testRecipients.email + "'."}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.EmailMessage"],
				mustSupportApis:["Widget.MessageTypes.onMessageSendingFailure"],
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = _createTestMessage("email");
					wm.onMessageSendingFailure = function(msg, error){
						t.success("OK, onMessageSendingFailure got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageSendingFailure;
				}
			},

			//
			// onMessageArrived
			//
			{
				id: 2700,
addIf:false, // not properly implemented
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "onMessageArrived - Test SMS to '" + _testRecipients.sms + "'."}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = _createTestMessage("sms");
					wm.onMessageArrived = function(msg){
						t.success("OK, onMessageArrived got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			},
			{
addIf:false, // not properly implemented
				id: 2800,
				// Lazy eval the test name, since we dont know the content of _testRecipients.* when adding the tests.
				name: {toString:function(){return "onMessageArrived - Test MMS to '" + _testRecipients.mms + "'."}},
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					//msg.destinationAddress = [_mmsRecipient];
					wm.onMessageArrived = function(msg){
						t.success("OK, onMessageArrived got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			},
			{
addIf:false, // not properly implemented
				id: 2900,
				//name: "onMessageArrived - Test Email to '"+_emailRecipient+"'.",
				requiredObjects: ["Widget.Messaging.createMessage", "Widget.Messaging.sendMessage", "Widget.Messaging.MessageTypes.SMSMessage"],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = [_emailRecipient];
					wm.onMessageArrived = function(msg){
						t.success("OK, onMessageArrived got called.");
					}
					wm.sendMessage(msg);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			},

			//
			// deleteAllMessages
			//
/*			{
				id: 3000,
				name: "deleteAllMessages - deleting all SMS Messages in your INBOX folder.",
				requiredObjects: ["Widget.Messaging.deleteAllMessages"],
				instructions:[
					"Click 'GO'",
					"Minimize this application to mini mode.",
					"Make sure you don't have any SMS Messages in your INBOX folder.",
					"Confirm the result."
				],
				expectedResult:"Did all SMS messages get deleted?",
				test: function(t) {
					wm.deleteAllMessages(wmt.SMSMessage, wmft.INBOX);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			},
			{
				id: 3100,
				name: "deleteAllMessages - deleting all MMS Messages in your INBOX folder.",
				requiredObjects: ["Widget.Messaging.deleteAllMessages"],
				instructions:[
					"Click 'GO'",
					"Minimize this application to mini mode.",
					"Make sure you don't have any MMS Messages in your INBOX folder.",
					"Confirm the result."
				],
				expectedResult:"Did all MMS messages get deleted?",
				test: function(t) {
					wm.deleteAllMessages(wmt.MMSMessage, wmft.INBOX);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			},
			{
				id: 3200,
				name: "deleteAllMessages - deleting all Email Messages in your INBOX folder.",
				requiredObjects: ["Widget.Messaging.deleteAllMessages"],
				instructions:[
					"Click 'GO'",
					"Minimize this application to mini mode.",
					"Make sure you don't have any Email Messages in your INBOX folder.",
					"Confirm the result."
				],
				expectedResult:"Did all Email messages get deleted?",
				test: function(t) {
					wm.deleteAllMessages(wmt.EmailMessage, wmft.INBOX);
				},
				tearDown: function(){
					delete wm.onMessageArrived;
				}
			}
//*/
		]
	});
})();


	//	DRAFTS:"DRAFTS",
	//	INBOX:"INBOX",
	//	OUTBOX:"OUTBOX",
	//	SENTBOX:"SENTBOX"
	//};
	//
	//wm.MessageTypes = {
	//	EmailMessage:"EmailMessage",
	//	MMSMessage:"MMSMessage",
	//	SMSMessage:"SMSMessage"
