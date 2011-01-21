(function(){
	
	var permissionLevels = {
		UNSIGNED:0,
		DEVELOPER_SIGNED:1,
		OPERATOR_SIGNED:2
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//	Configure BEGIN
	//
	//	This should be set depending on the way the widget is built!!!!!!!!!!!
	//
	//var runTestWithPermissionLevel = permissionLevels.UNSIGNED;
	//var testGroupName = "Unsigned tests";
	//var runTestWithPermissionLevel = permissionLevels.OPERATOR_SIGNED;
	//var testGroupName = "Operator signed tests";
	var runTestWithPermissionLevel = permissionLevels.DEVELOPER_SIGNED;
	var testGroupName = "Developer signed tests";
	
	// Give a regexp that will be used to filter test names that will be
	// executed. This is handy for packaging just a couple of the tests,
	// to have just a small handier test widget.
	var executeOnly = /accelerometer|account/i;
	var executeOnly = /addressbook/i;
	var executeOnly = /calendar/i;
	var executeOnly = /application/i;
	var executeOnly = /video|audio|multimedia/i;
	var executeOnly = /telephony/i;
	var executeOnly = /file/i;
	var executeOnly = /deviceinfo/i;
	var executeOnly = /devicestateinfo/i;
	var executeOnly = /position/i;
	// Find all Widget.methods() (everything that starts with a lower case letter after "Widget." and has no more dots afterwards.)
	var executeOnly = /^Widget.[a-z][^.]+$/;
	var executeOnly = /.*/; // leave this as default, since the csv.html which generates the test overview wants to see all tests!
	
	//
	//	Configure END
	//	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var key = ("executeOnly: "+executeOnly).replace(/[^0-9a-z]+/gi, "");
	if (Widget.preferenceForKey(key)){
		var node = embed.create("div", {className:"warningOverlay", innerHTML: "This widget had been started before.<br /><br />All the tests MUST be executed on the first start of the widget!<br /><br /> Please uninstall it and launch the this widget again."}, embed.body());
	}
	Widget.setPreferenceForKey(true, key);
	
	var p = permissions = {
		ALLOWED: 1,
		DISALLOWED: 2,
		ONE_SHOT: 3,
		BLANKET: 4,
		SESSION: 5,
		UNRESTRICTED: 6 // We use this actually ONLY for defining the expectedResults string below.
	};
	var expectedResults = {};
	expectedResults[p.ALLOWED]  = "No security dialog should have opened, was that the case?";
	expectedResults[p.ONE_SHOT] = "Did you have to confirm the security message?";
	expectedResults[p.BLANKET] = "Did you have to confirm the security message?";
	expectedResults["BLANKET 2nd+ message"] = "No security dialog should have opened, was that the case?";
	expectedResults[p.SESSION] = "Did you have to confirm the security message?";
	expectedResults["SESSION 2nd message"] = "No security dialog should have opened, was that the case?";
	expectedResults[p.UNRESTRICTED] = "No security dialog should have opened, was that the case?";
	
	var instructions = [
		"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
		"At least one contact has to exist on the phone. (contact with the ID '" + config.validAddressBookItemId + "' will be used)",
		//"Copy the content of the testsuite's zip-file's  folder 'audio' into the music directory on the phone. (The exact name of the destination folder may vary on your device.)",
		"At least one calendar item has to exist on the phone. (calender item with the ID '" + config.validCalendarItemId + "' will be used)",
		"At least one MISSED call has to exist on the phone.",
		//"Copy the content of the testsuite's zip-file's  folder 'video' into the videos directory on the phone. (The exact name of the destination folder may vary on your device.)",
		"Click 'GO' to start testing."
	];
	
	dohx.add({name:testGroupName,
		mqcExecutionOrderBaseOffset:350000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:1,
				name:"Verify Preconditions",
				instructions:instructions,
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			}
		]
	});
	
	//
	// Test helpers
	// 
	var tmp = {}; // Use this variable to pass values from one test to another.
	function loopAllProperties(obj){
		// summary:
		// 		Use this to loop over all the properties of an object to ensure they all are accessible.
		// 		Mostly this is used testing unrestricted access.
		for (var key in obj){
			var val = obj[key];
		}
	}
	
	var tests = [
		// Add the tests always with every 2nd ID, so we have one gap inbetween which we
		// need for ONE_SHOT which automatically generates another test right afterwards
		// to check that every time the security dialog is prompted.
		// Dont use ID+100 steps because we will have a looooot tests in here.
		//
		// All the tests try to affect ONLY the functionality that shall be tested for.
		// E.g. if addAddressBookItem is tested we actually need to do the following:
		// 		var addr = new pim.AddressBookItem();  				=>  UNRESTRICTED
		//		addr.setAttributeValue("address", "test Address " + uniqueString);  => UNRESTRICTED
		//		pim.addAddressBookItem(addr);						=> ONE_SHOT, BLANKET, ALLOWED
		// which basically uses three different methods that have three different security settings.
		// There we split this up in three separate tests! And we use the global variable "tmp"
		// to pass the data from one test to another, see tests 318, 320, 322.
		
		//
		//	AccelerometerInfo
		//
		{
			id:100,
			name:"AccelerometerInfo (all properties)",
			test: function(t){
				var obj = Widget.Device.DeviceStateInfo.AccelerometerInfo;
				var x = obj.xAxis;
				var y = obj.yAxis;
				var z = obj.zAxis;
			}
		},
		{
			id:102,
			propertyToTest:"Widget.Device.DeviceStateInfo.AccelerometerInfo"
		},
		
		//
		//	AccountInfo
		//
		{
			id: 200,
			name: "Account.accountId (Widget.Messaging.getCurrentEmailAccount)",
			test: function(t){
				var acc = Widget.Messaging.getCurrentEmailAccount()
				var val = acc.accountId;
			}
		},
		{
			id: 202,
			name: "Account.accountName (Widget.Messaging.getCurrentEmailAccount)",
			test: function(t){
				var acc = Widget.Messaging.getCurrentEmailAccount()
				var val = acc.accountName;
			}
		},
		{
			id: 204,
			name: "Widget.Device.AccountInfo.phoneUserUniqueId",
			test: function(t){
				var val = Widget.Device.AccountInfo.phoneUserUniqueId;
			}
		},
		{
			id: 206,
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.phoneMSISDN"
		},
		{
			id: 208,
			propertyToTest:"Widget.Device.AccountInfo.phoneOperatorName"
		},
		{
			id: 210,
			permissions:[p.BLANKET, p.BLANKET, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.userSubscriptionType"
		},
		{
			id: 212,
			permissions:[p.BLANKET, p.BLANKET, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.userAccountBalance"
		},
		
		//
		//	Addressbook stuff - PIM, AddressBook, AddressBookItem
		//
		{
			// Do this before the tests that just check the access on AddressBookItem properties, so they
			// can use the returned object.
			id: 300,
			name:"PIM.getAddressBookItem",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp = {addressBookItem:Widget.PIM.getAddressBookItem(config.validAddressBookItemId)};
				if (!tmp.addressBookItem){
					throw new Error("WRT Bug!? Following tests might fail. No valid AddressBookItem returned by 'Widget.PIM.getAddressBookItem(\"" + config.validAddressBookItemId +  "\")'.");
				}
			}
		},
		{
			// Do this before the tests that just check the access on AddressBookItem properties, so they
			// can use the returned object.
			id: 302,
			name:"PIM.getAvailableAddressGroupNames",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp.addressGroupNames = Widget.PIM.getAvailableAddressGroupNames();
				if (!tmp.addressGroupNames){
					throw new Error("WRT Bug!? Following tests might fail. Widget.PIM.getAvailableAddressGroupNames() returned '" + tmp.addressGroupNames + "'.");
				}
			}
		},
		{
			id: 304,
			name:"AddressBook (all properties)",
			test:function(){
				loopAllProperties(tmp.addressBookItem);
			}
		},
		{
			id: 306,
			name:"PIM.AddressBookItem.getAddressGroupNames",
			test:function(){
				tmp.addressBookItem.getAddressGroupNames();
			}
		},
		{
			id: 308,
			name:"PIM.AddressBookItem.getAttributeValue",
			test:function(){
				tmp.addressBookItem.getAttributeValue("fullName");
			}
		},
		{
			id: 310,
			name:"PIM.AddressBookItem.getAvailableAttributes",
			test:function(){
				tmp.addressBookItem.getAvailableAttributes();
			}
		},
		{
			id: 312,
			name:"PIM.AddressBookItem.setAddressGroupNames",
			test:function(){
				tmp.addressBookItem.setAddressGroupNames(tmp.addressGroupNames);
			}
		},
		{
			id: 314,
			name:"PIM.AddressBookItem.setAttributeValue",
			test:function(){
				// Use some random phonenumber so we are sure update() will have work.
				tmp.addressBookItem.setAttributeValue("mobilePhone", (""+Math.random()).replace(/[^0-9]/, ""));
			}
		},
		{
			id: 316,
			name:"PIM.AddressBookItem.update",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp.addressBookItem.update();
			}
		},
		{
			id: 318,
			name:"PIM.AddressBookItem - new Widget.PIM.AddressBookItem",
			test:function(){
				tmp.newAddressBookItem = new Widget.PIM.AddressBookItem();
			}
		},
		{
			// This is actually a duplicate test, but this one is working on a new AddressBookItem
			// unlike test 314 which works on an existing item.
			id: 320,
			name:"PIM.AddressBookItem.setAttributeValue",
			test:function(){
				var uniqueString = new Date().getTime();
				var _testFullName = "test Contact " + uniqueString;
				tmp.newAddressBookItem.setAttributeValue("fullName", _testFullName);
				tmp.newAddressBookItem.setAttributeValue("address", "test Address " + uniqueString);
			}
		},
		{
			id: 322,
			name:"PIM.addAddressBookItem",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.addAddressBookItem(tmp.newAddressBookItem);
			}
		},
		{
			id: 324,
			name:"PIM.getAddressBookGroupMembers",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.getAddressBookGroupMembers(tmp.addressGroupNames[0]);
			}
		},
		{
			id: 326,
			name:"PIM.createAddressBookGroup",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				var name = "TestGroup-" + new Date().getTime(); // Prevent nameclashes
				tmp.newAddressBookGroup = Widget.PIM.createAddressBookGroup(name);
			}
		},
		{
			id: 328,
			name:"PIM.deleteAddressBookGroup",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.PIM.deleteAddressBookGroup(tmp.newAddressBookGroup);
			}
		},
		{
			id: 330,
			name:"PIM.deleteAddressBookItem",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.PIM.deleteAddressBookItem(tmp.newAddressBookItem);
			}
		},
		{
			id: 332,
			name:"PIM.exportAsVCard",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.exportAsVCard([tmp.addAddressBookItem]);
			}
		},
		{
			id: 334,
			name:"PIM.findAddressBookItems",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.findAddressBookItems(tmp.addressBookItem, 0, 10);
			}
		},
		{
			id: 336,
			name:"Device.setRingtone",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.setRingtone(config.fileSystem.playableAudioFiles.onDevice.loopMp3, tmp.addressBookItem);
			}
		},
		{
			id: 338,
			name:"Device.getAddressBookItemsCount",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.getAddressBookItemsCount();
			}
		},
		{
			id: 340,
			name:"Device.onAddressBookItemsFound",
			test:function(){
				Widget.PIM.onAddressBookItemsFound = function(){}
			}
		},
		{
			id: 342,
			name:"Device.onVCardExportingFinish",
			test:function(){
				Widget.PIM.onVCardExportingFinish = function(){}
			}
		},
		
		
		//
		//	Application, ApplicationTypes
		//
		{
			id: 400,
			loopAllProperties:"Widget.Device.ApplicationTypes"
		},
		{
			id: 402,
			name:"Device.getAvailableApplications",
			permissions:[p.BLANKET, p.ALLOWED, p.ALLOWED],
			test:function(){
				Widget.Device.getAvailableApplications();
			}
		},
		{
			id: 404,
			name:"Device.launchApplication",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.launchApplication(Widget.Device.ApplicationTypes.BROWSER);
			}
		},
		
