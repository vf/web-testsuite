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
					"Copy the content of the testsuite's zip-file's  folder 'audio' into the music directory on the phone. (The exact name of the destination folder may vary on your device.)",
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
			name:"Attachment (all properties)",
			test:function(){
// TODO
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
		{
			id: 1006,
			name:"Device.setRingtone",
			test:function(){
				var addressBookItem = Widget.PIM.getAddressBookItem(config.validAddressBookItemId);
				Widget.Device.setRingtone(config.fileSystem.playableAudioFiles.onDevice.loopMp3, addressBookItem);
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
		
		//
		//	GPS, PositionInfo ...
		//
		{
			id: 1400,
			loopAllProperties:"Widget.Device.PositionInfo"
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
