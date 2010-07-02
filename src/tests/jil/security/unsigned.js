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
		//	PIM, AddressBook, AddressBookItem
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
			name:"ApplicationTypes (all properties)",
			requiredObjects:["Widget.Device.ApplicationTypes"],
			test:function(){
				loopAllProperties(Widget.Device.ApplicationTypes);
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
		
//*/		
	];
	
	//
	// Generate tests for adding them.
	//
	var testsToAdd = [];
	for (var i=0, l=tests.length, t; i<l; i++){
		t = tests[i];
		var tmp = {
			id:t.id,
			name: t.name || t.propertyToTest,
			test: t.test || null
		};
		if (typeof t.propertyToTest!="undefined"){
			tmp.requiredObjects = [t.propertyToTest];
		}
		// Generate the function "test" if it doesn't exist.
		if (tmp.test==null){
			tmp.test = (function(objName){
				return function(){
					var val = util.getObject(objName);
				}
			})(t.propertyToTest);
		}
		// No permission given => unrestricted
		if (typeof t.permissions=="undefined"){
			tmp.expectedResult = expectedResults[p.UNRESTRICTED];
		} else {
			var curPerm = t.permissions[runTestWithPermissionLevel];
			tmp.expectedResult = expectedResults[curPerm];
			if (curPerm==p.DISALLOWED){
				tmp.test = (function(objName){
					return function(t){
						try{
							var val = util.getObject(objName);
							t.failure("Expected SECURITY Exception to be thrown.");
						}catch(e){
							t.assertJilException(e, Widget.ExceptionTypes.SECURITY);
						}
					}
				})(t.propertyToTest);
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