/*		//
		//	Messaging, Attachment
		//
		{
			id: 500,
			propertyToTest:"Widget.Messaging.MessageTypes"
		},
		{
			id: 502,
			propertyToTest:"Widget.Messaging.MessageFolderTypes"
		},
		{
			id: 504,
			name:"Attachment (all properties)",
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 504,
			name:"Message (all properties)",
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 506,
			name:"Message.addAddress",
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 508,
			name:"Message.addAttachment",
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 510,
			name:"Message.deleteAddress",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 512,
			name:"Message.deleteAttachment",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 514,
			name:"Message.saveAttachment",
			permissions:[p.ONE_SHOT, p.SESSION, p.BLANKET],
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 516,
			name:"MessageQuantities",
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 518,
			name:"Messaging.copyMessageToFolder",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 520,
			name:"Messaging.createFolder",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
throw new Error("TODO - test needs to be implemented still");
			}
		},
		{
			id: 522,
			name:"Messaging........",
			test:function(){
throw new Error("TODO - a looooooooot of messaaging tests still missing");
			}
		},
*/
		
		//
		//	AudioPlayer
		//
		{
			id: 600,
			name:"AudioPlayer.open",
			test:function(){
				// We use the inWidget.songMp3 just because operas WRT for android currently cant open file:/// urls
				// it throws invalid_parameter ... grrrr but we want to be able to do this and the following tests :-|
				Widget.Multimedia.AudioPlayer.open(config.fileSystem.playableAudioFiles.inWidget.songMp3);
			}
		},
		{
			id: 602,
			name:"AudioPlayer.play",
			test:function(){
				Widget.Multimedia.AudioPlayer.play(1);
			}
		},
		{
			id: 604,
			name:"AudioPlayer.pause",
			test:function(){
				Widget.Multimedia.AudioPlayer.pause();
			}
		},
		{
			id: 606,
			name:"AudioPlayer.resume",
			test:function(){
				Widget.Multimedia.AudioPlayer.resume();
			}
		},
		{
			id: 608,
			name:"AudioPlayer.stop",
			test:function(){
				Widget.Multimedia.AudioPlayer.stop();
			}
		},
		{
			id: 610,
			name:"AudioPlayer.onStateChange",
			test:function(){
				Widget.Multimedia.AudioPlayer.onStateChange = function(){};
			}
		},
		{
			id: 612,
			name:"Multimedia.getVolume",
			test:function(){
				var v = Widget.Multimedia.getVolume();
			}
		},
		{
			id: 614,
			name:"Multimedia.stopAll",
			test:function(){
				var v = Widget.Multimedia.stopAll();
			}
		},
		{
			id: 616,
			propertyToTest:"Widget.Multimedia.isAudioPlaying"
		},
		
		//
		// Calendar stuff - CalendarItem, PIM
		//
		{
			id: 700,
			name:"PIM.getCalendarItem",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp = {calendarItem: Widget.PIM.getCalendarItem(config.validCalendarItemId)};
			}
		},
		{
			id: 702,
			name:"CalendarItem (all properties)",
			test:function(){
				loopAllProperties(tmp.calendarItem);
			}
		},
		{
			id: 704,
			name:"CalendarItem.update",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp.calendarItem.eventName = "Foo " + new Date().getTime();
				tmp.calendarItem.update();
			}
		},
		{
			id: 706,
			loopAllProperties:"Widget.PIM.EventRecurrenceTypes"
		},
		{
			id: 708,
			name:"CalendarItem - new CalendarItem",
			test:function(){
				tmp.newCalendarItem = new Widget.PIM.CalendarItem();
			}
		},
		{
			id: 710,
			name:"PIM.addCalendarItem",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				var item = tmp.newCalendarItem;
				item.startTime = new Date();
				item.eventName = "Meeting";
				Widget.PIM.addCalendarItem(item);
			}
		},
		{
			id: 712,
			name:"PIM.deleteCalendarItem",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.PIM.deleteCalendarItem(tmp.newCalendarItem);
			}
		},
		{
			id: 714,
			name:"PIM.findCalendarItems",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.findCalendarItems(tmp.calendarItem, 0, 10);
			}
		},
		{
			id: 716,
			name:"PIM.getCalendarItems",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				var year = new Date().getFullYear();
				Widget.PIM.getCalendarItems(new Date(year, 0, 1), new Date(year, 11, 1));
			}
		},
		{
			id: 718,
			name:"PIM.onCalendarItemAlert",
			test:function(){
				Widget.PIM.onCalendarItemAlert = function(){}
			}
		},
		{
			id: 720,
			name:"PIM.onCalendarItemsFound",
			test:function(){
				Widget.PIM.onCalendarItemsFound = function(){}
			}
		},
		
		//
		//	Telephony stuff - CallRecord, CallRecordTypes
		//
		{
			id: 800,
			name:"Telephony - new Telephony",
			test:function(){
				tmp.searchForCallRecord = new Widget.Telephony.CallRecord();
			}
		},
		{
			id: 802,
			name:"Telephony.onCallRecordsFound",
			test:function(){
				Widget.Telephony.onCallRecordsFound = function(res){
					if (res.length==0){
						tmp = {callRecord:{}};
// TODO this currently doesnt work with the test framework yet, because we add "expectedResult" which
// makes t.failure() not work :( yet!!! should be fixed in dohx or doh2
						t.failure("No MISSED call found. Following tests will fail too.");
					}
					tmp = {callRecord:res[0]};
				}
			}
		},
		{
			id: 804,
			name:"Telephony.findCallRecords",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			requiredObjects:["Widget.Telephony.CallRecordTypes", "Widget.Telephony.findCallRecords"],
			timeout:100,
			test:function(t){
				var searchFor = tmp.searchForCallRecord;
				searchFor.callRecordType = Widget.Telephony.CallRecordTypes.MISSED;
				Widget.Telephony.findCallRecords(searchFor, 0, 10);
			}
		},
		{
			id: 806,
			name:"Telephony.getCallRecord",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				var types = Widget.Telephony.CallRecordTypes;
				Widget.Telephony.getCallRecord(types.MISSED, tmp.callRecord.callRecordId);
			}
		},
		{
			id: 808,
			name:"CallRecord (all properties)",
			test:function(){
				loopAllProperties(tmp.callRecord);
			}
		},
		{
			id: 810,
			loopAllProperties:"Widget.Telephony.CallRecordTypes"
		},
		{
			id: 812,
			name:"Telephony.deleteCallRecord",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.Telephony.deleteCallRecord(tmp.callRecord);
			}
		},
		{
			id: 814,
			name:"Telephony.getCallRecordCnt",
			permissions:[p.SESSION, p.ALLOWED, p.ALLOWED],
			test:function(){
				Widget.Telephony.getCallRecordCnt();
			}
		},
		{
			id: 816,
			name:"Telephony.initiateVoiceCall",
			permissions:[p.ONE_SHOT, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.Telephony.initiateVoiceCall("+4921182000000");
			}
		},
		{
			id: 818,
			name:"Telephony.onCallEvent",
			test:function(){
				Widget.Telephony.onCallEvent = function(){}
			}
		},
		{
			id: 820,
			name:"Telephony.deleteAllCallRecords",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.Telephony.deleteAllCallRecords(Widget.Telephony.CallRecordTypes.MISSED);
			}
		},
		
		//
		//	Camera
		//
		{
			id: 900,
			name:"Multimedia.Camera.captureImage",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Multimedia.Camera.captureImage("test-img-" + new Date().getTime() + ".jpg", true);
			}
		},
		{
			id: 902,
			name:"Multimedia.Camera.startVideoCapture",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Multimedia.Camera.startVideoCapture(new Date().getTime() + "-video.mp4", true, 1, false);
			}
		},
		{
			id: 904,
			name:"Multimedia.Camera.stopVideoCapture",
			test:function(){
				Widget.Multimedia.Camera.stopVideoCapture();
			}
		},
		{
			id: 904,
			name:"Multimedia.Camera.onCameraCaptured",
			test:function(){
				Widget.Multimedia.Camera.onCameraCaptured = function(){}
			}
		},
		
		//
		//	config stuff - Config, ringtone, wallpaper etc.
		//
		{
			id: 1000,
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			loopAllProperties:"Widget.Device.DeviceStateInfo.Config"
		},
		{
			id: 1002,
			name:"Device.DeviceStateInfo.Config.setAsWallpaper",
			permissions:[p.ONE_SHOT, p.BLANKET, p.BLANKET],
			test:function(){
				Widget.Config.setAsWallpaper("img/logo.jpg");
			}
		},
		{
			id: 1004,
			name:"Device.DeviceStateInfo.Config.setDefaultRingtone",
			test:function(){
				Widget.Device.DeviceStateInfo.Config.setDefaultRingtone(config.fileSystem.playableAudioFiles.onDevice.loopMp3);
			}
		},
		
		//
		//	DataNetwork
		//
		{
			id: 1100,
			loopAllProperties:"Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes"
		},
		{
			id: 1102,
			loopAllProperties:"Widget.Device.DataNetworkInfo"
		},
		{
			id: 1104,
			name:"Device.DataNetworkInfo.onNetworkConnectionChanged",
			test:function(){
				Widget.Device.DataNetworkInfo.onNetworkConnectionChanged = function(){}
			}
		},
		{
			id: 1106,
			name:"Device.DataNetworkInfo.getNetworkConnectionName",
			test:function(){
				Widget.Device.DataNetworkInfo.getNetworkConnectionName("wifi");
			}
		},
		{
			id: 1108,
			propertyToTest:"Device.DataNetworkInfo.isDataNetworkConnected"
		},
		
		//
		//	File
		//
		{
			id: 1200,
			name:"Device.copyFile",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				// We do all the copying of files here, also for those that we will use later, i.e. for deleting or moving, etc.
				// because we should NOT do copy inside the "deleteFile" or "moveFile"-test, since that might
				// blur the test result.
				tmp = {
					deleteFile: config.fileSystem.writeablePath + "delete-file-" + new Date().getTime(),
					moveFile: config.fileSystem.writeablePath + "move-file-" + new Date().getTime()
				};
				Widget.Device.copyFile(config.fileSystem.readableFile, tmp.deleteFile);
				Widget.Device.copyFile(config.fileSystem.readableFile, tmp.moveFile);
			}
		},
		{
			id: 1202,
			name:"Device.deleteFile",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.deleteFile(tmp.deleteFile);
			}
		},
		{
			id: 1204,
			name:"Device.findFiles",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				var f = new Widget.Device.File();
				f.fileName = "*.jpg";
				Widget.Device.findFiles(f, 0, 10);
			}
		},
		{
			id: 1206,
			name:"Device.onFilesFound",
			test:function(){
				Widget.Device.onFilesFound = function(){};
			}
		},
		{
			id: 1208,
			name:"Device.getDirectoryFileNames",
			permissions:[p.BLANKET, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.getDirectoryFileNames(config.fileSystem.readablePath);
			}
		},
		{
			id: 1210,
			name:"Device.getFile",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.getFile(config.fileSystem.readableFile);
			}
		},
		{
			id: 1212,
			name:"Device.getFileSystemRoots",
			permissions:[p.BLANKET, p.ALLOWED, p.ALLOWED],
			test:function(){
				Widget.Device.getFileSystemRoots();
			}
		},
		{
			id: 1214,
			name:"Device.getFileSystemSize",
			test:function(){
				Widget.Device.getFileSystemSize("/");
			}
		},
		{
			id: 1216,
			name:"Device.moveFile",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Device.moveFile(tmp.moveFile, tmp.moveFile+"-moved");
			}
		},
		{
			id: 1218,
			loopAllProperties:"Widget.Device.File"
		},
		
		//
		//	info stuff - AccountInfo, DeviceInfo, etc.
		//
		{
			id: 1300,
			loopAllProperties:"Widget.Device.AccountInfo"
		},
		{
			id: 1302,
			loopAllProperties:"Widget.Device.DeviceInfo"
		},
		{
			id: 1304,
			loopAllProperties:"Widget.Device.DeviceStateInfo"
		},
		{
			id: 1306,
			loopAllProperties:"Widget.Device.PowerInfo"
		},
		{
			id: 1308,
			loopAllProperties:"Widget.Device.RadioInfo"
		},
		{
			id: 1310,
			name:"Device.clipboardString",
			permissions:[p.SESSION, p.ALLOWED, p.ALLOWED],
			test:function(){
				var val = Widget.Device.clipboardString;
			}
		},
		{
			id: 1312,
			propertyToTest:"Widget.Device.widgetEngineName"
		},
		{
			id: 1314,
			propertyToTest:"Widget.Device.widgetEngineProvider"
		},
		{
			id: 1316,
			propertyToTest:"Widget.Device.widgetEngineVersion"
		},
		{
			id: 1318,
			propertyToTest:"Widget.Device.DeviceInfo.ownerInfo"
		},
		{
			id: 1320,
			propertyToTest:"Widget.Device.DeviceInfo.phoneColorDepthDefault"
		},
		{
			id: 1322,
			propertyToTest:"Widget.Device.DeviceInfo.phoneFirmware"
		},
		{
			id: 1324,
			propertyToTest:"Widget.Device.DeviceInfo.phoneManufacturer"
		},
		{
			id: 1326,
			propertyToTest:"Widget.Device.DeviceInfo.phoneModel"
		},
		{
			id: 1328,
			propertyToTest:"Widget.Device.DeviceInfo.phoneOS"
		},
		{
			id: 1330,
			propertyToTest:"Widget.Device.DeviceInfo.phoneSoftware"
		},
		{
			id: 1332,
			propertyToTest:"Widget.Device.DeviceInfo.screenHeightDefault"
		},
		{
			id: 1334,
			propertyToTest:"Widget.Device.DeviceInfo.screenWidthDefault"
		},
		{
			id: 1336,
			propertyToTest:"Widget.Device.DeviceInfo.totalMemory"
		},
		{
			id: 1338,
			name:"DeviceStateInfo.onScreenChangeDimensions",
			test:function(){
				Widget.Device.DeviceStateInfo.onScreenChangeDimensions = function(width, height){}
			}
		},
		{
			id: 1340,
			name:"DeviceStateInfo.onFlipEvent",
			test:function(){
				Widget.Device.DeviceStateInfo.onScreenChangeDimensions = function(width, height){}
			}
		},
		{
			id: 1342,
			propertyToTest:"Widget.Device.DeviceStateInfo.keypadLightOn"
		},
		{
			id: 1344,
			propertyToTest:"Widget.Device.DeviceStateInfo.backLightOn"
		},
		{
			id: 1346,
			propertyToTest:"Widget.Device.DeviceStateInfo.availableMemory"
		},
		{
			id: 1348,
			propertyToTest:"Widget.Device.DeviceStateInfo.language"
		},
		{
			id: 1348,
			propertyToTest:"Widget.Device.DeviceStateInfo.audioPath"
		},
		{
			id: 1350,
			propertyToTest:"Widget.Device.DeviceStateInfo.processorUtilizationPercent"
		},
		{
			id: 1352,
			name:"PowerInfo.onLowBattery",
			test:function(){
				Widget.Device.PowerInfo.onLowBattery = function(){}
			}
		},
		{
			id: 1354,
			name:"PowerInfo.onChargeLevelChange",
			test:function(){
				Widget.Device.PowerInfo.onChargeLevelChange = function(){}
			}
		},
		{
			id: 1356,
			name:"PowerInfo.onChargeStateChange",
			test:function(){
				Widget.Device.PowerInfo.onChargeStateChange = function(){}
			}
		},
		{
			id: 1358,
			propertyToTest:"Widget.Device.PowerInfo.isCharging"
		},
		{
			id: 1360,
			propertyToTest:"Widget.Device.PowerInfo.percentRemaining"
		},
		{
			id: 1362,
			propertyToTest:"Widget.Device.RadioInfo.isRadioEnabled"
		},
		{
			id: 1364,
			propertyToTest:"Widget.Device.RadioInfo.isRoaming"
		},
		{
			id: 1366,
			propertyToTest:"Widget.Device.RadioInfo.radioSignalSource"
		},
		{
			id: 1368,
			propertyToTest:"Widget.Device.RadioInfo.radioSignalStrengthPercent"
		},
		{
			id: 1370,
			name:"RadioInfo.onSignalSourceChange",
			test:function(){
				Widget.Device.RadioInfo.onSignalSourceChange = function(){}
			}
		},
		{
			id: 1372,
			loopAllProperties:"Widget.Device.RadioInfo.RadioSignalSourceTypes"
		},
		
		//
		//	GPS, PositionInfo ...
		//
		{
			id: 1400,
			name:"DeviceStateInfo.onPositionRetreived",
			test:function(){
				Widget.Device.DeviceStateInfo.onPositionRetreived = function(pos){
					tmp = {positionInfo:pos};
				}
			}
		},
		{
			id: 1402,
			name:"DeviceStateInfo.requestPositionInfo",
			permissions:[p.ONE_SHOT, p.SESSION, p.ALLOWED],
			test:function(){
				var c = config.geolocation;
				var fastestLocationService = c.supportsCellId ? "cellid" : (c.supportsAgps ? "agps" : "gps");
				Widget.Device.DeviceStateInfo.requestPositionInfo(fastestLocationService);
			}
		},
		{
			id: 1404,
			loopAllProperties:"Widget.Device.PositionInfo"
		},
		
		//
		//	Video
		//
		{
			id: 1500,
			loopAllProperties:"Widget.Multimedia.isVideoPlaying"
		},
		{
			id: 1502,
			name:"Multimedia.VideoPlayer.setWindow",
			test:function(){
				dohx.showInfo('<object id="_videoWindow_" type="video/3gp" width="320" height="240" />');
				Widget.Multimedia.VideoPlayer.setWindow(util.byId("_videoWindow_"));
			}
		},
		{
			id: 1504,
			name:"Multimedia.VideoPlayer.onStateChange",
			test:function(){
				Widget.Multimedia.VideoPlayer.onStateChange = function(){}
			}
		},
		{
			id: 1506,
			name:"Multimedia.VideoPlayer.open",
			test:function(){
				Widget.Multimedia.VideoPlayer.open(config.playableVideoFiles.mp4.inWidget);
			}
		},
		{
			id: 1508,
			name:"Multimedia.VideoPlayer.play",
			test:function(){
				Widget.Multimedia.VideoPlayer.play(1);
			}
		},
		{
			id: 1508,
			name:"Multimedia.VideoPlayer.pause",
			test:function(){
				Widget.Multimedia.VideoPlayer.pause();
			}
		},
		{
			id: 1510,
			name:"Multimedia.VideoPlayer.resume",
			test:function(){
				Widget.Multimedia.VideoPlayer.resume();
			}
		},
		{
			id: 1512,
			name:"Multimedia.VideoPlayer.stop",
			test:function(){
				Widget.Multimedia.VideoPlayer.stop();
			}
		},

		//
		//	Widget
		//
		{
			id: 1600,
			name: "Widget.onFocus",
			test:function(){
				Widget.onFocus = function(){}
			}
		},
		{
			id: 1602,
			name: "Widget.onMaximize",
			test:function(){
				Widget.onFocus = function(){}
			}
		},
		{
			id: 1604,
			name: "Widget.onRestore",
			test:function(){
				Widget.onFocus = function(){}
			}
		},
		{
			id: 1606,
			name: "Widget.onWakeup",
			test:function(){
				Widget.onFocus = function(){}
			}
		},
		{
			id: 1608,
			name: "Widget.openURL",
			test:function(){
				Widget.openURL("http://vodafone.com");
			}
		},
		{
			id: 1610,
			name: "Widget.setPreferenceForKey",
			test:function(){
				Widget.setPreferenceForKey(1, "test_key");
			}
		},
		{
			id: 1612,
			name: "Widget.preferenceForKey",
			test:function(){
				Widget.preferenceForKey("test_key");
			}
		},
