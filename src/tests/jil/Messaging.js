(function(){

	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	var wmft = util.isObject("Widget.Messaging.MessageFolderTypes") ? Widget.Messaging.MessageFolderTypes : {}

	var _testMessage = {
		subject:"test subject " + new Date().getTime(),
		body:"test body " + new Date().getTime(),
		destinationAddress:"test-email@home.earth"
	};
	var _folderName = config.supportsMessagingFolderEditing ? "test-messaging-" + new Date().getTime() : wmft.DRAFTS;
	var _smsRecipient = "017516646437";
	var _mmsRecipient = "017516646437";
	var _emailRecipient = "foo@uxebu.com";

	var _createdMessages = {}; // Store the messages in here, so we have a ref to delete them later.
	function _createTestMessage(msgType, destFolder){
		if (config.supportsMessagingFolderEditing){
			wm.createFolder(msgType, _folderName);
		}

		var msg = wm.createMessage(wmt.SMSMessage);
		for (var prop in _testMessage){
			msg[prop] = _testMessage[prop];
		}
		wm.moveMessageToFolder(msg, _folderName);
		_createdMessages[msgType] = msg;
	}

	dohx.add({name:"Messaging",
		mqcExecutionOrderBaseOffset:200000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Messaging"],
		tests:[
			//
			// createMessage
			//
			{
				id: 100,
				name: "createMessage - Create SMS in folder '" + _folderName + "'.",
				expectedResult:"Is the message with the subject '" + _testMessage.subject + "' in the given folder.",
				test: function(t) {
					var msg = _createTestMessage(wmt.SMSMessage);
				}
			},
			{
				id: 200,
				name: "createMessage - Create EMail in folder '" + _folderName + "'.",
				expectedResult:"Is the message with the subject '" + _testMessage.subject + "' in the given folder.",
				test: function(t) {
					var msg = _createTestMessage(wmt.EmailMessage);
				}
			},
			{
				id: 300,
				name: "createMessage - Create MMS in folder '" + _folderName + "'.",
				expectedResult:"Is the message with the subject '" + _testMessage.subject + "' in the given folder.",
				test: function(t) {
					var msg = _createTestMessage(wmt.MMSMessage);
				}
			},
			{
				id: 400,
				name: "createMessage - Throws INVALID_PARAMETER for missing param?",
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
				test: function(t) {
					wm.onMessagesFound = function(){
						t.success("Callback fired.");
					}
					var msg = new wm.Message();
					msg.subject = "*";
					wm.findMessages(msg, wmt.EmailMessage, 0, 10);
				},
				tearDown:function(){
					delete wm.onMessagesFound;
				}
			},
			{
				id: 700,
				name: "findMessages - Find message we created before.",
				test: function(t) {
					wm.onMessagesFound = function(msgs){
						t.assertEqual(1, msgs.length, "Expected to find ONE message.");
					}
					var msg = new wm.Message();
					msg.subject = _testMessage.subject;
					wm.findMessages(msg, wmt.EmailMessage, 0, 10);
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
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.SMSMessage, _folderName, 0);
					dohx.showInfo(util.toJson(msg));
				}
			},
			{
				id: 900,
				name: "getMessage - Verify EMail with subject '" + _testMessage.subject + "'.",
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.EMail, _folderName, 0);
					dohx.showInfo(util.toJson(msg));
				}
			},
			{
				id: 1000,
				name: "getMessage - Verify MMS with subject '" + _testMessage.subject + "'.",
				expectedResult:"Is this message shown correct?",
				test: function(t){
					var msg = wm.getMessage(wmt.MMSMessage, _folderName, 0);
					dohx.showInfo(util.toJson(msg));
				}
			},
			
			//
			// deleteMessage
			//
 //TODO: Wrong Params
			{
				id: 1100,
				name: "deleteMessage - Delete MMS with subject '" + _testMessage.subject + "'.",
				test: function(t){
					wm.deleteMessage(wmt.MMSMessage, _folderName, _createdMessages[wmt.MMSMessage].messageId);
				}
			},
			{
				id: 1200,
				name: "deleteMessage - Delete SMS with subject '" + _testMessage.subject + "'.",
				test: function(t){
					wm.deleteMessage(wmt.SMSMessage, _folderName, _createdMessages[wmt.SMSMessage].messageId);
				}
			},
			{
				id: 1300,
				name: "deleteMessage - Delete EMail with subject '" + _testMessage.subject + "'.",
				test: function(t){
					wm.deleteMessage(wmt.EmailMessage, _folderName, _createdMessages[wmt.EmailMessage].messageId);
				}
			},
			{
				id: 1400,
				name: "deleteMessage - Delete already deleted MMS again.",
				test: function(t) {
					try{
						wm.deleteMessage(wmt.MMSMessage, _folderName, _createdMessages[wmt.MMSMessage].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1500,
				name: "deleteMessage - Delete already deleted SMS again.",
				test: function(t) {
					try{
						wm.deleteMessage(wmt.SMSMessage, _folderName, _createdMessages[wmt.SMSMessage].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1600,
				name: "deleteMessage - Delete already deleted EMail again.",
				test: function(t) {
					try{
						wm.deleteMessage(wmt.EmailMessage, _folderName, _createdMessages[wmt.EmailMessage].messageId);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},

			//
			// sendMessage
			//
/*			{
				id: 1700,
				name: "sendMessage - Send SMS to '"+_smsRecipient+"'",
				expectedResult: "Please verify that you received the SMS with the subject '"+_testMessage.subject+"'",
				requiredObjects: ["Widget.Messaging.sendMessage", "Widget.Messaging.createMessage"],
				test: function(t){
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _smsRecipient;
					wm.sendMessage(msg);
				}
			},
			{
				id: 1800,
				name: "sendMessage - Throw INVALID_PARAMETER missing parameter.",
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
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.SMSMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.destinationAddress = "000000000000UNKNOWN";
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
				name: "sendMessage - Send MMS to '"+_mmsRecipient+"'",
				expectedResult: "Please verify that you received the MMS with the subject '"+_testMessage.subject+"'",
				requiredObjects: ["Widget.Messaging.sendMessage", "Widget.Messaging.createMessage"],
				test: function(t){
					var msg = wm.createMessage(wmt.MMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _mmsRecipient;
					wm.sendMessage(msg);
				}
			},
			{
				id: 2100,
				name: "sendMessage - Throw UNKNOWN for MMS to 000000000000UNKNOWN",
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.MMSMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.destinationAddress = "000000000000UNKNOWN";
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
				name: "sendMessage - Send Email to '"+_emailRecipient+"'",
				expectedResult: "Please verify that you received the Email with the subject '"+_testMessage.subject+"'",
				requiredObjects: ["Widget.Messaging.sendMessage", "Widget.Messaging.createMessage"],
				test: function(t){
					var msg = wm.createMessage(wmt.EmailMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _emailRecipient;
					wm.sendMessage(msg);
				}
			},
			{
				id: 2300,
				name: "sendMessage - Throw UNKNOWN for Email to unknown@vf.commmmmm",
				test: function(t) {
					try{
						var msg = wm.createMessage(wmt.EmailMessage);
						for (var prop in _testMessage){
							msg[prop] = _testMessage[prop];
						}
						msg.destinationAddress = "unknown@vf.commmmmm";
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
				name: "onMessageSendingFailure - Test SMS to '"+_smsRecipient+"'.",
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _smsRecipient;
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
				name: "onMessageSendingFailure - Test MMS to '"+_mmsRecipient+"'.",
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _mmsRecipient;
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
				name: "onMessageSendingFailure - Test Email to '"+_emailRecipient+"'.",
				instructions:[
					"Minimize this application, to mini mode.",
					"Turn off all network connections.",
					"Maximize it again, to full screen mode.",
					"Click 'GO'."
				],
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _emailRecipient;
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
				name: "onMessageArrived - Test SMS to '"+_smsRecipient+"'.",
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _smsRecipient;
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
				id: 2800,
				name: "onMessageArrived - Test MMS to '"+_mmsRecipient+"'.",
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _mmsRecipient;
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
				id: 2900,
				name: "onMessageArrived - Test Email to '"+_emailRecipient+"'.",
				timeout: 10 * 1000,
				test: function(t) {
					var msg = wm.createMessage(wmt.SMSMessage);
					for (var prop in _testMessage){
						msg[prop] = _testMessage[prop];
					}
					msg.destinationAddress = _emailRecipient;
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
			{
				id: 3000,
				name: "deleteAllMessages - deleting all SMS Messages in your INBOX folder.",
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
