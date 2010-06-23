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
	var runTestWithPermissionLevel = permissionLevels.DEVELOPER_SIGNED;
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
	expectedResults[p.BLANKET] = "blanket";
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
					"Click 'GO' to start testing."
				],
				test:function(t){
					t.success("Preconditions met, user confirmed.");
				}
			}
		]
	});
	
	
	var tests = [
		// Add the tests always with every 2nd ID, so we have one gap inbetween which we
		// need for ONE_SHOT which automatically generates another test right afterwards
		// to check that every time the security dialog is prompted.
		// Dont use ID+100 steps because we will have a looooot tests in here.
		
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
			id: 102,
			name: "Account.accountId (Widget.Messaging.getCurrentEmailAccount)",
			test: function(t){
				var acc = Widget.Messaging.getCurrentEmailAccount()
				var val = acc.accountId;
			}
		},
		{
			id: 104,
			name: "Account.accountName (Widget.Messaging.getCurrentEmailAccount)",
			test: function(t){
				var acc = Widget.Messaging.getCurrentEmailAccount()
				var val = acc.accountName;
			}
		},
		{
			id: 106,
			name: "AccountInfo.phoneUserUniqueId",
			test: function(t){
				var val = Widget.Device.AccountInfo.phoneUserUniqueId;
			}
		},
		{
			id: 108,
			permissions:[p.DISALLOWED, p.ONE_SHOT, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.phoneMSISDN"
		},
		{
			id: 110,
			propertyToTest:"Widget.Device.AccountInfo.phoneOperatorName"
		},
		{
			id: 112,
			permissions:[p.BLANKET, p.BLANKET, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.userSubscriptionType"
		},
		{
			id: 114,
			permissions:[p.BLANKET, p.BLANKET, p.ALLOWED],
			propertyToTest:"Widget.Device.AccountInfo.userAccountBalance"
		},
		{
			id: 116,
			name:"AddressBook (all properties)",
			test:function(){
				var item = Widget.PIM.getAddressBookItem(config.validAddressBookItemId);
				for (var key in item){
					var val = item[key]; // Access each available property.
				}
			}
		},
		{
			id: 118,
			name:"AddressBookItem.getAddressGroupNames",
			test:function(){
				var item = Widget.PIM.getAddressBookItem(config.validAddressBookItemId);
				item.getAddressGroupNames();
			}
		}
		//{
		//	id: 112,
		//	test:function(){
		//		Widget.PIM.AddressBookItem.getAttributeValue();
		//	},
		//{id: 113, functionToTest:"Widget.PIM.AddressBookItem.getAvailableAttributes"},
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
