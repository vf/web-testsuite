(function(){
	
	var permissionLevels = {
		UNSIGNED:0,
		DEVELOPER_SIGNED:1,
		OPERATOR_SIGNED:2
	};
	
	//
	//	Configure BEGIN
	//
	//	This should be set depending on the way the widget is built!!!!!!!!!!!
	//
	var runTestWithPermissionLevel = permissionLevels.UNSIGNED;
	var testGroupName = "Unsigned tests";
	//var runTestWithPermissionLevel = permissionLevels.OPERATOR_SIGNED;
	//var testGroupName = "Operator signed tests";
	//
	//	Configure END
	//
	
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
	expectedResults[p.BLANKET] = "blanket question ...";
	expectedResults[p.SESSION] = "Did you have to confirm the security message?";
	expectedResults["SESSION 2nd message"] = "No security dialog should have opened, was that the case?";
	expectedResults[p.UNRESTRICTED] = "No security dialog should have opened, was that the case?";
	
	
	dohx.add({name:testGroupName,
		mqcExecutionOrderBaseOffset:350000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:[
			{
				id:1,
				name:"Verify Preconditions",
				instructions:[
					"Make sure all the preconditions listed are met. They will be required by upcoming tests.",
					"At least one contact has to exist on the phone. (contact with the ID '" + config.validAddressBookItemId + "' will be used)",
					"Copy the content of the testsuite's zip-file's  folder 'audio' into the music directory on the phone. (The exact name of the destination folder may vary on your device.)",
					"At least one calendar item has to exist on the phone. (calender item with the ID '" + config.validCalendarItemId + "' will be used)",
					"At least one MISSED call has to exist on the phone.",
					"Click 'GO' to start testing."
				],
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
			name: "AccountInfo.phoneUserUniqueId",
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
			name:"AddressBookItem.getAddressGroupNames",
			test:function(){
				tmp.addressBookItem.getAddressGroupNames();
			}
		},
		{
			id: 308,
			name:"AddressBookItem.getAttributeValue",
			test:function(){
				tmp.addressBookItem.getAttributeValue("fullName");
			}
		},
		{
			id: 310,
			name:"AddressBookItem.getAvailableAttributes",
			test:function(){
				tmp.addressBookItem.getAvailableAttributes();
			}
		},
		{
			id: 312,
			name:"AddressBookItem.setAddressGroupNames",
			test:function(){
				tmp.addressBookItem.setAddressGroupNames(tmp.addressGroupNames);
			}
		},
		{
			id: 314,
			name:"AddressBookItem.setAttributeValue",
			test:function(){
				// Use some random phonenumber so we are sure update() will have work.
				tmp.addressBookItem.setAttributeValue("mobilePhone", (""+Math.random()).replace(/[^0-9]/, ""));
			}
		},
		{
			id: 316,
			name:"AddressBookItem.update",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp.addressBookItem.update();
			}
		},
		{
			id: 318,
			name:"AddressBookItem - new Widget.PIM.AddressBookItem",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				tmp.newAddressBookItem = new Widget.PIM.AddressBookItem();
			}
		},
		{
			// This is actually a duplicate test, but this one is working on a new AddressBookItem
			// unlinke test 314 which works on an existing item.
			id: 320,
			name:"AddressBookItem.setAttributeValue",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
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
			id: 324,
			name:"PIM.createAddressBookGroup",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				var name = "TestGroup-" + new Date().getTime(); // Prevent nameclashes
				tmp.newAddressBookGroup = Widget.PIM.createAddressBookGroup(name);
			}
		},
		{
			id: 326,
			name:"PIM.deleteAddressBookGroup",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.PIM.deleteAddressBookGroup(tmp.newAddressBookGroup);
			}
		},
		{
			id: 328,
			name:"PIM.deleteAddressBookItem",
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			test:function(){
				Widget.PIM.deleteAddressBookItem(tmp.newAddressBookItem);
			}
		},
		{
			id: 330,
			name:"PIM.exportAsVCard",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.exportAsVCard([tmp.addAddressBookItem]);
			}
		},
		{
			id: 332,
			name:"PIM.findAddressBookItems",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.PIM.findAddressBookItems(tmp.addressBookItem, 0, 10);
			}
		},
		{
			id: 334,
			name:"Device.setRingtone",
			test:function(){
				Widget.Device.setRingtone(config.fileSystem.playableAudioFiles.onDevice.loopMp3, tmp.addressBookItem);
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
		
		//
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
		
		//
		//	AudioPlayer
		//
		{
			id: 600,
			name:"AudioPlayer.open",
			test:function(){
				Widget.Multimedia.AudioPlayer.open(config.fileSystem.playableAudioFiles.onDevice.songMp3);
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
				Widget.Multimedia.AudioPlayer.pause();
			}
		},
		{
			id: 608,
			name:"AudioPlayer.stop",
			test:function(){
				Widget.Multimedia.AudioPlayer.pause();
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
		
		//
		//	Telephony stuff - CallRecord, CallRecordTypes
		//
		{
			id: 800,
			name:"Telephony.findCallRecords",
			permissions:[p.SESSION, p.BLANKET, p.ALLOWED],
			requiredObjects:["Widget.Telephony.CallRecordTypes", "Widget.Telephony.findCallRecords"],
			timeout:100,
			test:function(t){
				Widget.Telephony.onCallRecordsFound = function(res){
					if (res.length==0){
						tmp = {callRecord:{}};
// TODO this currently doesnt work with the test framework yet, because we add "expectedResult" which
// makes t.failure() not work :( yet!!! should be fixed in dohx or doh2
						t.failure("No MISSED call found. Following tests will fail too.");
					}
					tmp = {callRecord:res[0]};
				}
				
				var types = Widget.Telephony.CallRecordTypes;
				var searchFor = new Widget.Telephony.CallRecord();
				searchFor.callRecordType = types.MISSED;
				Widget.Telephony.findCallRecords(searchFor, 0, 10);
			}
		},
		{
			id: 802,
			name:"Telephony.getCallRecord",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				var types = Widget.Telephony.CallRecordTypes;
				Widget.Telephony.getCallRecord(types.MISSED, tmp.callRecord.callRecordId);
			}
		},
		{
			id: 804,
			name:"CallRecord (all properties)",
			test:function(){
				loopAllProperties(tmp.callRecord);
			}
		},
		{
			id: 806,
			loopAllProperties:"Widget.Telephony.CallRecordTypes"
		},
		
		//
		//	Camera
		//
		{
			id: 900,
			name:"Camera.captureImage",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Camera.captureImage("test-img-" + new Date().getTime() + ".jpg", true);
			}
		},
		{
			id: 902,
			name:"Camera.startVideoCapture",
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			test:function(){
				Widget.Camera.startVideoCapture(new Date().getTime() + "-video.mp4", true, 1, false);
			}
		},
		{
			id: 904,
			name:"Camera.stopVideoCapture",
			test:function(){
				Widget.Camera.stopVideoCapture();
			}
		},
		{
			id: 904,
			name:"Camera.onCameraCaptured",
			test:function(){
				Widget.Camera.onCameraCaptured = function(){}
			}
		},
		
		//
		//	config stuff - Config, ringtone, wallpaper etc.
		//
		{
			id: 1000,
			permissions:[p.ONE_SHOT, p.BLANKET, p.ALLOWED],
			loopAllProperties:"Widget.Config"
		},
		{
			id: 1002,
			name:"Config.setAsWallpaper",
			permissions:[p.ONE_SHOT, p.BLANKET, p.BLANKET],
			test:function(){
				Widget.Config.setAsWallpaper("img/logo.jpg");
			}
		},
		{
			id: 1004,
			name:"Camera.setDefaultRingtone",
			test:function(){
				Widget.Config.setDefaultRingtone(config.fileSystem.playableAudioFiles.onDevice.loopMp3);
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
			name:"DataNetworkInfo.onNetworkConnectionChanged",
			test:function(){
				Widget.Device.DataNetworkInfo.onNetworkConnectionChanged = function(){}
			}
		},
		{
			id: 1106,
			name:"DataNetworkInfo.getNetworkConnectionName",
			test:function(){
				Widget.Device.DataNetworkInfo.getNetworkConnectionName("wifi");
			}
		},
		{
			id: 1108,
			name:"DataNetworkInfo.isDataNetworkConnected",
			test:function(){
				Widget.Device.DataNetworkInfo.isDataNetworkConnected();
			}
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
		
		//
		//	GPS, PositionInfo ...
		//
		{
			id: 1400,
			loopAllProperties:"Widget.Device.PositionInfo"
		},
		{
			id: 1402,
			name:"DeviceStateInfo.onPositionRetreived",
			test:function(){
				Widget.Device.DeviceStateInfo.onPositionRetreived = function(){}
			}
		},
		{
			id: 1404,
			name:"DeviceStateInfo.requestPositionInfo",
			permissions:[p.ONE_SHOT, p.SESSION, p.ALLOWED],
			test:function(){
				var c = config.geolocation;
				var fastestLocationService = c.supportsCellId ? "cellid" : (c.supportsAgps ? "agps" : "gps");
				Widget.Device.DeviceStateInfo.requestPositionInfo(fastestLocationService);
			}
		},
		
		//
		//	Video
		//
		{
			id: 1500,
			loopAllProperties:"Widget.Multimedia.isVideoPlaying"
		},

//*/
	];
	
	
	
	
	
	
	
	//
	// Generate tests for adding them.
	//
	var testsToAdd = [];
	for (var i=0, l=tests.length, t; i<l; i++){
		t = tests[i];
		var tmp = doh.util.mixin({}, t); // Clone all props.
		t.test = t.test || null;
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
			}
		}
		testsToAdd.push(tmp);
	}
	
	dohx.add({name:testGroupName,
		mqcExecutionOrderBaseOffset:350000, // This number is the base offset for the execution order, the test ID gets added. Never change this number unless you know what you are doing.
		tests:testsToAdd
	});
}());