//*/
	];
	
	
	
	
	
	
	//
	// Generate tests for adding them.
	//
	var testsToAdd = [];
	for (var i=0, l=tests.length, t; i<l; i++){
		t = tests[i];
		
		// Check if the test shall be added at all.
		// Depending on config.unsupportedApis we add tests that are not in there,
		// we match this against:  t.name || t.propertyToTest || t.loopAllProperties
		// If test.api is not given we expect test.name to contain exactly the API's name/string.
		var apiString = t.name || t.propertyToTest || t.loopAllProperties;
		if (apiString.split(" ").length){ // If the name of the test starts with the API remove the rest behind it.
			apiString = apiString.split(" ")[0];
		}
		if (apiString.indexOf("Widget")!=0){
			apiString = "Widget." + apiString;
		}
		// Add only the tests to the test set that match the "executeOnly" expression.
		if (!apiString.match(executeOnly)){
			continue;
		}
		
		var tmp = doh.util.mixin({}, t); // Clone all props.
		t.test = t.test || null;
		tmp.mustSupportApis = [apiString]; // Let the test itself handle the API supported stuff.
		// Generate the function "test" if it doesn't exist.
		if (tmp.test==null){
			if (t.propertyToTest){
				tmp.name = t.propertyToTest;
				tmp.requiredObjects = [t.propertyToTest];
				tmp.test = (function(objName){
					return function(){ var val = util.getObject(objName); }
				})(t.propertyToTest);
			} else if (t.loopAllProperties){
				// Make the object to loop over also required.
				tmp.name = t.loopAllProperties;
				tmp.requiredObjects = [t.loopAllProperties];
				tmp.test = (function(objName){
					return function(){ loopAllProperties(objName); }
				})(t.loopAllProperties);
			} else {
				throw new Error("No test function found for " + t.name + " (ID=" + t.id + ")");
			}
		}
		// No permission given => unrestricted
		if (typeof t.permissions=="undefined"){
			tmp.expectedResult = expectedResults[p.UNRESTRICTED];
		} else {
			var curPerm = t.permissions[runTestWithPermissionLevel];
			tmp.expectedResult = expectedResults[curPerm];
			if (curPerm==p.DISALLOWED){
				tmp.test = (function(testFnc){
					return function(t){
						try{
							testFnc();
							t.failure("Expected SECURITY Exception to be thrown.");
						}catch(e){
							t.assertJilException(e, Widget.ExceptionTypes.SECURITY);
						}
					}
				})(tmp.test);
			} else if (curPerm==p.ONE_SHOT){
				// ONE_SHOT means the user has to confirm every time the method is called,
				// so call it a second time to see that it has to be confirmed again and it is not
				// once per session.
				testsToAdd.push(doh.util.mixin({}, tmp));
				tmp.id = tmp.id+1;
			} else if (curPerm==p.SESSION){
				// SESSION means the user has to confirm once per session!
				// So we call the test a second time with a different expectedResult.
				testsToAdd.push(doh.util.mixin({}, tmp));
				tmp.id = tmp.id+1;
				tmp.expectedResult = expectedResults["SESSION 2nd message"];
			} else if (curPerm==p.BLANKET){
				// BLANKET means the user has to confirm once after the widget had been first installed,
				// we store this in the key+value store and the user should never be asked again.
				// If there is something in the keyvalue store than this method had been called, so just
				// verify no msg appears, otherwise trigger the method twice to verify the security msg appears
				// and that it doesnt later.
				var key = "BLANKET_" + tmp.id;
				if (!Widget.preferenceForKey(key)){
					tmp.expectedResult = expectedResults[p.BLANKET];
					var actualTest = tmp.test;
					tmp.test = (function(testFnc){
						return function(t){
							Widget.setPreferenceForKey(true, key);
							testFnc();
						}
					})(tmp.test);
					testsToAdd.push(doh.util.mixin({}, tmp));
					tmp.test = actualTest;
					tmp.id = tmp.id+1;
				}
				tmp.expectedResult = expectedResults["BLANKET 2nd+ message"];
			}
		}
		testsToAdd.push(tmp);
	}
	
	dohx.add({name:testGroupName,
		mqcExecutionOrderBaseOffset:350000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:testsToAdd
	});
}());
