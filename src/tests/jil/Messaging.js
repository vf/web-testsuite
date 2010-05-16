(function(){
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	
	var _testMessage = {
		subject:"test subject " + new Date().getTime(),
		body:"test body " + new Date().getTime(),
		destinationAddress:"test-email@home.earth"
	};
	var _folderName = "test-messaging-" + new Date().getTime();
	
	var _createdMessages = {}; // Store the messages in here, so we have a ref to delete them later.
	function _createTestMessage(msgType, destFolder){
		wm.createFolder(msgType, _folderName);
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
			//	createMessage
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
			}
			
			//
			// sendMessage
			//
			
			//
			// onMessageSendingFailure
			//
			
			//
			// onMessageArrived
			//
			
			//
			// deleteAllMessages
			//
			
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
