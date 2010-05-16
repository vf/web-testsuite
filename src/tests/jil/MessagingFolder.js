(function(){
	
	var wm = util.isObject("Widget.Messaging") ? Widget.Messaging : {};
	var wmt = util.isObject("Widget.Messaging.MessageTypes") ? Widget.Messaging.MessageTypes : {};
	
	var _folderName = "test-folder-" + new Date().getTime();
	
	dohx.add({name:"MessagingFolder",
		mqcExecutionOrderBaseOffset:320000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		requiredObjects:["Widget.Messaging"],
		tests:[
			//
			// createFolder
			//
			{
				id: 100,
				name: "createFolder - in emails",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.EmailMessage);
					wm.createFolder(wmt.EmailMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 200,
				name: "createFolder - in SMS",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.SMSMessage);
					wm.createFolder(wmt.SMSMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 300,
				name: "createFolder - in MMS",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.createFolder"],
				test: function(t) {
					var folderNames = wm.getFolderNames(wmt.MMSMessage);
					wm.createFolder(wmt.MMSMessage, _folderName);
					t.assertEqual(folderNames.length+1, wm.getFolderNames().length);
				}
			},
			{
				id: 400,
				name: "createFolder - Throw INVALID_PARAMETER for adding existing folder.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder(wmt.MMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 500,
				name: "createFolder - Throw INVALID_PARAMETER for no params.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 600,
				name: "createFolder - Throw INVALID_PARAMETER for missing params.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder(wmt.SMSMessage);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 700,
				name: "createFolder - Throw INVALID_PARAMETER for invalid message type.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("INVALID message type");
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 800,
				name: "createFolder - Throw INVALID_PARAMETER for empty message type.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("", _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			// Tests when createFolder is not supported
			{
				id: 850,
				name: "createFolder is not supported - Throws UNSUPPORTED.",
				addIf:!config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder("", _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			{
				id: 860,
				name: "createFolder is not supported - Throws UNSUPPORTED also if parameters are missing.",
				addIf:!config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.createFolder"],
				test: function(t) {
					try{
						wm.createFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			
			//
			// deleteFolder
			//
			{
				id: 900,
				name: "deleteFolder - Let's remove the one we created in 'SMS'.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.SMSMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.SMSMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1000,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.SMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1100,
				name: "deleteFolder - Let's remove the one we created in 'MMS'.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.MMSMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.MMSMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1200,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.MMSMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			{
				id: 1300,
				name: "deleteFolder - Let's remove the one we created in 'EMail'.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.getFolderNames", "Widget.Messaging.deleteFolder"],
				test: function(t) {
					wm.deleteFolder(wmt.EmailMessage, _folderName);
					t.assertTrue(wm.getFolderNames(wmt.EmailMessage).indexOf(_folderName)==-1, "Folder was not deleted.");
				}
			},
			{
				id: 1400,
				name: "deleteFolder - Delete the same one again, should throw an exception.",
				addIf:config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.EmailMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.INVALID_PARAMETER);
					}
				}
			},
			// Tests when deleteFolder is not supported
			{
				id: 1450,
				name: "deleteFolder is not supported - Throws UNSUPPORTED.",
				addIf:!config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder(wmt.EmailMessage, _folderName);
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			{
				id: 1460,
				name: "deleteFolder is not supported - Throws UNSUPPORTED also if parameters are missing.",
				addIf:!config.supportsMessagingFolderEditing,
				requiredObjects:["Widget.Messaging.deleteFolder"],
				test: function(t) {
					try{
						wm.deleteFolder();
						t.failure("Exception not thrown.");
					}catch(e){
						t.assertJilException(e, Widget.ExceptionTypes.UNSUPPORTED);
					}
				}
			},
			
			//
			// getFolderNames
			//
			{
				id: 1500,
				name: "getFolderNames - Verify folders in SMS.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in SMS?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.SMSMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			{
				id: 1600,
				name: "getFolderNames - Verify folders in MMS.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in MMS?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.MMSMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			{
				id: 1700,
				name: "getFolderNames - Verify folders in EMail.",
				requiredObjects:["Widget.Messaging.getFolderNames"],
				expectedResult:"Are the following the folders that exist in EMail?",
				test: function(t) {
					var ret = wm.getFolderNames(wmt.EmailMessage);
					dohx.showInfo("API reports: ", ret);
				}
			},
			
			//
			// copyMessageToFolder
			//
			
			//
			// moveMessageToFolder
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
